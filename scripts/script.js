document.addEventListener('DOMContentLoaded', () => {

    console.log("Javascript loaded");

    addDivs();

    const blocks = new Tetraminos

    const grid = document.querySelector('.grid')
    let squares = Array.from(document.querySelectorAll('.grid div'))

    const scoreDisplay = document.querySelector('#score')
    const startButton = document.querySelector('#start')

    let currentPosition = new Coordinates(3, 15)

    let currentTetramino = randomTetramino(blocks)
    let currentColor = Math.floor(Math.random() * Tetraminos.colors.length)

    draw(squares, currentPosition, currentTetramino)

    timerId = setInterval(moveDown, 1000)

    function moveDown() {
        undraw(squares, currentPosition, currentTetramino)

        currentPosition.down()
        draw(squares, currentPosition, currentTetramino, currentColor)
        freeze()
    }

    function freeze() {
        if (currentTetramino.some(
                index => squareAt(squares, currentPosition.x + index.x, currentPosition.y + index.y + 1).classList.contains('occupied'))) {

            currentTetramino.forEach(
                index => squareAt(squares, currentPosition.x + index.x, currentPosition.y + index.y).classList.add("occupied"))



            currentTetramino = randomTetramino(blocks)
            currentColor = Math.floor(Math.random() * Tetraminos.colors.length)

            currentPosition = new Coordinates(4, 0)

            draw(squares, currentPosition, currentTetramino, currentColor)

        }
    }


})

function draw(squares, position, tetramino, color) {
    tetramino.forEach(index => {

        let square = squareAt(squares, position.x + index.x, position.y + index.y)

        square.classList.add('tetraminos')


        // square.style.color(color)

    })
}

function undraw(squares, position, tetramino) {

    tetramino.forEach(index => {

        let square = squareAt(squares, position.x + index.x, position.y + index.y)

        square.classList.remove('tetraminos')


    })
}

function randomTetramino(pool) {

    let tipo = Math.floor(Math.random() * pool.tetraminoes.length)
    let rotation = Math.floor(Math.random() * 4)

    return pool.tetraminoes[tipo][rotation]

}

function addDivs() {

    for (i = 0; i < 200; i++) {
        let square = document.createElement('div')
        square.classList.add("empty")
        document.getElementById("grid").append(square)
    };

    for (i = 0; i < 10; i++) {
        let square = document.createElement('div')
        square.classList.add("occupied")
        document.getElementById("grid").append(square)
    };


}

function squareAt(squares, i, j) {

    return squares[j * 10 + i]

}