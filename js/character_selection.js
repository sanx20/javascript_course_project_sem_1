class Character {
    constructor(id, name, description, team, image) {
        if (team !== '' && image !== '') {
            this._id = id === '' ? 'Not Found' : id;
            this._name = name === '' ? "Not Found" : name;
            this._description = description === '' ? "Not Found" : description;
            this._team = team;
            this._image = image;
        }
    }

    getTeam() {
        return this._team;
    }

    getImage() {
        return this._image;
    };
}

const getAgentsUrl = 'https://bymykel.github.io/CSGO-API/api/en/agents.json';

async function getAgents() {
    try {
        const response = await fetch(getAgentsUrl);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

function createCharacter(data, selectedTeam) {
    const agents = [];
    for (let i = 0; i < data.length; i++) {
        if (data[i].team.name.toLowerCase() === selectedTeam.toLowerCase()) {
            const agent = new Character(data[i].id, data[i].name, data[i].description, data[i].team.name, data[i].image);
            agents.push(agent);
        }
    }
    return agents;
}

let selectedAgent = null;

function displayCharacters(agents) {
    const agentsContainer = document.querySelector('.agents-container');
    agentsContainer.classList.add('agents-container-style');

    agents.forEach(agent => {
        const agentCard = document.createElement('div');
        agentCard.id = agent._id;
        agentCard.classList.add('agent-card');

        agentCard.innerHTML = `
            <img src="${agent.getImage()}" alt="${agent._name}" class="agent-image">
            <div class="agent-info">
                <h3 class="agent-name">${agent._name}</h3>
                <p class="agent-description">${agent._description}</p>
                <p class="agent-team text-uppercase">${agent._team}</p>
            </div>
        `;

        agentCard.addEventListener('mouseover', function () { this.classList.add('hover'); });
        agentCard.addEventListener('mouseout', function () { this.classList.remove('hover'); });
        agentsContainer.appendChild(agentCard);

        agentCard.addEventListener('click', function () {

            if (selectedAgent) {
                const previousSelectedCard = document.getElementById(selectedAgent._id);
                previousSelectedCard.classList.remove('selected');
            }

            selectedAgent = agents.find(agent => agent._id === this.id);
            this.classList.add('selected');
        });
    });
};

let playerName = null;

function createHeader(selectedTeam) {
    const header = document.createElement('div');
    header.classList.add('header-style');

    const headerText = document.createElement('div');
    headerText.textContent = `Choose an agent - ${selectedTeam}`;
    header.appendChild(headerText);

    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.placeholder = 'Enter player name';
    nameInput.classList.add('input-style');
    header.appendChild(nameInput);

    const submitButton = document.createElement('button');
    submitButton.textContent = 'Submit';
    submitButton.classList.add('button-style');
    header.appendChild(submitButton);

    const inputGroup = document.createElement('div');
    inputGroup.appendChild(nameInput);
    inputGroup.appendChild(submitButton);
    header.appendChild(inputGroup);

    document.body.insertBefore(header, document.body.firstChild);

    submitButton.addEventListener('click', function () {
        if (!selectedAgent) {
            alert('Please select an agent first.');
            return;
        }

        const name = nameInput.value.trim();
        if (name === '') {
            alert('Please enter a player name.');
            return;
        }

        const words = name.split(' ');
        if (words.length > 2 || name.length > 20) {
            alert('The player name must not exceed more than 2 words and the letter count must not exceed 20.');
            return;
        }

        playerName = name;
        localStorage.setItem('playerName', playerName);
        localStorage.setItem('selectedAgent', JSON.stringify(selectedAgent))
        selectThreeRandomAgents(agents);
        window.location.href = 'weapon_selection.html';
    });
}

function selectThreeRandomAgents(agents) {
    const selectedAgents = [];
    for (let i = 0; i < 3; i++) {
        const randomIndex = Math.floor(Math.random() * agents.length);
        selectedAgents.push(agents[randomIndex]);
        agents.splice(randomIndex, 1);
    }
    localStorage.setItem('selectedAgentOne', JSON.stringify(selectedAgents[0]));
    localStorage.setItem('selectedAgentTwo', JSON.stringify(selectedAgents[1]));
    localStorage.setItem('selectedAgentThree', JSON.stringify(selectedAgents[2]));
}

getAgents().then(data => {
    let selectedTeam = sessionStorage.getItem('selectedTeam');
    const agents = createCharacter(data, selectedTeam);
    createHeader(selectedTeam);
    displayCharacters(agents);

    if (selectedTeam === 'Terrorist') {
        document.body.style.backgroundImage = 'url(../assets/t_bg.jpg)';
    } else if (selectedTeam === 'Counter-Terrorist') {
        document.body.style.backgroundImage = 'url(../assets/ct_bg.jpg)';
    }
});