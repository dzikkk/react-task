export function randomFloatBetween(min = 0, max= 1) {
  return ((Math.random() * (max - min)) + min).toFixed(2);
}

export function randomIntegerBetween(min= 0, max = 1) {
  return Math.ceil(randomFloatBetween(min, max));
}