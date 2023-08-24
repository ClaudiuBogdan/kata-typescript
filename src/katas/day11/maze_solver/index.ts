const directions: Point[] = [
    {
        x: 0,
        y: 1,
    },
    {
        x: 1,
        y: 0,
    },
    {
        x: 0,
        y: -1,
    },
    {
        x: -1,
        y: 0,
    },
];
export default function solve(
    maze: string[],
    wall: string,
    start: Point,
    end: Point,
): Point[] {
    const generateSeenRaw = (len: number) =>
        Array.from({ length: len }, () => false);
    const seen: boolean[][] = Array.from({ length: maze.length }, () =>
        generateSeenRaw(maze[0].length),
    );
    const path: Point[] = [];

    function findPath(currPos: Point): boolean {
        if (currPos.x === end.x && currPos.y === end.y) {
            path.push(currPos);
            return true;
        }
        for (let direction of directions) {
            const nextPos = {
                x: currPos.x + direction.x,
                y: currPos.y + direction.y,
            };
            const isSeen = seen[nextPos.y][nextPos.x];
            if (isSeen) {
                continue;
            }

            seen[nextPos.y][nextPos.x] = true;
            const isWall = maze[nextPos.y][nextPos.x] === wall;
            if (isWall) {
                continue;
            }
            const hasFound = findPath(nextPos);
            if (hasFound) {
                path.push(currPos);
                return true;
            }
        }
        return false;
    }

    findPath(start);
    return path;
}
