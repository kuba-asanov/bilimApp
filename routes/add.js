const {Router} = require('express')
const Course = require('../models/course')
const auth = require('../middleware/auth')
const router = Router()

router.get('/', auth, (req, res) => {
  res.render('add', {
    title: 'Добавить курс',
    isAdd: true
  })
})

router.post('/', auth, async (req, res) => {
  const course = new Course({
    title: req.body.title,
    description: req.body.description,
    img: req.body.img,
    userId: req.user,
  })

  try {
    await course.save()
    res.redirect('/courses')
  } catch (error) {
    console.log(error)
  }
})

module.exports = router