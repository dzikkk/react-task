import { randomIntegerBetween } from "../helpers/randomNumbers";

const NAMES = [
  'Olivia',  'Emma',  'Charlotte',  'Amelia',  'Ava',  'Sophia',  'Isabella',  'Mia',  'Liam',  'Noah',  'Oliver',  'Elijah',  'James',  'William',  'Benjamin',  'Lucas',
]

const SURNAMES = [
  'SMITH', 'BROWN', 'WILSON', 'THOMSON', 'ROBERTSON', 'CAMPBELL', 'STEWART', 'ANDERSON', 'MACDONALD', 'SCOTT', 'REID',
]

export function generateClientsName() {
  const name = NAMES[randomIntegerBetween(0, NAMES.length-1)]
  const surnamesCount = SURNAMES[randomIntegerBetween(0, SURNAMES.length-1)]
  
  return `${name} ${surnamesCount}`;
}