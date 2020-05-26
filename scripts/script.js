document.addEventListener('DOMContentLoaded', () => {

    console.log("Javascript loaded");

    addDivs();


    const blocks = new Tetraminos
        // console.log(blocks.tetraminoes)

    const grid = document.querySelector('.grid')
    let squares = Array.from(document.querySelectorAll('.grid div'))

    const scoreDisplay = document.querySelector('#score')
    const startButton = document.querySelector('#start')


    // let currentPosition = 15 
    let currentPosition = new Coordinates(3, 4)

    function draw(position, tetramino) {
        tetramino.forEach(index => {

            let square = squareAt(squares, position.x + index.x, position.y + index.y)

            square.classList.add('tetraminos')


        })
    }

    let tipo = Math.floor(Math.random() * blocks.tetraminoes.length)
    let rotation = Math.floor(Math.random() * 4)

    draw(currentPosition, blocks.tetraminoes[tipo][rotation])

})



function addDivs() {

    for (i = 0; i < 200; i++) {
        let square = document.createElement('div')
        document.getElementById("grid").append(square)
    };

}

function squareAt(squares, i, j) {

    return squares[j * 10 + i]

}