import {coordinateConverter} from '../chessgame'

describe('testing chessgame.ts file', () => {
    test('number coordinate should be converted to letter + number coordinate', () => {
        expect(coordinateConverter(11)).toBe('A1');
    });
});