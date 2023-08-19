export default function two_crystal_balls(breaks: boolean[]): number {
  const steps = Math.floor(Math.sqrt(breaks.length))
  let lastStep = steps
  for(; lastStep < breaks.length; lastStep += steps){
    if(breaks[lastStep]){
      break
    }
  }
  
  let i = lastStep - steps
  for(; i < breaks.length && !breaks[i]; i++){}

  if(i === breaks.length){
    return -1
  }

  return i
}