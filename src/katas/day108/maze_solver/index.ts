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
    const seen: boolean[][] = Array.from({ length: maze.length }, () =>
        new Array(maze[0].length).fill(false),
    );
    const path: Point[] = [];

    const search = (point: Point): boolean => {
        seen[point.y][point.x] = true;
        if (point.x === end.x && point.y === end.y) {
            path.push(point);
            return true;
        }
        for (const direction of directions) {
            const nextPoint = {
                x: point.x + direction.x,
                y: point.y + direction.y,
            };
            if (
                seen[nextPoint.y][nextPoint.x] ||
                maze[nextPoint.y][nextPoint.x] === wall
            ) {
                continue;
            }
            const found = search(nextPoint);
            if (found) {
                path.push(point);
                return true;
            }
        }
        return false;
    };

    return search(start) ? path.reverse() : [];
}
