class Coordinates {
    constructor(x, y) {
        this.x = x
        this.y = y
    }

    down() {
        this.y = this.y + 1
    }

    left() {
            this.x = this.x - 1 /// hmmm
        }
        // Huh
    moveHorizontal(movimiento) { // veo que le pasas state, pero no lo necesita

        this.x = this.x + movimiento.x

    }

    static down = new Coordinates(0, 1)
    static downLeft = new Coordinates(-1, 1)
    static downRight = new Coordinates(1, 1)

    static right = new Coordinates(1, 0)
    static left = new Coordinates(-1, 0)

}