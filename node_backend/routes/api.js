const express = require('express');
const router = express.Router();
const sensorController = require('../controllers/sensorControllers');

router.get('/sensor', sensorController.getAll);
router.get('/sensor/:id', sensorController.getById);
router.post('/sensor', sensorController.create);
router.put('/sensor/:id', sensorController.update);
router.delete('/sensor/:id', sensorController.delete);

module.exports = router;
