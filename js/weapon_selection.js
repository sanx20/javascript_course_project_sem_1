class Weapon {
    constructor(id, name, description, image, categoryName) {
        if (id !== '' && name !== '' && description !== '' && image !== '') {
            this._id = id;
            this._name = name;
            this._description = description === '' ? 'Not Found' : description;
            this._price = this.getPrice(categoryName);
            this._image = image;
            this._category = categoryName;
        }
    }

    getPrice(weaponCategory) {
        let min, max;
        if (weaponCategory.toLowerCase() === 'pistols') {
            min = 200;
            max = 700;
        } else if (weaponCategory.toLowerCase() === 'smgs') {
            min = 1000;
            max = 1500;
        } else if (weaponCategory.toLowerCase() === 'rifles') {
            min = 1500;
            max = 3500;
        } else if (weaponCategory.toLowerCase() === 'heavy') {
            min = 2500;
            max = 4500;
        } else if (weaponCategory.toLowerCase() === 'knives' || weaponCategory.toLowerCase() === 'gloves') {
            min = 100;
            max = 500;
        } else {
            min = 500;
            max = 1000;
        }
        return Math.round((Math.random() * (max - min) + min) / 50) * 50;
    }
}

class CategoryWrapper {
    constructor(weaponWrapper, categoryName) {
        this._weaponWrapper = weaponWrapper;
        this._categoryName = categoryName;

    }
}

class WeaponWrapper {
    constructor(weapons, weaponId, weaponName) {
        this._weapons = weapons;
        this._weaponId = weaponId;
        this._weaponName = weaponName;
    }
}



const getWeaponsUrl = 'https://bymykel.github.io/CSGO-API/api/en/skins.json';

async function getWeapons() {
    try {
        const response = await fetch(getWeaponsUrl);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}


function createWeapon(data, selectedTeam) {
    const CategoryWrappers = [];
    let selectedTeamId = selectedTeam === 'Terrorist' ? 'terrorists' : 'counter-terroists';

    for (let i = 0; i < data.length; i++) {
        if (data[i].team.id.toLowerCase() === 'both' || data[i].team.id.toLowerCase() === selectedTeamId) {
            if (data[i].id !== null && data[i].name !== null && data[i].description !== null && data[i].image !== null && data[i].category.name !== null && data[i].weapon.weapon_id !== null) {
                const weapon = new Weapon(data[i].id, data[i].name, data[i].description, data[i].image, data[i].category.name);
                const existingCategoryWrapperIndex = CategoryWrappers.findIndex(wrapper => wrapper._categoryName === data[i].category.name);
                if (existingCategoryWrapperIndex !== -1) {
                    const existingWeaponWrapperIndex = CategoryWrappers[existingCategoryWrapperIndex]._weaponWrapper.findIndex(weaponWrapper => weaponWrapper._weaponId === data[i].weapon.id);
                    if (existingWeaponWrapperIndex !== -1) {
                        CategoryWrappers[existingCategoryWrapperIndex]._weaponWrapper[existingWeaponWrapperIndex]._weapons.push(weapon);
                    } else {
                        CategoryWrappers[existingCategoryWrapperIndex]._weaponWrapper.push(new WeaponWrapper([weapon], data[i].weapon.id, data[i].weapon.name));
                    }
                } else {
                    const weaponWrapper = new WeaponWrapper([weapon], data[i].weapon.id, data[i].weapon.name);
                    CategoryWrappers.push(new CategoryWrapper([weaponWrapper], data[i].category.name));
                }
            }
        }
    }
    return CategoryWrappers;
}

function displayCategoryWrappers(categoryWrappers) {
    const container = document.querySelector('.category-wrapper-container');
    container.innerHTML = '';


    categoryWrappers.forEach((categoryWrapper) => {
        const categoryListItem = document.createElement('li');
        categoryListItem.textContent = categoryWrapper._categoryName;
        categoryListItem.addEventListener('click', () => {
            const weaponContainer = document.querySelector('.weapon-container');
            weaponContainer.innerHTML = '';
            displayWeaponWrappers(categoryWrapper._weaponWrapper);
        });
        container.appendChild(categoryListItem);
    });
}

function displayWeaponWrappers(weaponWrappers) {
    const container = document.querySelector('.weapon-wrapper-container');
    container.innerHTML = '';

    weaponWrappers.forEach((weaponWrapper) => {
        const weaponWrapperElement = document.createElement('div');
        weaponWrapperElement.textContent = weaponWrapper._weaponName;
        weaponWrapperElement.addEventListener('click', () => {
            displayWeapons(weaponWrapper._weapons);
        });
        container.appendChild(weaponWrapperElement);
    });
}

function displayWeapons(weapons) {
    const container = document.querySelector('.weapon-container');
    container.innerHTML = '';

    weapons.forEach((weapon) => {
        const weaponElement = document.createElement('div');
        weaponElement.classList.add('weapon');

        const weaponNameElement = document.createElement('h2');
        weaponNameElement.textContent = weapon._name;
        weaponElement.appendChild(weaponNameElement);

        const weaponDescriptionElement = document.createElement('p');
        weaponDescriptionElement.textContent = weapon._description;
        weaponElement.appendChild(weaponDescriptionElement);

        const weaponPriceElement = document.createElement('p');
        weaponPriceElement.textContent = `Price: ${weapon._price}`;
        weaponElement.appendChild(weaponPriceElement);

        const weaponImageElement = document.createElement('img');
        weaponImageElement.src = weapon._image;
        weaponElement.appendChild(weaponImageElement);

        container.appendChild(weaponElement);
    });
}


getWeapons().then(data => {
    const selectedTeam = sessionStorage.getItem('selectedTeam');
    if (selectedTeam === 'Terrorist') {
        document.body.classList.add('terrorist');
    } else if (selectedTeam === 'Counter-Terrorist') {
        document.body.classList.add('counter-terrorist');
    }
    var weapons = createWeapon(data, selectedTeam);
    displayCategoryWrappers(weapons);
    // const weaponsContainer = document.querySelector('.weapons-container');
    // weaponsContainer.innerHTML = '';
    // const filteredWeapons = weapons._weapons.filter(weapon => weapon && weapon._category && weapon._category.toLowerCase() === category.toLowerCase());
    // displayWeapons(filteredWeapons);
});