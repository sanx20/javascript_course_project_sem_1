const teamSelectionContainer = document.querySelector('.team-selection-container');

const terroristModel = document.createElement('div');
terroristModel.className = 'model';

const terroristModelViewer = document.createElement('model-viewer');
terroristModelViewer.className = 'model-viewer';
terroristModelViewer.setAttribute('src', 'assets/3d_terrorist.glb');
terroristModelViewer.setAttribute('alt', 'Model description');
terroristModelViewer.setAttribute('auto-rotate', '');
terroristModelViewer.setAttribute('camera-controls', '');

const terroristModelType = document.createElement('p');
terroristModelType.className = 'model-type';
terroristModelType.textContent = 'Terrorist';

terroristModel.appendChild(terroristModelViewer);
terroristModel.appendChild(terroristModelType);

const counterTerroristModel = document.createElement('div');
counterTerroristModel.className = 'model';

const counterTerroristModelViewer = document.createElement('model-viewer');
counterTerroristModelViewer.className = 'model-viewer';
counterTerroristModelViewer.setAttribute('src', 'assets/3d_counter_terrorist.glb');
counterTerroristModelViewer.setAttribute('alt', 'Model description');
counterTerroristModelViewer.setAttribute('auto-rotate', '');
counterTerroristModelViewer.setAttribute('camera-controls', '');

const counterTerroristModelType = document.createElement('p');
counterTerroristModelType.className = 'model-type';
counterTerroristModelType.textContent = 'Counter-Terrorist';

counterTerroristModel.appendChild(counterTerroristModelViewer);
counterTerroristModel.appendChild(counterTerroristModelType);

teamSelectionContainer.appendChild(terroristModel);
teamSelectionContainer.appendChild(counterTerroristModel);

document.body.appendChild(teamSelectionContainer);

terroristModel.addEventListener('click', function () {
    sessionStorage.setItem('selectedTeam', 'Terrorist');
    window.location.href = 'character_selection.html';
});

counterTerroristModel.addEventListener('click', function () {
    sessionStorage.setItem('selectedTeam', 'Counter-Terrorist');
    window.location.href = 'character_selection.html';
});

const autoSelectButton = document.createElement('button');
autoSelectButton.id = 'auto-team-select-button';
autoSelectButton.textContent = 'Auto Select';
autoSelectButton.addEventListener('click', function () {
    const randomModel = Math.random() < 0.5 ? terroristModel : counterTerroristModel;
    randomModel.click();
});

document.body.appendChild(autoSelectButton);