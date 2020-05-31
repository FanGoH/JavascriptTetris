class Tetraminos {

    tetraminoes = []

    static colors = [
        "#1f62cf",
        "#14db8b",
        "#e35914",
        "#8a0e0e",
        "#758d0b",
        "#a70b9f",
        "#258f0b"
    ]

    static Ltetramino = [
        new Coordinates(1, 0),
        new Coordinates(1, 1),
        new Coordinates(1, 2),
        new Coordinates(2, 2)
    ]

    static ILtetramino = [
        new Coordinates(1, 0),
        new Coordinates(1, 1),
        new Coordinates(0, 2),
        new Coordinates(1, 2)
    ]

    static ZRtetramino = [
        new Coordinates(1, 1),
        new Coordinates(2, 1),
        new Coordinates(0, 2),
        new Coordinates(1, 2)
    ]

    static ZLtetramino = [
        new Coordinates(0, 1),
        new Coordinates(1, 1),
        new Coordinates(1, 2),
        new Coordinates(2, 2)
    ]

    static Ttetramino = [
        new Coordinates(1, 1),
        new Coordinates(0, 2),
        new Coordinates(1, 2),
        new Coordinates(2, 2)
    ]

    static Stetramino = [
        new Coordinates(0, 1),
        new Coordinates(1, 1),
        new Coordinates(0, 2),
        new Coordinates(1, 2)
    ]

    static Itetramino = [
        new Coordinates(1, 0),
        new Coordinates(1, 1),
        new Coordinates(1, 2),
        new Coordinates(1, 3)
    ]

    static rawTetraminoes = [
        Tetraminos.Ltetramino,
        Tetraminos.ILtetramino,
        Tetraminos.ZRtetramino,
        Tetraminos.ZLtetramino,
        Tetraminos.Ttetramino,
        Tetraminos.Stetramino
    ]


    constructor() {

        Tetraminos.rawTetraminoes.forEach(tetramino => {

            let tetraminoSet = []

            let currentTetramino = tetramino

            for (i = 0; i < 4; i++) {

                tetraminoSet.push(currentTetramino)

                currentTetramino = Tetraminos.rotation(currentTetramino, 3)

            }

            this.tetraminoes.push(tetraminoSet)

        })

        let barTetraminoSet = []

        let currentTetramino = Tetraminos.Itetramino

        for (i = 0; i < 4; i++) {

            barTetraminoSet.push(currentTetramino)

            currentTetramino = Tetraminos.rotation(currentTetramino, 4)

        }

        this.tetraminoes.push(barTetraminoSet)

    }

    static rotation(tetramino, squareSize) {
        let rotatedTetramino = new Array

        tetramino.forEach(coordenada => {

            rotatedTetramino.push(new Coordinates((squareSize - 1) - coordenada.y, coordenada.x))

        })

        return rotatedTetramino
    }

}