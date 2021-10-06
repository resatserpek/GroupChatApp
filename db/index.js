const mongoose = require('mongoose')
const uri = "mongodb+srv://admin:admin@cluster0.naf1l.mongodb.net/rooms?retryWrites=true&w=majority";



mongoose
    .connect(uri, { useNewUrlParser: true })
    .catch(e => {
        console.error('Connection error', e.message)
    })

const db = mongoose.connection

module.exports = db

