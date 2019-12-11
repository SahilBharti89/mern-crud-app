const express = require('express');
const router = express.Router();

// importing controller
const employeeController = require('../controllers/employeeController');

router.get('/list', employeeController.list);
router.post('/create', employeeController.create);
router.get('/get/:id', employeeController.get);
router.post('/update/:id', employeeController.update);
router.post('/delete', employeeController.delete);

module.exports = router;