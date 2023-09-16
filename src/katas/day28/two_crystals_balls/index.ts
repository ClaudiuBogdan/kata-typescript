export default function two_crystal_balls(breaks: boolean[]): number {
  const steps = Math.floor(Math.sqrt(breaks.length));
  let lastStep = 0;
  for(; lastStep < breaks.length && !breaks[lastStep]; lastStep += steps){
  }
  if(lastStep === 0){
    return 0
  }
  lastStep -= steps;
  for(let i = lastStep; i < breaks.length; i++){
    if(breaks[i]){
      return i
    }
  }
  return -1
}