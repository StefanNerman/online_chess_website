import { BrowserRouter } from "react-router-dom"
import React from 'react'

export const provideRouter = ({children}: any) => {
    return(
        <BrowserRouter>
            {children}
        </BrowserRouter>
    )
}