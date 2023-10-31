
const gameScreen = document.getElementById('game-screen');
const efficiencyDisplay = document.getElementById('efficiency-value');
const productionDisplay = document.getElementById('production-value');
const technologiesList = document.getElementById('technologies-list');
const sidePanelRight = document.getElementById('side-panel-right');

let gameState = {
    money: 500,
    moneyMultiplier:1,
    researchPoints: 0,
    technologiesDiscovered: 0,
    efficiency: 50,
    production: 0,
    researchCost:100
};

setInterval(() => {
    gameState.money +=gameState.moneyMultiplier
}, 1000);

const technologies = [
  
    { name: 'Супутникові технології', cost: { money: 500, researchPoints: 20, technologiesDiscovered: 1 }, isBought:false, multiplier:0.1 },
    { name: 'Штучний інтелект', cost: { money: 1000, researchPoints: 30, technologiesDiscovered: 2 }, isBought:false, multiplier:0.2 },
    { name: 'Біотехнології', cost: { money: 800, researchPoints: 25, technologiesDiscovered: 1 }, isBought:false, multiplier:0.2 },
    { name: 'Нанотехнології', cost: { money: 1200, researchPoints: 35, technologiesDiscovered: 2 }, isBought:false, multiplier:0.3 },
    { name: 'Робототехніка', cost: { money: 1500, researchPoints: 40, technologiesDiscovered: 3 }, isBought:false, multiplier:0.3 },
    { name: 'Поновлювана енерія', cost: { money: 2000, researchPoints: 50, technologiesDiscovered: 6 }, isBought:false, multiplier:0.2 },
    { name: 'Дослідження космосу', cost: { money: 2500, researchPoints: 60, technologiesDiscovered: 10 }, isBought:false, multiplier:0.3 },
    { name: 'Віртуальна реальність', cost: { money: 1800, researchPoints: 45, technologiesDiscovered: 12 }, isBought:false, multiplier:0.1 },
    { name: 'Кібербезпека', cost: { money: 3000, researchPoints: 70, technologiesDiscovered: 15 }, isBought:false, multiplier:0.2 },
    { name: 'Квантові обчислення', cost: { money: 3500, researchPoints: 80, technologiesDiscovered: 16 }, isBought:false, multiplier:0.5 }
];

function showTechnologyDetails(tech) {
    // очищення попереднії деталей
    sidePanelRight.innerHTML = '';

    // елементи для виведення деталей
    const title = document.createElement('h3');
    title.textContent = tech.name;

    const costInfo = document.createElement('p');
    costInfo.textContent = `Ціна: Гроші - ${tech.cost.money}, Дослідницькі бали - ${tech.cost.researchPoints},Відкриті технології - ${tech.cost.technologiesDiscovered}`;

    // додаєм елементи до правої висувної панелі
    sidePanelRight.appendChild(title);
    sidePanelRight.appendChild(costInfo);

    // кнопка НАЗАД
    const backButton = document.createElement('button');
    backButton.textContent = 'Назад';
    const buyButton = document.createElement('button');
    buyButton.textContent = 'Купити';

    buyButton.addEventListener('click', function() {
        if(gameState.money >= tech.cost.money && gameState.researchPoints >= tech.cost.researchPoints &&gameState.technologiesDiscovered >= tech.cost.technologiesDiscovered ){
            tech.isBought = true
            gameState.money -=tech.cost.money;
            gameState.researchPoints -=tech.cost.researchPoints;
            gameState.technologiesDiscovered -=tech.cost.technologiesDiscovered;
            setInterval(() => {
                gameState.money +=tech.multiplier;
            gameState.researchPoints +=tech.multiplier;
            gameState.technologiesDiscovered +=tech.multiplier;
            }, 1000);
        }else{
            alert('недостатньо ресурсів!!!')
        }

        // показ списку технологій
        sidePanelRight.innerHTML = '<h2>Доступні технології:</h2> <ul id="technologies-list"></ul>';
        const technologiesList = document.getElementById('technologies-list');
        technologies.forEach(tech => {
            const listItem = document.createElement('li');
            listItem.textContent = tech.name;
            technologiesList.appendChild(listItem);
    
            // подія на клік
            listItem.addEventListener('click', function() {
                showTechnologyDetails(tech);
            });
        });
        renderTechnologiesList();
    });
    const boughtEl = document.createElement('h2')
    boughtEl.textContent = "Куплено"
    !tech.isBought ? sidePanelRight.appendChild(buyButton) : sidePanelRight.appendChild(boughtEl)
    backButton.addEventListener('click', function() {
        
        // показ списку технологій
        sidePanelRight.innerHTML = '<h2>Доступні технології:</h2> <ul id="technologies-list"></ul>';
        const technologiesList = document.getElementById('technologies-list');
        technologies.forEach(tech => {
            const listItem = document.createElement('li');
            listItem.textContent = tech.name;
            technologiesList.appendChild(listItem);
    
            // подія на клік
            listItem.addEventListener('click', function() {
                showTechnologyDetails(tech);
            });
        });
        renderTechnologiesList();
    });
    sidePanelRight.appendChild(backButton);
}

