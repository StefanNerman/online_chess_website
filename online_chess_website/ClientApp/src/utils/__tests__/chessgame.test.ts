import {coordinateConverter} from '../chessgame'

test('number coordinate should be converted to letter + number coordinate', () => {
    expect(coordinateConverter(11)).toBe('A1')
    expect(coordinateConverter(88)).toBe('H8')
    expect(coordinateConverter(53)).toBe('C5')
    expect(coordinateConverter(81)).toBe('A8')
})