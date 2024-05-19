const nacl = require('tweetnacl')

exports.handler = async(event:any) =>{
    const PUBLIC_KEY=process.env.PUBLIC_KEY
    const signature = event.headers['x-signature-ed25519']
    const timestamp = event.headers['x-signature-timestamp'];
    const strBody = event.body

    const isVerified = nacl.sign.detached.verify(
        Buffer.from(timestamp + strBody),
        Buffer.from(signature, 'hex'),
        Buffer.from(PUBLIC_KEY, 'hex')
    )
    
    if(!isVerified){
        return(
            statusCode:401,
            body: JSON.stringify('invalid request signature'),
        )
    }
    return{
        statusCode:200,
        Headers: {"Content-Type": "text/plain"},
        body: JSON.stringify(event)
    }
}