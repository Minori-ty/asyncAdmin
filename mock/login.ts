import { MockMethod } from 'vite-plugin-mock'
export default {
    url: '/api/login',
    method: 'post',
    response: (data) => {
        console.log(data.body.username)

        return {
            username: data.body.username,
            role: data.body.username,
            token: 'afasfafadf',
        }
    },
} as MockMethod
