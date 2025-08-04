import React, { useEffect, useState } from "react";
import axios from "axios";
import Rewards from "./Rewards";
import { Link } from "react-router-dom";
import "../output.css";

const Dashboard = () => {
  const [user, setUser] = useState({
    name: "Loading...",
    referralCode: "------",
    totalDonations: 0,
    rank: 0,
    referrals: 0,
    thisMonth: 0,
    lastMonth: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showUserMenu, setShowUserMenu] = useState(false);

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

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showUserMenu && !event.target.closest('.user-menu-container')) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showUserMenu]);

  const getProgressPercentage = (current, target) => {
    return Math.min((current / target) * 100, 100);
  };

  const getNextMilestone = (current) => {
    const milestones = [5000, 10000, 15000, 25000, 50000];
    return milestones.find(milestone => milestone > current) || milestones[milestones.length - 1];
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const handleSignOut = () => {
    // Clear any stored user data
    localStorage.removeItem('user');
    // Redirect to login page
    window.location.href = '/login';
  };

  const handleProfileClick = () => {
    // Redirect to profile page
    window.location.href = '/profile';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your dashboard...</p>
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

  const nextMilestone = getNextMilestone(user.totalDonations);
  const progressPercentage = getProgressPercentage(user.totalDonations, nextMilestone);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <a href="/dashboard">
              <h1 className="text-2xl font-bold text-gray-900">Intern Portal</h1>
              <p className="text-gray-600">Dashboard</p>
              </a>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative user-menu-container">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="relative focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 rounded-full"
                >
                  <div className="h-12 w-12 bg-indigo-600 rounded-full flex items-center justify-center hover:bg-indigo-700 transition-colors duration-200 cursor-pointer">
                    <span className="text-white text-lg font-medium">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  {/* Rank Badge */}
                  <div className="absolute -top-1 -right-1 h-6 w-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                    <span className="text-white text-xs font-bold">#{user.rank}</span>
                  </div>
                </button>

                {/* User Dropdown Menu */}
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                    
                    <button
                      onClick={handleProfileClick}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center transition-colors duration-150"
                    >
                      <svg className="w-4 h-4 mr-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      Profile
                    </button>
                    
                    <button
                      onClick={handleSignOut}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center transition-colors duration-150"
                    >
                      <svg className="w-4 h-4 mr-3 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                 {/* Welcome Section */}
         <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
           <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
             <div>
               <h2 className="text-3xl font-bold text-gray-900">
                 Welcome back, {user.name}! 👋
               </h2>
               <p className="text-gray-600 mt-2">
                 Keep up the great work! You're making a real difference.
               </p>
             </div>
             <div className="lg:text-right">
               <p className="text-sm text-gray-600">Referral Code</p>
               <div className="flex items-center lg:justify-end space-x-2">
                 <p className="text-lg font-mono font-semibold text-indigo-600 bg-indigo-50 px-3 py-1 rounded">
                   {user.referralCode}
                 </p>
                 <button 
                   onClick={() => {
                     navigator.clipboard.writeText(user.referralCode);
                     // You can add a toast notification here
                     alert('Referral code copied to clipboard!');
                   }}
                   className="p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 group"
                   title="Copy referral code"
                 >
                   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                   </svg>
                 </button>
               </div>
             </div>
           </div>
         </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Donations */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
              <div className="p-2 bg-blue-100 rounded-lg">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">This Month</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(user.thisMonth)}</p>
              </div>
            </div>
          </div>

          {/* Referrals */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Referrals</p>
                <p className="text-2xl font-bold text-gray-900">{user.referrals}</p>
              </div>
            </div>
          </div>

          {/* Rank */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Current Rank</p>
                <p className="text-2xl font-bold text-gray-900">#{user.rank}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Progress to Next Milestone</h3>
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">Current: {formatCurrency(user.totalDonations)}</span>
              <span className="text-sm text-gray-600">Target: {formatCurrency(nextMilestone)}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-indigo-500 to-purple-600 h-3 rounded-full transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              {formatCurrency(nextMilestone - user.totalDonations)} more to reach the next milestone!
            </p>
          </div>
        </div>

        {/* Rewards Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <Rewards />
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link 
              to="/leaderboard"
              className="flex items-center justify-center p-4 border-2 border-indigo-200 rounded-lg hover:border-indigo-400 hover:bg-indigo-50 transition-all duration-200 group"
            >
              <svg className="w-6 h-6 text-indigo-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <span className="text-indigo-600 font-medium group-hover:text-indigo-700">View Leaderboard</span>
            </Link>
            
            <button className="flex items-center justify-center p-4 border-2 border-green-200 rounded-lg hover:border-green-400 hover:bg-green-50 transition-all duration-200 group">
              <svg className="w-6 h-6 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <span className="text-green-600 font-medium group-hover:text-green-700">Share Referral</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
