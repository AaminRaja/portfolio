let express = require('express')
let urlRoutes = require('./Routes/url_shortner_user_routes')
let connectDataBase = require('./db/connectDB')
let cors = require('cors')
require('dotenv').config()

let app = express()
app.use(cors())
app.use(express.json())
app.use('/url', urlRoutes)

app.use('*', (req, res) => {
    res.json({error:true, message:'page not found'})
})

app.use((err, req, res, next) => {
    res.json({error:true, message:err})
})

let startServer = async() => {
    try {
        await (connectDataBase(process.env.PORT))
        console.log('mogoDB connected successfully');

        app.listen(3000, () => {
            console.log('server is running at port : http://localhost:3000');
        })

    } catch (error) {
        console.log(error);
    }
}

startServer()