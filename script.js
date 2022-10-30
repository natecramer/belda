let tileData = [];

const tileSize = 32;

let x = 632;
let y = 264;
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
    'ArrowLeft':  'left',
    'ArrowDown':  'down',
    'ArrowUp':    'up',

    "d": 'right',
    'a': 'left',
    's': 'down',
    'w': 'up'
};


function updatePosition() {
    const SPEED = 4;
    if (input['right']) {
        x += SPEED;
    }
    if (input['left']) {
        x -= SPEED;
    }
    if (input['down']) {
        y += SPEED;
    }
    if (input['up']) {
        y -= SPEED;
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
const MAP_WIDTH = 255;

function setMapFromTileData(start_col, start_row) {
    const mapDiv = document.querySelector('#map');
    let idx = 0;
    for (let row = start_row; row < start_row+88; row++) {
        for (let col = 0; col < start_col+256; col++) {
            idx = tileData[Math.floor(row * MAP_WIDTH) + col];
            let tile = document.createElement('div');
            tile.classList.add('tile');
            // 18 appears as an empty tile (black)
            if (idx === 18) {
                tile.classList.add('empty');
            }
            let tileCol = idx % 20; // 18;
            let tileRow = Math.floor(idx / 20);
            let x = (tileCol * 34) + 2; // (col * 17) + 1
            let y = (tileRow * 34) + 2;
            tile.style['background-position'] = `top -${y}px left -${x}px`;
            // tile.textContent = `${idx}`;
            // tile.style.color = '#fff';
            // tile.style['font-size'] = '8pt';
            mapDiv.appendChild(tile);
        }
    }
    // for (let i = 0; i < tileData.length; i++) {
    //     let idx = tileData[i];
    //     let tile = document.createElement('div');
    //     tile.classList.add('tile');
    //     let col = idx % 18;
    //     let row = Math.floor(idx / 18);
    //     let x = (col * 34) + 2; // (col * 17) + 1
    //     let y = (row * 34) + 2;
    //     tile.style['background-position'] = `top -${y}px left -${x}px`;
    //     tile.textContent = `${idx}`;
    //     tile.style.color = '#fff';
    //     tile.style['font-size'] = '8pt';
    //     mapDiv.appendChild(tile);
    // }
}

var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && this.status == 200) {
        tilesStrs = this.responseText.split(' ');
        // tileData = [];
        let n = 0;
        tilesStrs.forEach(e => {
            e = '0x' + e;
            n = parseInt(e);
            // if (!isNaN(n))
            if (n == undefined) {
                console.log(`${e} was undefined`);
            }
            tileData.push(n);
        });
        // console.log(tileData);
        setMapFromTileData(0, 0);
    }
};
xhr.open('GET', 'tiledata.txt');
xhr.send();

// document.querySelector('#music').play();


// update ()
function update() {
    updatePosition();
    console.log('update');
    updateCounter += 1;

    myTimeout = setTimeout(update, updateDelay);
}