const express = require('express');
const controllers = require('./controllers');

const router = express.Router();

router.post('/login',controllers.login);
router.post('/create',controllers.create);
router.post('/change-password',controllers.password);
router.post('/delete-account',controllers.remove);
router.post('/update-profile-pic',controllers.changeProfilePic);

module.exports = router;
