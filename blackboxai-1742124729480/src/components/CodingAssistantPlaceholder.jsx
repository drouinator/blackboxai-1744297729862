const CodingAssistantPlaceholder = () => {
  const [activeTab, setActiveTab] = React.useState('assistant');

  const renderFamilyContent = () => (
    <div className="space-y-4">
      {/* Baby Care Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-purple-50 dark:bg-gray-700 p-4 rounded-xl">
          <div className="flex items-center justify-between mb-2">
            <i className="fas fa-baby text-purple-500"></i>
            <span className="text-xs text-gray-500 dark:text-gray-400">Next Feed</span>
          </div>
          <p className="text-sm text-gray-700 dark:text-gray-300">In 45 minutes</p>
        </div>
        <div className="bg-pink-50 dark:bg-gray-700 p-4 rounded-xl">
          <div className="flex items-center justify-between mb-2">
            <i className="fas fa-bed text-pink-500"></i>
            <span className="text-xs text-gray-500 dark:text-gray-400">Last Nap</span>
          </div>
          <p className="text-sm text-gray-700 dark:text-gray-300">2 hours ago</p>
        </div>
        <div className="bg-blue-50 dark:bg-gray-700 p-4 rounded-xl">
          <div className="flex items-center justify-between mb-2">
            <i className="fas fa-thermometer-half text-blue-500"></i>
            <span className="text-xs text-gray-500 dark:text-gray-400">Room Temp</span>
          </div>
          <p className="text-sm text-gray-700 dark:text-gray-300">21°C</p>
        </div>
      </div>

      {/* Family Calendar */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-4">
        <h3 className="text-lg font-semibold mb-4 flex items-center text-gray-800 dark:text-white">
          <i className="fas fa-calendar-alt mr-2 text-purple-500"></i>
          Today's Schedule
        </h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-purple-50 dark:bg-gray-700 rounded-lg">
            <div className="flex items-center space-x-3">
              <i className="fas fa-stethoscope text-purple-500"></i>
              <span className="text-sm font-medium dark:text-gray-200">Doctor's Appointment</span>
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400">2:30 PM</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-pink-50 dark:bg-gray-700 rounded-lg">
            <div className="flex items-center space-x-3">
              <i className="fas fa-shopping-basket text-pink-500"></i>
              <span className="text-sm font-medium dark:text-gray-200">Grocery Shopping</span>
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400">4:00 PM</span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center">
            <i className="fas fa-list-check mr-2 text-purple-500"></i>
            Shopping List
          </h3>
          <div className="space-y-2">
            <p className="text-xs text-gray-600 dark:text-gray-400">• Baby formula</p>
            <p className="text-xs text-gray-600 dark:text-gray-400">• Diapers</p>
            <p className="text-xs text-gray-600 dark:text-gray-400">• Baby wipes</p>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center">
            <i className="fas fa-bell mr-2 text-purple-500"></i>
            Reminders
          </h3>
          <div className="space-y-2">
            <p className="text-xs text-gray-600 dark:text-gray-400">• Vaccination due next week</p>
            <p className="text-xs text-gray-600 dark:text-gray-400">• Baby class tomorrow</p>
            <p className="text-xs text-gray-600 dark:text-gray-400">• Call pediatrician</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAssistantContent = () => (
    <div className="space-y-4">
      {/* Voice and Text Input */}
      <div className="relative">
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 flex space-x-2">
          <button className="text-gray-400 hover:text-purple-500 transition-colors duration-300" title="Voice Input">
            <i className="fas fa-microphone"></i>
          </button>
          <button className="text-gray-400 hover:text-purple-500 transition-colors duration-300" title="Attach File">
            <i className="fas fa-paperclip"></i>
          </button>
          <button className="text-gray-400 hover:text-purple-500 transition-colors duration-300" title="Take Photo">
            <i className="fas fa-camera"></i>
          </button>
        </div>
        <input 
          type="text" 
          placeholder="How can I help you today?" 
          className="w-full pl-24 pr-20 py-3 bg-gray-50 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-gray-700 dark:text-gray-200"
        />
        <button className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-purple-500 to-pink-500 text-white p-2 rounded-lg">
          <i className="fas fa-arrow-right"></i>
        </button>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-3">
        <button className="px-4 py-2 bg-purple-100 dark:bg-gray-700 text-purple-700 dark:text-purple-300 rounded-xl text-sm flex items-center hover:bg-purple-200 dark:hover:bg-gray-600 transition-all duration-300">
          <i className="fas fa-magic mr-2"></i>
          Smart Assistant
        </button>
        <button className="px-4 py-2 bg-pink-100 dark:bg-gray-700 text-pink-700 dark:text-pink-300 rounded-xl text-sm flex items-center hover:bg-pink-200 dark:hover:bg-gray-600 transition-all duration-300">
          <i className="fas fa-calendar mr-2"></i>
          Schedule
        </button>
        <button className="px-4 py-2 bg-blue-100 dark:bg-gray-700 text-blue-700 dark:text-blue-300 rounded-xl text-sm flex items-center hover:bg-blue-200 dark:hover:bg-gray-600 transition-all duration-300">
          <i className="fas fa-list mr-2"></i>
          Tasks
        </button>
      </div>

      {/* Recent Activities */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-4">
        <h3 className="text-lg font-semibold mb-4 flex items-center text-gray-800 dark:text-white">
          <i className="fas fa-clock mr-2 text-purple-500"></i>
          Recent Activities
        </h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="flex items-center space-x-3">
              <i className="fas fa-calendar text-purple-500"></i>
              <span className="text-sm font-medium dark:text-gray-200">Calendar Updated</span>
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400">5m ago</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="flex items-center space-x-3">
              <i className="fas fa-shopping-cart text-pink-500"></i>
              <span className="text-sm font-medium dark:text-gray-200">Shopping List Created</span>
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400">15m ago</span>
          </div>
        </div>
      </div>

      {/* Tips and Suggestions */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-700 p-4 rounded-xl">
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center">
          <i className="fas fa-lightbulb mr-2 text-yellow-500"></i>
          Smart Suggestions
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Based on your schedule, would you like me to:
        </p>
        <ul className="mt-2 space-y-1 text-sm text-gray-600 dark:text-gray-400">
          <li>• Set a reminder for the doctor's appointment?</li>
          <li>• Create a shopping list for groceries?</li>
          <li>• Check traffic for your commute?</li>
        </ul>
      </div>
    </div>
  );

  return (
    <div className="bg-white dark:bg-gray-800 bg-opacity-80 dark:bg-opacity-80 backdrop-blur-lg rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 transition-colors duration-300">
      {/* Module Content */}
      {activeTab === 'family' && renderFamilyContent()}
      {activeTab === 'assistant' && renderAssistantContent()}
    </div>
  );
};

window.CodingAssistantPlaceholder = CodingAssistantPlaceholder;
