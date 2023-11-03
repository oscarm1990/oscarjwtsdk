require ('dotenv').config()

const express = require ('express')
const app = express()

const jwt = require ('jsonwebtoken')

app.use(express.json())

const posts = [{
    
    user_token: '12345',
    nombre: 'Osc',
    email: 'oscar@example.com',
    
},
{
    user_token: '67890',
    nombre: 'Joseito',
    email: 'jose@example.com',
    
},

{
    user_token: '1990',
    nombre: 'Oriana',
    email: 'oriana@example.com',
    
}



]



app.post('/login', (req,res) => {

    //Authenticate the user

    const timestamp = Math.round((new Date()).getTime()/1000)

    const username = posts.find(username => username.user_token === req.body.user_token)

    if (!username) {
        return res.status(401).json({ error: "User not found" });
    }

    const user = {
        
        name:username.nombre,
        email:username.email,
        iat: timestamp,
        jti: timestamp/100
    }

    const accessToken = jwt.sign (user, process.env.ACCESS_TOKEN_SECRET)
    res.json({accessToken: accessToken})

})


app.listen(3000)