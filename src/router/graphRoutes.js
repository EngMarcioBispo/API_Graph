const express = require('express');
const router = express.Router();
const graphController = require('../controller/GraphController');



router.post('/graph', graphController.saveGraph);
router.get('/graph/:graphId', graphController.recoverGraph);
router.post('/routes/:graphId/from/:town1/to/:town2', graphController.findRouter);
router.post('/distance/:graphId/from/:town1/to/:town2', graphController.minimumDistanceGraph);


module.exports = router;