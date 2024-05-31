// Ambil nilai parameter "sport" dari URL
const params = new URLSearchParams(window.location.search);
const sport = params.get('sport');

// Periksa nilai parameter dan sesuaikan konten halaman
if (sport === 'soccer') {
    // Tampilkan jadwal soccer
    document.getElementById('scheduleTitle').innerText = 'Jadwal Soccer';
    // ... tambahkan kode untuk menampilkan jadwal soccer ...
} else if (sport === 'basketball') {
    // Tampilkan jadwal basketball
    document.getElementById('scheduleTitle').innerText = 'Jadwal Basketball';
    // ... tambahkan kode untuk menampilkan jadwal basketball ...
} else if (sport === 'badminton') {
    // Tampilkan jadwal badminton
    document.getElementById('scheduleTitle').innerText = 'Jadwal badminton';
    // ... tambahkan kode untuk menampilkan jadwal basketball ...
} else if (sport === 'tabletennis') {
    // Tampilkan jadwal tabletennis
    document.getElementById('scheduleTitle').innerText = 'Jadwal tabletennis';
    // ... tambahkan kode untuk menampilkan jadwal basketball ...
} else if (sport === 'chess') {
    // Tampilkan jadwal chess
    document.getElementById('scheduleTitle').innerText = 'Jadwal chess';
    // ... tambahkan kode untuk menampilkan jadwal basketball ...
} else {
    // Tampilkan jadwal default (misalnya, pesan kesalahan)
    document.getElementById('scheduleTitle').innerText = 'Jadwal tidak tersedia';
}