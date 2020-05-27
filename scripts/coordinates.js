class Coordinates {
    constructor(x, y) {
        this.x = x
        this.y = y
    }

    down() {
        this.y = this.y + 1
    }

    static down = new Coordinates(0, 1)
    static right = new Coordinates(1, 0)
    static left = new Coordinates(-1, 0)

}