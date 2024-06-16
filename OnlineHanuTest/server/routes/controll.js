const express = require('express');
const router = express.Router();
router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
const dashboard = require('./adminHome');
const newExam = require('./creatExam');

router.get("/dashboard/exams", dashboard);
router.get("/dashboard/users", dashboard);

router.post('/createExam', newExam);
router.post('/createExam/write/:part', newExam);
router.post('/createExam/read', newExam);
router.post('/createExam/audio', newExam);
router.post('/createExam/addWord', newExam);
router.post('/createExam/addQuestion', newExam);
router.post('/createExam/addQuestionListen', newExam);
router.post('/createExam/addOptions', newExam);
router.post('/createExam/addSpeak', newExam);
router.post('/createExam/addOptionsListen', newExam);


module.exports = router;