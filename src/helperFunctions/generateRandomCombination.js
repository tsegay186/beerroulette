function randomInteger(min, max) {
    // here rand is from min to (max+1)
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}

function arrayWithOut(array, element) {
    let index = array.indexOf(element);
    let temp = [...array];
    index >= 0 ? temp.splice(index, 1) : index
    return temp;
}

export function arrayExcluding(array, elements) {
    let temp = [...array];
    for (let element of elements) {
        temp = arrayWithOut(temp, element)
    }
    return temp;
}

export function pickRandomNUmber(array) {
    let length = array.length;
    let randomNumber = undefined
    if (length) {
        let firstIndex = 0;
        let lastIndex = length - 1;
        let index = randomInteger(firstIndex, lastIndex);
        randomNumber = array[index]

    }
    return randomNumber
}
export function arrayFromTo(from, to) {
    let arr = []
    for (let i = from; i <= to; i++) {
        arr.push(i)
    }
    return arr
  }
  
const domainSet = arrayFromTo(1, 24)

export const generateDefaultCombination = (number) => {
const  defaultArrangement = [] 
for(let i =0; i<number; i++){
  let number = pickRandomNUmber(arrayExcluding(domainSet, defaultArrangement))
  defaultArrangement.push(number)
}
return defaultArrangement
}

