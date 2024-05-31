const homeButton = document.getElementById('Beranda');
const loginButton = document.getElementById('login-text');
const urlParams = new URLSearchParams(window.location.search);
const sport = urlParams.get('sport'); // Mendapatkan nilai query parameter untuk olahraga

loginButton.addEventListener('click', () => {
  window.location.href = 'login.html';
});

homeButton.addEventListener('click', () => {
  window.location.href = 'homepage.html';
});

switch(sport) {
  case 'soccer':
      // Menampilkan jadwal untuk olahraga soccer
      // Misalnya:
    displaySoccerSchedule();
    break;
  case 'basketball':
      // Menampilkan jadwal untuk olahraga basketball
      // Misalnya:
    displayBasketballSchedule();
    break;
  case 'badminton':
      // Menampilkan jadwal untuk olahraga soccer
      // Misalnya:
    displayBadmintonSchedule();
    break;
  case 'tennis-table':
      // Menampilkan jadwal untuk olahraga soccer
      // Misalnya:
    displayTennisTableSchedule();
    break;
  case 'chess':
      // Menampilkan jadwal untuk olahraga soccer
      // Misalnya:
    displayChessSchedule();
    break;

  default:
      // Menampilkan pesan jika olahraga tidak ditemukan
    displayNotFoundMessage();
  }