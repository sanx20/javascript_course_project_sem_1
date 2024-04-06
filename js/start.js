const startScreen = document.createElement('div');
startScreen.id = 'start-screen';
startScreen.classList.add('start-screen')

const startButton = document.getElementById('start-game-button');

startButton.addEventListener('click', () => {
    window.location.href = 'team_selection.html';
});
