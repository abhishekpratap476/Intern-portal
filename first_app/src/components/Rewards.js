import React from "react";

const Rewards = () => {
  const rewards = [
    { amount: 5000, badge: "Bronze Badge", icon: "🥉", color: "amber", description: "First milestone achieved!" },
    { amount: 10000, badge: "Silver Badge", icon: "🥈", color: "gray", description: "You're making great progress!" },
    { amount: 15000, badge: "Gold Badge", icon: "🥇", color: "yellow", description: "Outstanding performance!" },
    { amount: 25000, badge: "Platinum Badge", icon: "💎", color: "blue", description: "Elite level reached!" },
    { amount: 50000, badge: "Diamond Badge", icon: "💎", color: "purple", description: "Legendary status!" }
  ];

  // Mock current total for demo (in real app, this would come from props or context)
  const currentTotal = 8500; // This would be dynamic

  const getProgressPercentage = (target) => {
    return Math.min((currentTotal / target) * 100, 100);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div>
      <h3 className="text-xl font-semibold text-gray-900 mb-6">Rewards & Unlockables</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {rewards.map((reward, index) => {
          const progress = getProgressPercentage(reward.amount);
          const isAchieved = currentTotal >= reward.amount;
          const isNext = !isAchieved && (index === 0 || currentTotal >= rewards[index - 1].amount);
          
          return (
            <div 
              key={reward.amount}
              className={`relative p-4 rounded-xl border-2 transition-all duration-300 ${
                isAchieved 
                  ? `border-${reward.color}-300 bg-${reward.color}-50` 
                  : isNext
                  ? 'border-indigo-300 bg-indigo-50'
                  : 'border-gray-200 bg-gray-50'
              }`}
            >
              {/* Achievement Badge */}
              {isAchieved && (
                <div className="absolute -top-2 -right-2">
                  <div className={`bg-${reward.color}-500 text-white text-xs px-2 py-1 rounded-full font-medium`}>
                    ✓ Achieved
                  </div>
                </div>
              )}
              
              {/* Next Target Indicator */}
              {isNext && (
                <div className="absolute -top-2 -right-2">
                  <div className="bg-indigo-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                    Next Target
                  </div>
                </div>
              )}

              <div className="flex items-center mb-3">
                <span className="text-2xl mr-3">{reward.icon}</span>
                <div>
                  <h4 className={`font-semibold ${
                    isAchieved ? `text-${reward.color}-700` : 'text-gray-700'
                  }`}>
                    {reward.badge}
                  </h4>
                  <p className="text-sm text-gray-600">{formatCurrency(reward.amount)}</p>
                </div>
              </div>

              <p className="text-xs text-gray-600 mb-3">{reward.description}</p>

              {/* Progress Bar */}
              <div className="mb-2">
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>Progress</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-500 ${
                      isAchieved 
                        ? `bg-${reward.color}-500` 
                        : isNext
                        ? 'bg-indigo-500'
                        : 'bg-gray-300'
                    }`}
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>

              {/* Status */}
              <div className="text-xs">
                {isAchieved ? (
                  <span className={`text-${reward.color}-600 font-medium`}>
                    ✓ Unlocked on {new Date().toLocaleDateString()}
                  </span>
                ) : isNext ? (
                  <span className="text-indigo-600 font-medium">
                    {formatCurrency(reward.amount - currentTotal)} more to unlock
                  </span>
                ) : (
                  <span className="text-gray-500">
                    Locked - Complete previous milestone first
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Current Progress Summary */}
      <div className="mt-6 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-semibold text-gray-900">Your Progress</h4>
            <p className="text-sm text-gray-600">
              Current total: {formatCurrency(currentTotal)}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">Achievements</p>
            <p className="text-lg font-bold text-indigo-600">
              {rewards.filter(r => currentTotal >= r.amount).length}/{rewards.length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rewards;
