import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Leaderboard = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [leaderboardRes, userRes] = await Promise.all([
          axios.get("http://localhost:5000/api/leaderboard"),
          axios.get("http://localhost:5000/api/user")
        ]);
        
        setData(leaderboardRes.data);
        setCurrentUser({
          ...userRes.data
        });
      } catch (err) {
        setError("Failed to load leaderboard data");
        console.error("Error fetching leaderboard data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

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

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading leaderboard...</p>
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
              <a href="/dashboard">
              <h1 className="text-2xl font-bold text-gray-900">Intern Portal</h1>
              <p className="text-gray-600">Leaderboard</p>
              </a>
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

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Current User Status */}
        {currentUser && (
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Position</h2>
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl">
              <div className="flex items-center">
                <div className="relative">
                  <div className="h-12 w-12 bg-indigo-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-lg font-medium">
                      {currentUser.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="absolute -top-1 -right-1 h-6 w-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                    <span className="text-white text-xs font-bold">#{currentUser.rank}</span>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900">{currentUser.name}</h3>
                  <p className="text-sm text-gray-600">Rank #{currentUser.rank}</p>
                </div>
              </div>
                             <div className="text-right">
                 <p className="text-2xl font-bold text-indigo-600">{formatCurrency(currentUser.totalDonations)}</p>
                 <p className="text-sm text-gray-600">Total Donations</p>
               </div>
            </div>
          </div>
        )}

                 {/* Leaderboard Bar Graph */}
         <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
           <div className="px-6 py-4 border-b border-gray-200">
             <h2 className="text-2xl font-bold text-gray-900">Top Performers</h2>
             <p className="text-gray-600 mt-1">See who's leading the donation drive</p>
           </div>

           <div className="p-6">
             <div className="space-y-6">
               {data.slice(0, 10).map((user, index) => {
                 const maxAmount = Math.max(...data.map(u => u.amount));
                 const barWidth = (user.amount / maxAmount) * 100;
                 
                 return (
                   <div key={index} className="relative">
                     <div className="flex items-center mb-2">
                       {/* Rank Badge */}
                       <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${getRankColor(user.rank)} flex items-center justify-center mr-3 shadow-lg flex-shrink-0`}>
                         <span className="text-white font-bold text-sm">
                           {getRankIcon(user.rank)}
                         </span>
                       </div>

                       {/* User Info */}
                       <div className="flex items-center flex-1 min-w-0">
                         <div className="h-8 w-8 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                           <span className="text-white text-sm font-medium">
                             {user.name.charAt(0).toUpperCase()}
                           </span>
                         </div>
                         <div className="min-w-0 flex-1">
                           <h3 className="text-sm font-semibold text-gray-900 truncate">{user.name}</h3>
                           <div className="flex items-center space-x-2 text-xs text-gray-600">
                             <span>Rank #{user.rank}</span>
                             <span>•</span>
                             <span>{user.referrals} referrals</span>
                           </div>
                         </div>
                       </div>

                       {/* Amount */}
                       <div className="text-right ml-4 flex-shrink-0">
                         <p className="text-lg font-bold text-gray-900">{formatCurrency(user.amount)}</p>
                       </div>
                     </div>

                     {/* Bar Graph */}
                     <div className="relative h-8 bg-gray-100 rounded-lg overflow-hidden">
                       <div 
                         className={`h-full rounded-lg transition-all duration-1000 ease-out ${
                           index === 0 
                             ? 'bg-gradient-to-r from-yellow-400 to-yellow-600' 
                             : index === 1 
                             ? 'bg-gradient-to-r from-gray-300 to-gray-500'
                             : index === 2
                             ? 'bg-gradient-to-r from-amber-600 to-amber-800'
                             : 'bg-gradient-to-r from-indigo-500 to-purple-600'
                         }`}
                         style={{ width: `${barWidth}%`}}
                       >
                         {/* Animated fill effect */}
                         <div className="absolute inset-0 bg-white opacity-20 "></div>
                       </div>
                       
                       {/* Bar Label */}
                       <div className="absolute inset-0 flex items-center justify-end pr-3">
                         <span className="text-xs font-semibold text-black font-bold drop-shadow-sm">
                           {Math.round(barWidth)}%
                         </span>
                       </div>
                     </div>

                     {/* Progress to next milestone for top 3 */}
                     {index < 3 && (
                       <div className="mt-2">
                         <div className="flex justify-between text-xs text-gray-600 mb-1">
                           <span>Progress to next milestone</span>
                           <span>{Math.round((user.amount / 50000) * 100)}%</span>
                         </div>
                         <div className="w-full bg-gray-200 rounded-full h-1">
                           <div 
                             className="bg-gradient-to-r from-indigo-500 to-purple-600 h-1 rounded-full transition-all duration-500"
                             style={{ width: `${Math.min((user.amount / 50000) * 100, 100)}%` }}
                           ></div>
                         </div>
                       </div>
                     )}
                   </div>
                 );
               })}
             </div>
           </div>
         </div>

        {/* Stats Summary */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Raised</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(data.reduce((sum, user) => sum + user.amount, 0))}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Participants</p>
                <p className="text-2xl font-bold text-gray-900">{data.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Average Per Person</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(Math.round(data.reduce((sum, user) => sum + user.amount, 0) / data.length))}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
