/**
 * @link https://chat.openai.com/share/6df8adc2-c6a4-4aad-8ac8-4f401aa2b926
 * @param breaks
 */
export default function two_crystal_balls(breaks: boolean[]): number {
    const steps = Math.floor(Math.sqrt(breaks.length));
    let currStep = steps;
    for (; currStep < breaks.length && !breaks[currStep]; currStep += steps) {}
    currStep -= steps;
    for (; currStep < breaks.length && !breaks[currStep]; currStep++) {}

    if (currStep >= breaks.length) {
        return -1;
    }
    return currStep;
}
