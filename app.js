let timeframe = 'weekly';
const container = document.querySelector('.container');
let regularCards;

//Initializing menu
const menu = document.querySelectorAll('.menu-link');

menu.forEach(element => {
    element.addEventListener('click', menuOnClick);
});

//getting json data

let data = {};

fetch ("data.json")
    .then(response => response.json())
    .then(jsonData => {
        jsonData.forEach(element => {
            container.insertAdjacentHTML('beforeend',
             createCard(element, timeframe));
        })

        //convert array to list
        jsonData.forEach(element => {
            data[element.title] = element.timeframes;
        });

        //referrence to cards
        regularCards = document.querySelectorAll('.regular-card');
        console.log(regularCards);


    });



//functions

function menuOnClick(event){
    timeframe = event.target.innerText.toLowerCase();
    

    updateCards(timeframe);
}

function updateCards(timeframe) {
    regularCards.forEach (card => {
        updateCard(card, timeframe);
    })
}

function updateCard(card, timeframe) {
    const title = card.querySelector('.title').innerText;
    const current = data[title][timeframe]['current'];
    const previous = data[title][timeframe]['previous'];

    const timeframeMsg = {
        'daily': 'Yesterday',
        'weekly': 'Last week',
        'monthly': 'Last Month'
    }

    const hoursElement = card.querySelector('.time');
    hoursElement.innerText = `${current}hrs`;
    const msgElement = card.querySelector('.previous-session');
    msgElement.innerText = `${timeframeMsg[timeframe]} - ${previous}hrs`
}


function createCard(element, timeframe) {
    let title = element['title'];
    let current = element['timeframes'][timeframe]['current'];
    let previous = element['timeframes'][timeframe]['previous'];

    const timeframeMsg = {
        'daily': 'Yesterday',
        'weekly': 'Last week',
        'monthly': 'Last Month'
    }
    return `
    <div class=" ${title.toLowerCase().replace(/\s/g, '')} regular-card">
    <div class="lower-card">
      <div class="row">
        <div class="title">${title}</div>
        <div class="points">
          <div class="point"></div>
          <div class="point"></div>
          <div class="point"></div>
        </div>
      </div>
      <div class="row-1">
        <div class="time">${current}hrs</div>
        <div class="previous-session">${timeframeMsg[timeframe]} - ${previous}hrs</div>
      </div>
    </div>
  </div>`
}