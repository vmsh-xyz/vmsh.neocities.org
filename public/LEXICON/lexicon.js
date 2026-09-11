const container = document.getElementById('grid-container');
const squareSize = 30;
const rows = 9;

const colors = [
    '#ff0055', '#7f00ff', '#00d4ff', '#00ff66',
    '#ffcc00', '#ff5722', '#e91e63', '#9c27b0',
    '#00bcd4', '#4caf50', '#ff9800'
];

let squares = [];

function createGrid() {
    container.innerHTML = '';
    squares = [];

    const cols = Math.ceil(window.innerWidth / squareSize);

    container.style.gridTemplateColumns = `repeat(${cols}, ${squareSize}px)`;

    const totalSquares = cols * rows;

    for (let i = 0; i < totalSquares; i++) {
        const square = document.createElement('div');
        square.classList.add('cell');
        square.style.backgroundColor = getRandomColor();
        container.appendChild(square);
        squares.push(square);
    }
}

function getRandomColor() {
    return colors[Math.floor(Math.random() * colors.length)];
}

function changeRandomSquareColor() {
    if (squares.length === 0) return;
    const randomIndex = Math.floor(Math.random() * squares.length);
    squares[randomIndex].style.backgroundColor = getRandomColor();
}

createGrid();

setInterval(changeRandomSquareColor, 90);

window.addEventListener('resize', createGrid);