function renderTechnologiesList() {
    // очищення списка технологій перед рендерингом
    
    technologiesList.innerHTML = '';

    // рендер списка технологій
    technologies.forEach(tech => {
        const listItem = document.createElement('li');
        listItem.textContent = tech.name;
        technologiesList.appendChild(listItem);

        // подія на клік
        listItem.addEventListener('click', function() {
            showTechnologyDetails(tech);
        });
    });
}

// виклик функції для початкового рендеру
renderTechnologiesList();


const skills = [
    {
        name: 'Швидше Дослідження',
        cost: 50,
        effectMultiplier: 0.5, // бали дослідження кожної секунди
        skillType: 'researchSpeed'
    },
    {
        name: 'Зниження Вартості',
        cost: 2000,
        effectMultiplier: 0.95, // Зменшення вартості дослідження на 5%
        skillType: 'researchCost'
    },
    {
        name: 'Пасивний дохід V1',
        cost: 100,
        effectMultiplier: 2, // гроші кожної секунди
        skillType: 'passiveIncomeV1'
    },
    {
        name: 'Технічний прогрес', // тех бали кожної секунди
        cost: 150,
        effectMultiplier: 0.1, 
        skillType: 'techprogress'
    },
    {
        name: 'Пасивний дохід V2',
        cost: 500,
        effectMultiplier: 10, 
        skillType: 'passiveIncomeV2'
    },
    {
        name: 'Швидше ДослідженняV2',
        cost: 500,
        effectMultiplier: 7, 
        skillType: 'researchSpeedV2'
    },
    // Додати інші типи навичок за потребою
];

// Купівля навичок
function buySkill(skillIndex) {
    const selectedSkill = skills[skillIndex];
    if (gameState.researchPoints >= selectedSkill.cost) {
        gameState.researchPoints -= selectedSkill.cost;
        applySkillEffect(selectedSkill);
        renderGame();
        renderSkills();
    } else {
        alert('Недостатньо дослідницьких балів!');
    }
}

function toggleSidePanel() {
    const sidePanel = document.getElementById('side-panel');
    sidePanel.classList.toggle('show-panel');
}
function toggleSidePanelRight() {
    const sidePanel = document.getElementById('side-panel-right');
    sidePanel.classList.toggle('show-panel-right');
}



function applySkillEffect(skill) {
    switch (skill.skillType) {
        case 'researchSpeed':
           
            setInterval(() => {
                gameState.researchPoints +=skill.effectMultiplier
            }, 1000);
            
            break;
        case 'researchCost':
           
            gameState.researchCost *= skill.effectMultiplier
            break;
            case 'passiveIncomeV1':
                setInterval(() => {
                    gameState.money +=skill.effectMultiplier
                }, 1000);
            break;
            case 'techprogress':
                setInterval(() => {
                    gameState.technologiesDiscovered +=skill.effectMultiplier
                }, 1000);
            break;
            case 'passiveIncomeV2':
                setInterval(() => {
                    gameState.money +=skill.effectMultiplier
                }, 1000);
            break;
            case 'researchSpeedV2':
                setInterval(() => {
                    gameState.researchPoints +=skill.effectMultiplier
                }, 1000);
            break;
        
        default:
            break;
    }
}
const skillsList = document.getElementById('skills-list');

