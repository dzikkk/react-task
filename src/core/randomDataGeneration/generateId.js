import { randomIntegerBetween } from "../helpers/randomNumbers";
const ID_MAX_RANDOM_PART = 9999;
const ID_MIN_RANDOM_PART = 1000;

function randomIdPart() {
  return randomIntegerBetween(ID_MIN_RANDOM_PART, ID_MAX_RANDOM_PART);
}

function nameToId(name) {
  return name.replaceAll(/\s+/g).substring(1, 6);
}

export function generateId(name) {
  return `${randomIdPart()}${nameToId(name)}${randomIdPart()}`;
}