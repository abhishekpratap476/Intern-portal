import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../output.css";

const Profile = () => {
  const [user, setUser] = useState({
    name: "Loading...",
    email: "loading@example.com",
    referralCode: "------",
    totalDonations: 0,
    rank: 0,
    referrals: 0,
    thisMonth: 0,
    lastMonth: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get("http://localhost:5000/api/user");
        setUser({
          ...res.data,
          thisMonth: Math.floor(Math.random() * 5000) + 1000, // Mock monthly data
          lastMonth: Math.floor(Math.random() * 4000) + 800
        });
      } catch (err) {
        setError("Failed to load user data");
        console.error("Error fetching user data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return "🥇";
      case 2:
        return "🥈";
      case 3:
        return "🥉";
      default:
        return `#${rank}`;
    }
  };

  const getRankColor = (rank) => {
    switch (rank) {
      case 1:
        return "from-yellow-400 to-yellow-600";
      case 2:
        return "from-gray-300 to-gray-500";
      case 3:
        return "from-amber-600 to-amber-800";
      default:
        return "from-indigo-500 to-purple-600";
    }
  };

  // Mock donation history data
  const donationHistory = [
    {
      id: 1,
      amount: 2500,
      date: "2024-01-15",
      category: "Education",
      description: "Donation for school supplies"
    },
    {
      id: 2,
      amount: 1800,
      date: "2024-01-10",
      category: "Healthcare",
      description: "Medical equipment donation"
    },
    {
      id: 3,
      amount: 3200,
      date: "2024-01-05",
      category: "Food",
      description: "Food bank contribution"
    },
    {
      id: 4,
      amount: 1500,
      date: "2023-12-28",
      category: "Education",
      description: "Library books donation"
    },
    {
      id: 5,
      amount: 2100,
      date: "2023-12-20",
      category: "Healthcare",
      description: "Vaccination drive support"
    }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
            <p>{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Intern Portal</h1>
              <p className="text-gray-600">Profile</p>
            </div>
            <Link 
              to="/dashboard"
              className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Dashboard
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex flex-col lg:flex-row items-center lg:items-start space-y-6 lg:space-y-0 lg:space-x-8">
            {/* Profile Avatar */}
            <div className="relative">
              <div className="h-32 w-32 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white text-4xl font-bold">
                  {user.name.charAt(0).toUpperCase()}
                </span>
              </div>
              {/* Rank Badge */}
              <div className="absolute -top-2 -right-2 h-10 w-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg border-4 border-white">
                <span className="text-white text-sm font-bold">{getRankIcon(user.rank)}</span>
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-center lg:text-left">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">{user.name}</h2>
              <p className="text-gray-600 mb-4">{user.email}</p>
              
              {/* Rank Display */}
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-full border border-indigo-200">
                <div className={`w-6 h-6 bg-gradient-to-r ${getRankColor(user.rank)} rounded-full flex items-center justify-center mr-2`}>
                  <span className="text-white text-xs font-bold">{getRankIcon(user.rank)}</span>
                </div>
                <span className="text-indigo-700 font-semibold">Rank</span>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-1">
              <div className="text-center lg:text-right">
                <p className="text-2xl font-bold text-indigo-600">{formatCurrency(user.totalDonations)}</p>
                <p className="text-sm text-gray-600">Total Donations</p>
              </div>
              <div className="text-center lg:text-right">
                <p className="text-2xl font-bold text-green-600">{user.referrals}</p>
                <p className="text-sm text-gray-600">Referrals</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Donations */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Donations</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(user.totalDonations)}</p>
              </div>
            </div>
          </div>

          {/* This Month */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">This Month</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(user.thisMonth)}</p>
              </div>
            </div>
          </div>

          {/* Last Month */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-lg">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Last Month</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(user.lastMonth)}</p>
              </div>
            </div>
          </div>

          {/* Referrals */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Referrals</p>
                <p className="text-2xl font-bold text-gray-900">{user.referrals}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Donation History */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900">Recent Donation History</h3>
            <p className="text-gray-600 mt-1">Your recent charitable contributions</p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {donationHistory.map((donation) => (
                  <tr key={donation.id} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(donation.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {donation.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {donation.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-green-600">
                      {formatCurrency(donation.amount)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Referral Code Section */}
        <div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Your Referral Code</h3>
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <p className="text-sm text-gray-600 mb-2">Share this code with friends to earn rewards</p>
              <div className="flex items-center space-x-2">
                <p className="text-lg font-mono font-semibold text-indigo-600 bg-indigo-50 px-4 py-2 rounded-lg border border-indigo-200">
                  {user.referralCode}
                </p>
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText(user.referralCode);
                    alert('Referral code copied to clipboard!');
                  }}
                  className="p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200"
                  title="Copy referral code"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 