import React from 'react'
import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import user from '@testing-library/user-event'
import Checkbox1 from '../checkbox_1'

describe('Checkbox 1', () => {
    test('onCheck function runs when checkbox is clicked', async () => {
        user.setup()
        const onCheck = jest.fn()
        const onUnCheck = jest.fn()
        render(<Checkbox1 onCheck={onCheck} onUnCheck={onUnCheck} checked={false}/>)
        const checkbox = screen.getByTestId('checkbox-1')
        await user.click(checkbox)
        expect(onCheck).toBeCalledTimes(1)
    })
    test('onUncheck function runs when checkbox is unchecked', async () => {
        user.setup()
        const onCheck = jest.fn()
        const onUnCheck = jest.fn()
        render(<Checkbox1 onCheck={onCheck} onUnCheck={onUnCheck} checked={false}/>)
        const checkbox = screen.getByTestId('checkbox-1')
        await user.click(checkbox)
        await user.click(checkbox)
        expect(onCheck).toBeCalledTimes(1)
        expect(onUnCheck).toBeCalledTimes(1)
    })
    test('onCheck function runs twise when checkbox is clicked three times', async () => {
        user.setup()
        const onCheck = jest.fn()
        const onUnCheck = jest.fn()
        render(<Checkbox1 onCheck={onCheck} onUnCheck={onUnCheck} checked={false}/>)
        const checkbox = screen.getByTestId('checkbox-1')
        await user.click(checkbox)
        await user.click(checkbox)
        await user.click(checkbox)
        expect(onCheck).toBeCalledTimes(2)
    })
})