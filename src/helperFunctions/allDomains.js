export function arrayFromTo(from, to) {
    let arr = []
    for (let i = from; i < to; i++) {
        arr.push(i)
    }
    return arr
  }
  
 export default function generateDomain(minimum, maximum, difference) {
    let matrix = []
    for (let i = 0; i < maximum / difference; i++) {
        let columnNumbers = arrayFromTo(minimum + (difference * i), minimum + (difference * (i + 1)))
        matrix.push(columnNumbers)
    }
    return matrix
  }
  