let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-slide');
const totalSlides = slides.length;

document.getElementById('next').addEventListener('click', () => {
    changeSlide(currentSlide + 1);
});

document.getElementById('prev').addEventListener('click', () => {
    changeSlide(currentSlide - 1);
});

function changeSlide(index) {
    slides[currentSlide].classList.remove('active');
    currentSlide = (index + totalSlides) % totalSlides;
    slides[currentSlide].classList.add('active');
}

setInterval(() => {
    changeSlide(currentSlide + 1);
}, 5000); 

let currentClip = 0;
const clipsCarouselInner = document.querySelector('.clips-carousel-inner');
const clips = document.querySelectorAll('.clip');
const totalClips = clips.length;

document.getElementById('clips-next').addEventListener('click', () => {
    changeClip(currentClip + 1);
});

document.getElementById('clips-prev').addEventListener('click', () => {
    changeClip(currentClip - 1);
});

function changeClip(index) {
    currentClip = (index + totalClips) % totalClips;
    const offset = -currentClip * (clips[0].offsetWidth + 20); // 20 is the margin-right
    clipsCarouselInner.style.transform = `translateX(${offset}px)`;
}

const profile = document.querySelector('.profile');
const profileDropdown = document.querySelector('.profile-dropdown');

profile.addEventListener('click', () => {
    profileDropdown.style.display = profileDropdown.style.display === 'block' ? 'none' : 'block';
});

document.addEventListener('click', (event) => {
    if (!profile.contains(event.target)) {
        profileDropdown.style.display = 'none';
    }
});