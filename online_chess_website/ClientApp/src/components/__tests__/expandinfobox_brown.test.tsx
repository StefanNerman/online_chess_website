import React from 'react'
import ExpandInfoBox from "../expandinfobox_brown"
import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import user from '@testing-library/user-event'

describe('Expand-info-box', () => {
    test('renders correctly', () => {
        render(<ExpandInfoBox text={'text here'}/>)
        const button = screen.getByRole('button')
        const text = screen.getByRole('textbox')
        expect(button).toBeInTheDocument()
        expect(text).toBeInTheDocument()
    })
    test('expands textbox when button is clicked', async () => {
        render(<ExpandInfoBox text={'text here'}/>)
        const text = screen.getByRole('textbox')
        expect(text).toHaveClass('fully-removed')
    })
    test('expands textbox when button is clicked', async () => {
        user.setup()
        render(<ExpandInfoBox text={'text here'}/>)
        const button = screen.getByRole('button')
        const text = screen.getByRole('textbox')
        await user.click(button)
        expect(text).not.toHaveClass('fully-removed')
    })
})