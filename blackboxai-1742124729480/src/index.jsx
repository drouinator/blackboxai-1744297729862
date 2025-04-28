// Wait for components to be loaded and mounted
setTimeout(() => {
  const container = document.getElementById('root');
  const root = ReactDOM.createRoot(container);
  root.render(
    React.createElement(Dashboard, null)
  );
}, 1000); // Give time for components to load
