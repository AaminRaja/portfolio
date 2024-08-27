let {Schema, model} = require('mongoose')

let urlSchema = new Schema({
    mail_address:{
        type : String,
        required : {value : true, message : "email address is mandatory"},
        unique : {value:true, message:"this email address is already using"}
    },
    urls:{
        type : Object({
            original_url:{
                type : String,
                required : {value:true, message:"original url is mandatory"},
                unique : {value:true, message:"this url is already registered and short url created"}
            },
            short_url:{
                type : String,
                required:{value:true, message:"short url is mandatory"},
                unique : {value:true, message:"This short url is already using for another url"}
            }
        })
    }
})

let UrlUsers = model('UrlUsers', urlSchema)
module.exports = UrlUsers