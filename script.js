const tileSize = 32;

let x = 320;
let y = 240;
const playerSpeed = 8;

let bink = document.querySelector('#binkDiv');
bink.style.position = "absolute";


let input = {
    right: 0,
    down: 0,
    left: 0,
    up: 0
};

let inputMap = {
    "ArrowRight": 'right',
    'ArrowLeft': 'left',
    'ArrowDown': 'down',
    'ArrowUp': 'up'
};


function updatePosition() {
    if (input['right']) {
        x += 1;
    }
    if (input['left']) {
        x -= 1;
    }
    if (input['down']) {
        y += 1;
    }
    if (input['up']) {
        y -= 1;
    }
    bink.style.left = `${x}px`;
    bink.style.top = `${y}px`;
}

// keyboard input
document.addEventListener('keydown', (event) => {
    // console.log(`keydown: ${event.key}`);
    if (event.key in inputMap) {
        input[inputMap[event.key]] = 1;
    }
});

document.addEventListener('keyup', (event) => {
    // console.log(`keyup: ${event.key}`);
    if (event.key in inputMap) {
        input[inputMap[event.key]] = 0;
    }
});

const updateDelay = 16.7; // 60 updates per second (1000 / 60)
let updateCounter = 0;

// init
updatePosition();
let myTimeout = setTimeout(update, updateDelay);
// document.querySelector('#music').play();

// update ()
function update() {
    updatePosition();
    console.log('update');
    updateCounter += 1;

    myTimeout = setTimeout(update, updateDelay);
}