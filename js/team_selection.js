const teamSelectionContainer = document.querySelector('.team-selection-container');

const counterTerroristModel = document.createElement('div');
counterTerroristModel.className = 'model counter-terrorist';

const counterTerroristModelType = document.createElement('p');
counterTerroristModelType.className = 'model-type';
counterTerroristModelType.textContent = 'Counter-Terrorist';

counterTerroristModel.appendChild(counterTerroristModelType);

const terroristModel = document.createElement('div');
terroristModel.className = 'model terrorist';

const terroristModelType = document.createElement('p');
terroristModelType.className = 'model-type';
terroristModelType.textContent = 'Terrorist';

terroristModel.appendChild(terroristModelType);

teamSelectionContainer.appendChild(counterTerroristModel);
teamSelectionContainer.appendChild(terroristModel);


const audio = new Audio('./audios/choose_team.mp3');

audio.muted = true;
audio.loop = true;

window.addEventListener('load', () => {
    audio.muted = false;
    audio.play();
});


counterTerroristModel.addEventListener('click', function () {
    sessionStorage.setItem('selectedTeam', 'Counter-Terrorist');
    window.location.href = 'character_selection.html';
});

terroristModel.addEventListener('click', function () {
    sessionStorage.setItem('selectedTeam', 'Terrorist');
    window.location.href = 'character_selection.html';
});

const autoSelectButton = document.getElementById('auto-team-select-button');
autoSelectButton.addEventListener('click', function () {
    const randomModel = Math.random() < 0.5 ? terroristModel : counterTerroristModel;
    randomModel.click();
});