// Оновлення інтерфейсу для навичок

function renderSkills() {
    const skillsList = document.getElementById('skills-list');
    skillsList.innerHTML = '';
    skills.forEach((skill, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${skill.name} - Вартість: ${skill.cost} дослідницьких балів`;
        const buyButton = document.createElement('button');
        buyButton.textContent = 'Купити';
        buyButton.addEventListener('click', () => buySkill(index));
        listItem.appendChild(buyButton);
        skillsList.appendChild(listItem);
    });
}

function renderGame() {
    gameScreen.innerHTML = `
        <h2>Гроші: ${gameState.money.toFixed(2)}</h2>
        <h2>Дослідницькі бали: ${gameState.researchPoints.toFixed(2)}</h2>
        <h2>Відкриті технології: ${gameState.technologiesDiscovered.toFixed(2)}</h2>
        <button onclick="discoverTechnology()">Дослідити нову технологію (-${gameState.researchCost} грошей)</button>
    `;
}

function discoverTechnology() {
    if (gameState.money >= gameState.researchCost) {
        gameState.money -= gameState.researchCost;
        gameState.researchPoints += 10;
        gameState.technologiesDiscovered+=0.05;
        renderGame();
    } else {
        alert("Недостатньо грошей для дослідження нової технології!");
    }
}



const goals = {
    "Відкрити 5 технологій": false,
    "купити Біотехнології":false,
    "купити Нанотехнології":false,
    "купити Робототехніка":false,
    "купити Кібербезпека":false,
    "купити Супутникові технології":false,
    "купити Штучний інтелект":false,
    "купити Поновлювана енерія":false,
    "купити Дослідження космосу":false,
    "купити Віртуальна реальність":false,
    "купити Квантові обчислення":false,

};

const achievementsList = document.getElementById('achievements-list');

function renderGoals() {
    achievementsList.innerHTML = "";
    for (const goal in goals) {
        const listItem = document.createElement('li');
        listItem.textContent = `${goal}: ${goals[goal] ? 'Завершено' : 'Не завершено'}`;
        achievementsList.appendChild(listItem);
    }
}

function checkGoals() {

    if (gameState.technologiesDiscovered >= 5 && !goals["Відкрити 5 технологій"]) {
        goals["Відкрити 5 технологій"] = true;
        alert("Ви завершили завдання: Відкрити 5 технологій!");
    }
    if (technologies[0].isBought === true && !goals["купити Супутникові технології"]) {
        goals["купити Супутникові технології"] = true;
        alert('Ви відкрили супутникові технології!');
    }
    if (technologies[1].isBought === true) {
        goals["Штучний інтелект"] = true;
        alert('Ви відкрили Штучний інтелект!');
    }
    if (technologies[2].isBought === true) {
        goals["купити Біотехнології"] = true;
        alert('Ви відкрили Біотехнології!');
    }
    if (technologies[3].isBought === true) {
        goals["купити Нанотехнології"] = true;
        alert('Ви відкрили Нанотехнології!');
    }
    if (technologies[4].isBought === true) {
        goals["купити Робототехніка"] = true;
        alert('Ви відкрили Робототехніка!');
    }
    if (technologies[5].isBought === true) {
        goals["купити Поновлювана енерія"] = true;
        alert('Ви відкрили Поновлювана енерія!');
    }
    if (technologies[6].isBought === true) {
        goals["купити Дослідження космосу"] = true;
        alert('Ви відкрили Дослідження космосу!');
    }
    if (technologies[7].isBought === true) {
        goals["купити Віртуальна реальність"] = true;
        alert('Ви відкрили Віртуальна реальність!');
    }
    if (technologies[8].isBought === true) {
        goals["купити Кібербезпека"] = true;
        alert('Ви відкрили Кібербезпека!');
    }
    if (technologies[9].isBought === true) {
        goals["купити Квантові обчислення"] = true;
        alert('Ви відкрили Квантові обчислення!');
    }
    
    renderGoals();
}


function updateGame() {
    checkGoals();
    renderGame();

    renderSkills(); 
}


setInterval(updateGame, 1000);

renderGame();
