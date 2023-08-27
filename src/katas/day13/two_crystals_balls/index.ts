export default function two_crystal_balls(breaks: boolean[]): number {
    const steps = Math.floor(Math.sqrt(breaks.length));
    let currStep = steps;
    for (; currStep < breaks.length; currStep += steps) {
        if (breaks[currStep]) {
            break;
        }
    }
    if (!breaks[currStep]) {
        return -1;
    }
    const prevStep = currStep - steps;
    let i = prevStep;
    for (; i <= currStep; i++) {
        if (breaks[i]) {
            break;
        }
    }
    return i;
}
