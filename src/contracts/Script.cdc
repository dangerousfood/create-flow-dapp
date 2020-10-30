pub struct Point {
    pub var x: Int
    pub var y: Int

    init(x: Int, y: Int) {
        self.x = x
        self.y = y
    }
}

pub fun main(): [Point] {
    return [Point(x: 1, y: 1), Point(x: 2, y: 2)]
}