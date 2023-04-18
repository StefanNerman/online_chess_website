


export function coordinateConverter(coordinate: number): string{
    let outNumber = coordinate.toString().slice(0, 1)
    let outLetter
    let letter = parseInt(coordinate.toString().slice(1, 2))
    if(letter === 1) outLetter = 'A'
    if(letter === 2) outLetter = 'B'
    if(letter === 3) outLetter = 'C'
    if(letter === 4) outLetter = 'D'
    if(letter === 5) outLetter = 'E'
    if(letter === 6) outLetter = 'F'
    if(letter === 7) outLetter = 'G'
    if(letter === 8) outLetter = 'H'
    let out = outLetter + outNumber
    return out
}