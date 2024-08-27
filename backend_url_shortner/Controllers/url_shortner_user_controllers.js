let crypto = require('crypto')

let UrlUsers = require('../Schemas/url_shortner_user_schema');
const { error } = require('console');

let newUrlUser = async(req, res, next) => {
    console.log('adding new user');
    try {
        let {email_address, original_url} = req.body
        console.log(email_address);
        console.log(original_url);
        if(email_address && original_url){
            let short_url = crypto.randomBytes(20).toString('hex')
            console.log(short_url);
            let new_url_user = await UrlUsers.create({email_address, original_url, short_url})
        }else{
            console.log('entered only with email addreass');
            let new_url_user = await UrlUsers.create({email_address})
        }
        console.log(new_url_user);
        res.json({error:false, message:"new user added successfully"})
    } catch (error) {
        next(error)
    }
}

let newUrl = async(req, res, next) => {
    console.log('adding new url');
    try {
        let {email_address, original_url} = req.body
        let existing_user = await UrlUsers.findOne({email_address:email_address})
        if(existing_user){
            res.json({error:true, message:"This email address is already using"})
        }else{
            let short_url = crypto.randomBytes(20).toString('hex')
            console.log(short_url);
            let new_url_user = await UrlUsers.updateOne({_id:existing_user._id}, {email_address, original_url, short_url}, {new:true})
            res.json({error:false, message:"new short url generated", short_url:short_url})
        }
    } catch (error) {
        next(error)
    }
}

module.exports = {newUrlUser, newUrl}