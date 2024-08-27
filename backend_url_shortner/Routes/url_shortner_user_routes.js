let express = require('express')
let router = express.Router()

let {newUrlUser, newUrl} = require('../Controllers/url_shortner_user_controllers')

router.post('/addUser', newUrlUser)
router.post('/addNewUrl', newUrl)

module.exports = router