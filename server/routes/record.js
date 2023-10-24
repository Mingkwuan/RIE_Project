const express = require('express');
const router = express.Router();
const recordController = require('../controllers/recordController');

//Record Routes 
router.get('/', recordController.homepage);
router.get('/about', recordController.about);
router.get('/add', recordController.addRecord);
router.post('/add', recordController.postRecord);
router.get('/view/:id', recordController.view);
router.get('/edit/:id', recordController.edit);

router.put('/edit/:id', recordController.editPost);

router.delete('/edit/:id', recordController.deleteRecord);

//router.post('/search', recordController.searchRecords); (search ระบบระเบิดไปแล้ว ทำไม่สำเร็จ)

module.exports = router;