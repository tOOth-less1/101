// ==========================================
// 1. SELECTORS & CONFIGURATION
// ==========================================
const toggleIcon1 = document.getElementById('toggle-icon1');
const passwordInput = document.getElementById('password-input');
const loginForm = document.getElementById('login-form');
const loginBox = document.getElementById('login-container');
const loadingScreen = document.getElementById('loading-screen');
const errorMsg = document.getElementById('message');

const audio = document.getElementById('bg-audio');
audio.volume = 0.05; // quiet background level

const eyeClosed = 'images/eye-closed.svg';
const eyeOpen = 'images/eye-open.svg';

// Unmute on first user interaction
const startAudio = () => {
    audio.muted = false;
    audio.play().catch(e => console.log('Autoplay prevented:', e));
    document.removeEventListener('click', startAudio);
    document.removeEventListener('keydown', startAudio);
};

document.addEventListener('click', startAudio);
document.addEventListener('keydown', startAudio);

// 1. Change Key to Closed Eye when user clicks the input field
passwordInput.addEventListener('focus', () => {
    if (toggleIcon1.src.includes('key.svg')) {
        toggleIcon1.src = eyeClosed;
    }
});

// 2. Toggle Visibility when clicking the icon
toggleIcon1.addEventListener('click', () => {
    if (toggleIcon1.src.includes('key.svg')) return;

    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleIcon1.src = eyeOpen;
    } else {
        passwordInput.type = 'password';
        toggleIcon1.src = eyeClosed;
    }
});

// Set your credentials here
const CREDENTIALS = {
    user: "sathsarani_manika",
    pass: "dew@13.10.08"
};

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const inputUser = document.getElementById('username-input').value;
    const inputPass = document.getElementById('password-input').value;

    if (inputUser === CREDENTIALS.user && inputPass === CREDENTIALS.pass) {
        
        loginBox.style.opacity = '0';
        
        setTimeout(() => {
            loginBox.style.display = 'none';
            loadingScreen.style.display = 'flex';

            setTimeout(() => {
                loadingScreen.style.opacity = '1';
                document.body.classList.remove('not-loaded');
            }, 50);

            // Step D: Redirect to dashboard after 8 seconds of blooming
            setTimeout(() => {
                // NEW LOGIC: Save the exact audio time before we leave the page
                sessionStorage.setItem('bgAudioTime', audio.currentTime);
                sessionStorage.setItem('bgAudioPlaying', !audio.paused);
                
                window.location.href = "countdown.html"; 
            }, 8000);

        }, 800); 

    } else {
        errorMsg.textContent = "Incorrect username or password.";
    }
});

// ==========================================
// 4. HEART BACKGROUND ANIMATION
// ==========================================
function createHeart() {
    const container = document.getElementById('heart-container');
    if (!container) return;

    const heart = document.createElement('span');
    heart.classList.add('heart');
    heart.innerText = '❤';
    heart.style.left = Math.random() * 100 + "vw";
    const size = Math.random() * 30 + 10;
    heart.style.fontSize = size + "px";
    const colors = ['#ff4d4d', '#ff7675', '#ef5777', '#574b90', '#f78fb3'];
    heart.style.color = colors[Math.floor(Math.random() * colors.length)];
    heart.style.opacity = Math.random() * 0.5 + 0.5; 
    const duration = Math.random() * 5 + 4;
    heart.style.animationDuration = duration + "s";
    heart.style.animationDelay = Math.random() * 2 + "s";
    const rotation = Math.random() * 360;
    heart.style.transform = `rotate(${rotation}deg)`;
    container.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, (duration + 2) * 1000);
}
setInterval(createHeart, 400);