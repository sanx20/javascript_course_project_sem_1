const startScreen = document.createElement('div');
startScreen.id = 'start-screen';
startScreen.classList.add('start-screen', 'center-screen');

const logo = document.createElement('img');
logo.src = './assets/logo.png';
logo.classList.add('logo');
startScreen.appendChild(logo);

const startButton = document.getElementById('start-game-button');
startButton.classList.add('start-button');

startButton.parentNode.removeChild(startButton);

startScreen.appendChild(startButton);

document.body.appendChild(startScreen);

const audio = new Audio('./audios/intro.mp3');

audio.muted = true;

window.addEventListener('load', () => {
    audio.muted = false;
    audio.play();
});

startButton.addEventListener('click', () => {
    window.location.href = 'team_selection.html';
});