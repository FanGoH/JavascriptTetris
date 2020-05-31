document.addEventListener('DOMContentLoaded', () => {

    console.log("Javascript loaded");

    addDivs();

    const blocks = new Tetraminos

    let gridArray = Array.from(document.querySelectorAll('.grid div'))
    let miniGridArray = Array.from(document.querySelectorAll('.minigrid div'))
    const grid = document.querySelector('.grid')

    const scoreDisplay = document.querySelector('#score')
    const startButton = document.querySelector('#start')

    let nextTetramino = {
        position: new Coordinates(0, 0),
        tetramino: null,
        tetraminoFamily: null,
        currentRotation: null,
        color: Tetraminos.colors[Math.floor(Math.random() * Tetraminos.colors.length)],
        pool: blocks,
        squares: miniGridArray,
        width: 4
    }

    let currentState = {
        position: new Coordinates(3, 15),
        tetraminoFamily: null,
        currentRotation: null,
        tetramino: null,
        color: Tetraminos.colors[Math.floor(Math.random() * Tetraminos.colors.length)],
        pool: blocks,
        squares: gridArray,
        lastLine: false,
        width: 10,
        nextObject: nextTetramino,
        isPaused: true,
        timerId: null,
        occupiedGrid: [],
        GAMEOVER: false
    }

    for (i = 0; i < 20; i++) {

        currentState.occupiedGrid.push(0)

    }

    nextTetramino.tetramino = randomTetramino(blocks, nextTetramino)
    currentState.tetramino = randomTetramino(blocks, currentState)

    draw(currentState)
    onStartButtonPressed(currentState)

    document.addEventListener("keydown", event => update(event, currentState))
    startButton.addEventListener('click', function() { onStartButtonPressed(currentState) })
    document.addEventListener("visibilitychange", function() {
        if (!currentState.isPaused) {
            clearInterval(currentState.timerId)
            currentState.isPaused = true
        }
    })

})

const key_mappings = {
    13: (state) => onStartButtonPressed(state),
    80: (state) => onStartButtonPressed(state),
    37: (state) => moveHorizontal(state, Coordinates.left),
    38: (state) => rotate(state),
    39: (state) => moveHorizontal(state, Coordinates.right),
    40: (state) => moveDown(state),
}

function update(event, currentState) {
    if (currentState.GAMEOVER || currentState.isPaused || !(event.keyCode in key_mappings))
        return
    key_mappings[event.keyCode](currentState)
}

function renderFrame(callback, currentState) {
    undraw(currentState)
    r = callback()
    draw(currentState)
    return r
}

function moveDownHelper(state) {
    action = !nextIsBlocked(state, Coordinates.down)
    if (action)
        state.position.down()
    else
        state.lastLine = true
    return action
}

function moveDown(state) {
    action = renderFrame(() => moveDownHelper(state), state)
    if (state.lastLine && !action) {
        freeze(state, Coordinates.down)
        state.lastLine = false
    } // freeze(state, Coordinates.down)
}

function moveHorizontal(state, direction) {
    if (nextIsBlocked(state, direction))
        return
    renderFrame(() => state.position.moveHorizontal(direction), state)
}

function rotate(state) {
    if (isRotationBlocked(state))
        return

    renderFrame(() => {
        state.currentRotation = (state.currentRotation + 1) % 4
        state.tetramino = state.tetraminoFamily[state.currentRotation]
    }, state)
}

function isPositionXWrong(x, state) {
    return x < 0 || x > state.width - 1
}

function isOccupied(state, x, y) {
    const square = squareAt(state, x, y)
    return square.classList.contains("occupied") || isPositionXWrong(x, state)
}

function isRotationBlocked(state) {
    let nextTetramino = state.tetraminoFamily[(state.currentRotation + 1) % 4]
    return nextTetramino.some(cuadrito => {
        const nextX = state.position.x + cuadrito.x
        const nextY = state.position.y + cuadrito.y
        return isOccupied(state, nextX, nextY)
    })
}

function nextIsBlocked(state, nextMove) {
    let resultado = false
    return state.tetramino.some(cuadrito => {
        const nextX = state.position.x + cuadrito.x + nextMove.x
        const nextY = state.position.y + cuadrito.y + nextMove.y
        return isOccupied(state, nextX, nextY)
    })
}

