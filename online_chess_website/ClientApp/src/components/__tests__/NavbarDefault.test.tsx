import React from 'react'
import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import user from '@testing-library/user-event'
import NavbarDefault from '../NavbarDefault'
import {BrowserRouter} from 'react-router-dom'

describe('Navbar default', () => {
    test('menu expands when clicked', async () => {
        user.setup()
        render(
            <BrowserRouter>
                <NavbarDefault offline={false}/>
            </BrowserRouter>
        )
        const button = screen.getByRole('button')
        await user.click(button)
        const dropdown = screen.getByTestId('dropdown')
        const movepiece = screen.getByTestId('dropdown-movepiece')
        expect(dropdown).not.toHaveClass('fully-removed')
        expect(movepiece).not.toHaveClass('fully-removed')
    })
})