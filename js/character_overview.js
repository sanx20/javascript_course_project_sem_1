document.addEventListener('DOMContentLoaded', function () {
    let selectedAgent = JSON.parse(sessionStorage.getItem('selectedAgent'));
    let selectedPistol = JSON.parse(sessionStorage.getItem('selectedPistol'));
    let selectedSMG = JSON.parse(sessionStorage.getItem('selectedSMG'));
    let selectedRifle = JSON.parse(sessionStorage.getItem('selectedRifle'));
    let selectedHeavy = JSON.parse(sessionStorage.getItem('selectedHeavy'));
    let selectedKnive = JSON.parse(sessionStorage.getItem('selectedKnive'));
    let selectedGlove = JSON.parse(sessionStorage.getItem('selectedGlove'));

    let characterContainer = document.getElementById('characterContainer');
    let weaponContainer = document.getElementById('weaponContainer');
    let detailsContainer = document.getElementById('detailsContainer');

    let agentElement = document.createElement('img');
    agentElement.src = selectedAgent._image;
    agentElement.alt = selectedAgent._name;
    agentElement.title = selectedAgent._name;
    agentElement.addEventListener('mouseover', function () {
        detailsContainer.innerHTML = `<h2>${selectedAgent._name}</h2><p>${selectedAgent._description}</p>`;
    });
    agentElement.addEventListener('mouseout', function () {
        detailsContainer.innerHTML = '';
    });
    characterContainer.appendChild(agentElement);

    let selectedWeapons = [selectedPistol, selectedSMG, selectedRifle, selectedHeavy, selectedKnive, selectedGlove];

    // Display the selected weapons
    selectedWeapons.forEach(weapon => {
        let weaponElement = document.createElement('img');
        weaponElement.src = weapon._image;
        weaponElement.alt = weapon._name;
        weaponElement.title = weapon._name;
        weaponElement.addEventListener('mouseover', function () {
            detailsContainer.innerHTML = `<h2>${weapon._name}</h2><p>${weapon._description}</p>`;
        });
        weaponElement.addEventListener('mouseout', function () {
            detailsContainer.innerHTML = '';
        });
        weaponContainer.appendChild(weaponElement);
    });
});