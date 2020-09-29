const express=require('express')
const qaCtrl=require('../controllers/qa-ctrl')

const router=express.Router()

router.post('/qa',qaCtrl.createqa)
router.put('/qa/:id',qaCtrl.updateqa)
router.delete('/qa/:id',qaCtrl.deleteqa)
router.get('/qa/:id',qaCtrl.getqaById)
router.get('/qas',qaCtrl.getqas)

module.exports=router