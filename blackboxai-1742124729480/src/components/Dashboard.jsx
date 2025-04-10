const Dashboard = () => {
  const [darkMode, setDarkMode] = React.useState(false);
  const [activeModule, setActiveModule] = React.useState('family');

  React.useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const renderFamilyNav = () => (
    <div>
      <a href="#" className="flex items-center px-4 py-3 text-white bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg transform transition-all duration-300 hover:scale-105">
        <i className="fas fa-baby mr-3"></i>
        Baby Care
      </a>
      <a href="#" className="flex items-center px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white rounded-lg transition-all duration-300">
        <i className="fas fa-calendar-alt mr-3"></i>
        Family Calendar
      </a>
      <a href="#" className="flex items-center px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white rounded-lg transition-all duration-300">
        <i className="fas fa-shopping-cart mr-3"></i>
        Shopping Lists
      </a>
      <a href="#" className="flex items-center px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white rounded-lg transition-all duration-300">
        <i className="fas fa-tasks mr-3"></i>
        To-Do Lists
      </a>
    </div>
  );

  const renderCodingNav = () => (
    <div>
      <a href="#" className="flex items-center px-4 py-3 text-white bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg transform transition-all duration-300 hover:scale-105">
        <i className="fas fa-shield-alt mr-3"></i>
        Security
      </a>
      <a href="#" className="flex items-center px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-blue-500 hover:to-indigo-500 hover:text-white rounded-lg transition-all duration-300">
        <i className="fas fa-code mr-3"></i>
        Development
      </a>
      <a href="#" className="flex items-center px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-blue-500 hover:to-indigo-500 hover:text-white rounded-lg transition-all duration-300">
        <i className="fas fa-terminal mr-3"></i>
        Console
      </a>
      <a href="#" className="flex items-center px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-blue-500 hover:to-indigo-500 hover:text-white rounded-lg transition-all duration-300">
        <i className="fas fa-bug mr-3"></i>
        Debug
      </a>
    </div>
  );

  const renderFoilingNav = () => (
    <div>
      <a href="#" className="flex items-center px-4 py-3 text-white bg-gradient-to-r from-ocean to-ocean-dark rounded-lg transform transition-all duration-300 hover:scale-105">
        <i className="fas fa-wind mr-3"></i>
        Weather
      </a>
      <a href="#" className="flex items-center px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-ocean hover:to-ocean-dark hover:text-white rounded-lg transition-all duration-300">
        <i className="fas fa-chart-line mr-3"></i>
        Performance
      </a>
      <a href="#" className="flex items-center px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-ocean hover:to-ocean-dark hover:text-white rounded-lg transition-all duration-300">
        <i className="fas fa-stopwatch mr-3"></i>
        Training
      </a>
      <a href="#" className="flex items-center px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-ocean hover:to-ocean-dark hover:text-white rounded-lg transition-all duration-300">
        <i className="fas fa-video mr-3"></i>
        Video Analysis
      </a>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8 transition-colors duration-300">
      {/* Header */}
      <header className="mb-8 bg-white dark:bg-gray-800 bg-opacity-70 dark:bg-opacity-70 backdrop-blur-lg shadow-sm py-4 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo and Title */}
            <div className="flex items-center space-x-2">
              <img src="https://raw.githubusercontent.com/FortAwesome/Font-Awesome/6.x/svgs/solid/brain.svg" 
                   alt="OmegaAI" 
                   className="w-10 h-10 text-blue-500 filter dark:invert"
              />
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
                OmegaAI
              </h1>
            </div>

            {/* Quick Access Icons */}
            <div className="flex items-center space-x-6">
              {/* Family Assistant */}
              <button 
                className={`relative group ${activeModule === 'family' ? 'text-purple-500' : 'text-gray-600 dark:text-gray-300'}`}
                onClick={() => setActiveModule('family')}
                title="Family Assistant - Your daily life companion"
              >
                <i className="fas fa-home text-2xl"></i>
              </button>

              {/* Code Assistant */}
              <button 
                className={`relative group ${activeModule === 'coding' ? 'text-blue-500' : 'text-gray-600 dark:text-gray-300'}`}
                onClick={() => setActiveModule('coding')}
                title="Code Assistant - Your development companion"
              >
                <i className="fas fa-code text-2xl"></i>
              </button>

              {/* Foiling Assistant */}
              <button 
                className={`relative group ${activeModule === 'foiling' ? 'text-ocean' : 'text-gray-600 dark:text-gray-300'}`}
                onClick={() => setActiveModule('foiling')}
                title="Foiling Assistant - Your water sports companion"
              >
                <i className="fas fa-water text-2xl"></i>
              </button>

              {/* Settings and Theme */}
              <div className="flex items-center space-x-4">
                <button 
                  onClick={() => setDarkMode(!darkMode)}
                  className="text-gray-600 dark:text-gray-300 hover:text-yellow-500 dark:hover:text-yellow-400"
                  title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
                >
                  <i className={`fas ${darkMode ? 'fa-sun' : 'fa-moon'} text-xl`}></i>
                </button>
                <button 
                  className="text-gray-600 dark:text-gray-300"
                  title="Settings"
                >
                  <i className="fas fa-cog text-xl"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-3">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 backdrop-blur-lg bg-opacity-80 dark:bg-opacity-80 transition-colors duration-300">
              <nav className="space-y-2">
                {activeModule === 'family' && renderFamilyNav()}
                {activeModule === 'coding' && renderCodingNav()}
                {activeModule === 'foiling' && renderFoilingNav()}
              </nav>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-9">
            <CodingAssistantPlaceholder />
          </div>
        </div>
      </main>
    </div>
  );
};

window.Dashboard = Dashboard;
