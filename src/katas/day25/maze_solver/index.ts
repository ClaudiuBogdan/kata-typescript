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
    const seen: boolean[][] = Array.from({ length: maze.length }, () =>
        new Array(maze[0].length).fill(false),
    );
    const path: Point[] = [];
    const findPath = (pos: Point): boolean => {
        seen[pos.y][pos.x] = true;
        if (pos.x === end.x && pos.y === end.y) {
            path.push(pos);
            return true;
        }
        for (let [dirX, dirY] of directions) {
            const nextPost = {
                x: pos.x + dirX,
                y: pos.y + dirY,
            };
            if (
                seen[nextPost.y][nextPost.x] ||
                maze[nextPost.y][nextPost.x] === wall
            ) {
                continue;
            }
            const found = findPath(nextPost);
            if (found) {
                path.push(pos);
                return true; // TODO: return true when the position is found
            }
        }
        return false;
    };
    findPath(start);
    return path;
}
