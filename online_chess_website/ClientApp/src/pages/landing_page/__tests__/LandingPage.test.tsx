import { checkString } from "../LandingPage"

it('returns false when string does not comply with name rules', () => {
    expect(checkString('hey', true)).toBe('')
    expect(checkString('12345678901234567890123', true)).toBe('Passwords cannot be over 21 letters long!')
    expect(checkString('hey ', true)).toBe(`Please do not use spaces!`)
    expect(checkString('he y', false)).toBe(`Please do not use spaces!`)
    expect(checkString('hey`', false)).toBe(`', " and ${'`'} signs are not allowed!`)
    expect(checkString("'hey", false)).toBe(`', " and ${'`'} signs are not allowed!`)
    expect(checkString('hey"', true)).toBe(`', " and ${'`'} signs are not allowed!`)
    expect(checkString('hey__t', false)).toBe('')
})