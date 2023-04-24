import {rest} from 'msw'

export const handlers = [
    rest.get('http://localhost:44417/api/login', (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(7))
    }),
    rest.get('http://localhost:44417/api/profiles', (req, res, ctx) => {
        
    })
]