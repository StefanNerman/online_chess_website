import { isStringAllowed } from "../LandingPage"

it('returns false when string does not comply with name rules', () => {
    expect(isStringAllowed('hey', true)).toBe(true)
    expect(isStringAllowed('12345678901234567890123', true)).toBe(false)
    expect(isStringAllowed('hey ', true)).toBe(false)
    expect(isStringAllowed('he y', false)).toBe(false)
    expect(isStringAllowed('hey`', false)).toBe(false)
    expect(isStringAllowed("'hey", false)).toBe(false)
    expect(isStringAllowed('hey"', true)).toBe(false)
    expect(isStringAllowed('hey__t', false)).toBe(true)
})