function freeze(currentState, nextMove) {
    if (nextIsBlocked(currentState, nextMove)) {
        tetraminoApply(currentState, cuadrito => {
            cuadrito.classList.add("occupied")
        })

        currentState.tetramino.forEach(cuadrito => {
            currentState.occupiedGrid[currentState.position.y + cuadrito.y] += 1
        })

        callNextTetramino(currentState)
        currentState.position = new Coordinates(4, 0)

        if (nextIsBlocked(currentState, Coordinates.down)) {
            gameOver(currentState)
            renderFrame(function() {}, currentState)
            return
        }
        // console.log(currentState.occupiedGrid)
        for (i = 19; i >= 0; i--) {
            if (isRowOcuppied(currentState, i)) {
                // console.log("He desocupado una fila")
                deleteRow(currentState, i)
            }
        }
    }
}

function tetraminoApply(state, callback) {
    state.tetramino.forEach(cuadrito => {
        let xCoord = state.position.x + cuadrito.x
        let yCoord = state.position.y + cuadrito.y
        callback(squareAt(state, xCoord, yCoord))
    })
}

function draw(currentState) {
    tetraminoApply(currentState, cuadrito => cuadrito.style.backgroundColor = currentState.color)
    if (currentState.nextObject != null) {
        draw(currentState.nextObject)
    }
}

function undraw(currentState) {
    tetraminoApply(currentState, cuadrito => cuadrito.style.backgroundColor = "")
    currentState.nextObject.squares.forEach(cuadrito => cuadrito.style.backgroundColor = "")
}

function randomTetramino(pool, state) {
    let tipo = Math.floor(Math.random() * pool.tetraminoes.length)
    let rotation = Math.floor(Math.random() * 4)

    state.tetraminoFamily = pool.tetraminoes[tipo]
    state.currentRotation = rotation
    state.color = pickColor(state)

    return pool.tetraminoes[tipo][rotation]

}

function pickColor(state) {

    let actualColor = state.color
    let newColor = ""

    do {

        let randomPick = Math.random() * Tetraminos.colors.length

        newColor = Tetraminos.colors[Math.floor(randomPick)]

    } while (newColor == actualColor)

    return newColor

}

function callNextTetramino(state) {
    let nextTetramino = state.nextObject

    state.tetramino = nextTetramino.tetramino
    state.tetraminoFamily = nextTetramino.tetraminoFamily
    state.currentRotation = nextTetramino.currentRotation
    state.color = nextTetramino.color

    nextTetramino.tetramino = randomTetramino(state.pool, nextTetramino)

    // if (nextIsBlocked(state, new Coordinates(0, 0))) {
    //     console.log("GAME OVER!")
    // }
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
        square.classList.add("bottom")
        document.getElementById("grid").append(square)
    };

    for (i = 0; i < 16; i++) {
        let square = document.createElement('div')
        square.classList.add("empty")
        document.getElementById("minigrid").append(square)
    }

}

function squareAt(state, i, j) {
    return state.squares[j * state.width + i]
}

function onStartButtonPressed(state) {
    if (state.isPaused) {
        state.timerId = setInterval(function() { moveDown(state) }, 1000)
        state.isPaused = false
    } else {
        clearInterval(state.timerId)
        state.isPaused = true
    }
}

function isRowOcuppied(state, yCoordinate) {

    return state.occupiedGrid[yCoordinate] == state.width

}

function deleteRow(state, yCoordinate) {

    state.occupiedGrid[yCoordinate] = 0
    let occupiedNumber = state.occupiedGrid.splice(yCoordinate, 1)
    state.occupiedGrid = occupiedNumber.concat(state.occupiedGrid)

    for (i = 0; i < 10; i++) {
        let square = squareAt(state, i, yCoordinate)
        square.style.backgroundColor = ""
        square.classList.remove('occupied')
    }

    let row = state.squares.splice(yCoordinate * state.width, state.width)

    state.squares = row.concat(state.squares)
    state.squares.forEach(cell => grid.appendChild(cell))

}

function gameOver(state) {

    console.log("GAME OVER!")
    state.GAMEOVER = true
    clearInterval(state.timerId)

}