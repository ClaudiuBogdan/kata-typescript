const directions = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
];

export default function solve(
    maze: string[],
    wall: string,
    start: Point,
    end: Point,
): Point[] {
    const seen: boolean[][] = Array.from({ length: maze[0].length }, () =>
        new Array(maze.length).fill(false),
    );
    const path: Point[] = [];
    const search = (pos: Point): boolean => {
        seen[pos.y][pos.x] = true;
        if (pos.x === end.x && pos.y === end.y) {
            path.push(pos);
            return true;
        }
        for (let direction of directions) {
            const nextPos: Point = {
                x: pos.x + direction[0],
                y: pos.y + direction[1],
            };
            const isWall = maze[pos.y][pos.x] === wall;
            if (seen[nextPos.y][nextPos.x] || isWall) {
                continue;
            }
            const found = search(nextPos);
            if (found) {
                path.push(pos);
                return true;
            }
        }
        return false;
    };
    search(start);
    return path;
}
