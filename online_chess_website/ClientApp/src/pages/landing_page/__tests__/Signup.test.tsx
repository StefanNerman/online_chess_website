import React from 'react'
import Signup from '../Signup'
import {screen, render} from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import user from '@testing-library/user-event'
import '@testing-library/jest-dom'

describe('Signup component', () => {
    test('submitting with no information', async () => {
        user.setup()
        const setLogin = jest.fn()
        render(
            <BrowserRouter>
                <Signup setLogin={setLogin} />
            </BrowserRouter>
        )
        const submitButton = screen.getByText('submit')
        await user.click(submitButton)
        const usernameTextField = screen.getByTestId('signup-username-prompt')
        const passwordTextField = screen.getByTestId('signup-password-prompt')
        expect(usernameTextField).toHaveClass('asterix-red-left')
        expect(passwordTextField).toHaveClass('asterix-red-left')
    })
})