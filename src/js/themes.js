function changeTheme(themeName) {
  document.getElementById('colortheme').setAttribute('href', `/css/${themeName}.css`);
  
  localStorage.setItem('theme', themeName); 
}

const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  changeTheme(savedTheme);
} else {
  changeTheme('');
}
