const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.render('index', { message: 'Welcome to CI Pipeline Demo!' })
})

module.exports = router
