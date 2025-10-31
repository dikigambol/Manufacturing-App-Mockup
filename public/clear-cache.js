// Clear dashboard_2 cache
if (window.location.pathname.includes('/dashboard/line_1') || window.location.pathname.includes('/lines')) {
  console.log('Clearing dashboard_2 cache...');
  localStorage.removeItem('dashboard_2');
  console.log('Cache cleared! Dashboard will reload from constant.js');
}
