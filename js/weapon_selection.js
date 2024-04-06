// {
//     "id": "skin-65604",
//     "name": "Desert Eagle | Urban DDPAT",
//     "description": "As expensive as it is powerful, the Desert Eagle is an iconic pistol that is difficult to master but surprisingly accurate at long range. It has been painted using a Digital Disruptive Pattern (DDPAT) hydrographic.\\n\\n<i>By the time you're close enough to notice the pixels it's already too late</i>",
//     "weapon": {
//         "id": "weapon_deagle",
//         "name": "Desert Eagle"
//     },
//     "category": {
//         "id": "csgo_inventory_weapon_category_pistols",
//         "name": "Pistols"
//     },
//     "pattern": {
//         "id": "hy_ddpat_urb",
//         "name": "Urban DDPAT"
//     },
//     "min_float": 0.06,
//     "max_float": 0.8,
//     "rarity": {
//         "id": "rarity_uncommon_weapon",
//         "name": "Industrial Grade",
//         "color": "#5e98d9"
//     },
//     "stattrak": false,
//     "souvenir": true,
//     "paint_index": "17",
//     "team": {
//         "id": "both",
//         "name": "Both Teams"
//     },
//     "image": "https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_deagle_hy_ddpat_urb_light_png.png"
// },

class Weapon {
    constructor(id, name, description, weapondId, weaponName, categoryId, categoryName, rarity, team, image) {
        if (id !== '' && name !== '' && team !== '' && image !== '') {
            this._id = id;
            this._name = name;
            this._description = description === '' ? 'Not Found' : description;
            this._weaponId = weapondId === '' ? 'Not Found' : weapondId;
            this._weaponName = weaponName === '' ? 'Not Found' : weaponName;
            this._categoryId = categoryId === '' ? 'Not Found' : categoryId;
            this._category = categoryName === '' ? 'Not Found' : categoryName;
            this._price = this.getPrice(categoryName);
            this._rarity = rarity === '' ? 'Not Found' : rarity;
            this._team = team;
            this._image = image;
        }
    }

    getPrice(weaponCategory) {
        if (weaponCategory.toLowerCase() === 'pistols') {
            return Math.floor(Math.random() * (700 - 200 + 1) + 200);
        } else if (weaponCategory.toLowerCase() === 'smgs') {
            return Math.floor(Math.random() * (1500 - 1000 + 1) + 1000);
        } else if (weaponCategory.toLowerCase() === 'rifles') {
            return Math.floor(Math.random() * (3500 - 1500 + 1) + 1500);
        } else if (weaponCategory.toLowerCase() === 'heavy') {
            return Math.floor(Math.random() * (4500 - 2500 + 1) + 2500);
        } else if (weaponCategory.toLowerCase() === 'knives' || weaponCategory.toLowerCase() === 'gloves') {
            return Math.floor(Math.random() * (500 - 100 + 1) + 100);
        } else {
            return Math.floor(Math.random() * (1000 - 500 + 1) + 500);
        }
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

function createWeapon(data) {
    const weapons = [];
    for (let i = 0; i < data.length; i++) {
        const weapon = new Weapon(data[i].id, data[i].name, data[i].description, data[i].weapon.id, data[i].weapon.name, data[i].category.id, data[i].category.name ?? 'Not Found', data[i].rarity.name, data[i].team.name, data[i].image);
        weapons.push(weapon);
        // // I want to skip if weapon id is already in the array
        // if (!(weapons.some(weapon => weapon._weaponId === data[i].weapon.id))) {
        //     const weapon = new Weapon(data[i].id, data[i].name, data[i].description, data[i].weapon.id, data[i].weapon.name, data[i].category.id, data[i].category.name ?? 'Not Found', data[i].rarity.name, data[i].team.name, data[i].image);
        //     weapons.push(weapon);
        // }
    }
    return weapons;
}

function displayWeapons(weapons) {
    const weaponsContainer = document.querySelector('.weapons-container');
    weaponsContainer.style.display = 'grid';
    weaponsContainer.style.gridTemplateColumns = 'repeat(auto-fill, minmax(300px, 1fr))';
    weaponsContainer.style.gap = '20px';
    weapons.forEach(weapon => {
        const weaponCard = document.createElement('div');
        weaponCard.classList.add('weapon-card');
        weaponCard.innerHTML = `
            <img src="${weapon._image}" alt="${weapon._name}" class="weapon-image">
            <div class="weapon-info">
                <h3 class="weapon-name">${weapon._name}</h3>
                <p class="weapon-description">${weapon._description}</p>
                <p class="weapon-category text-uppercase">${weapon._category}</p>
                <p class="weapon-price">Price: $${weapon._price}</p>
                <p class="weapon-team text-uppercase">${weapon._team}</p>
            </div>
        `;
        if (weaponCard !== null) {
            weaponsContainer.appendChild(weaponCard);
        }
    });
}

getWeapons().then(data => {
    const weapons = createWeapon(data);
    displayWeapons(weapons);
});