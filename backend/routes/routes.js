const express = require('express');
const router = express.Router();
const login = require('./login');
const member = require('./member');
const contact = require('./contact');
const complain = require('./complain');
const society = require('./society');
const rentlist = require('./rent');
const selllist = require('./sell');
const message = require('./message');


router.use('/login', login);
router.use('/member', member);
router.use('/contact', contact);
router.use('/complain', complain);
router.use('/society', society);
router.use('/rentlist', rentlist);
router.use('/selllist', selllist);
router.use('/message', message);


module.exports = router;