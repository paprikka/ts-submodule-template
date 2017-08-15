import fetch from 'node-fetch'
import { Response } from 'node-fetch'

const makeNotifierClient = ( apiURL: string ) => {
    if(!apiURL) throw new Error('Missing apiURL.')

    return (
        channel: string,
        message: any
    ): Promise<Response> =>  fetch(apiURL, {
        method: 'POST',
        body: JSON.stringify({
            channel,
            message
        })
    })
}


export default makeNotifierClient