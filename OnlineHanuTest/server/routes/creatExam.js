const express = require('express');
const router = express.Router();
const db = require('../dbsetup');
router.use(express.json()); 

router.post("/createExam", async (req,res) => {
    let name = req.body.name;
    let duration = req.body.duration;
    let ques = req.body.ques;  
    let category = req.body.category;
    const sql = `insert into exams (name_exam,duration,num_quest,category) 
                    values (?,?,?,?)`;
    let rs = await db.query(sql,[name,duration,ques,category]);
})

router.post("/createExam/write/:part", async (req,res) => {
    let part = req.params.part;
    let content = req.body.content;
    const sql1= "select id from exams order by id desc limit 1";
    const rs1 = await db.query(sql1);
    const exam = JSON.parse(JSON.stringify(rs1[0]))
    const sql = "insert into WritePart (part,content,id_exam) values (?,?,?)";
    let rs = await db.query(sql,[part,content,exam[0].id]);
})
router.post("/createExam/read", async (req,res) => {
    let content = req.body.content;
    const sql1= "select id from exams order by id desc limit 1";
    const rs1 = await db.query(sql1);
    const exam = JSON.parse(JSON.stringify(rs1[0]))
    const sql = "insert into topics (content,id_exam) values (?,?)";
    let rs = await db.query(sql,[content,exam[0].id]);
})
router.post("/createExam/audio", async (req,res) => {
    let content = req.body.content;
    const sql1= "select id from exams order by id desc limit 1";
    const rs1 = await db.query(sql1);
    const exam = JSON.parse(JSON.stringify(rs1[0]))
    const sql = "insert into AudioList (link_audio,id_exam) values (?,?)";
    let rs = await db.query(sql,[content,exam[0].id]);
})
router.post("/createExam/addWord", async (req,res) => {
    let options = req.body.option;
    const sql1= "select id from WritePart order by id desc limit 1";
    const rs1 = await db.query(sql1);
    const exam = JSON.parse(JSON.stringify(rs1[0]))
    const sql2 = "insert into WordDemo (word) values (?)";
    await db.query(sql2,[options]);
    const sql = "insert into WriteWord (content,id_write) values (?,?)";
    await db.query(sql,[options,exam[0].id]);
})
router.post("/createExam/addQuestion", async (req,res) => {
    let content = req.body.content;
    const sql1= "select id from topics order by id desc limit 1";
    const rs1 = await db.query(sql1);
    const topic = JSON.parse(JSON.stringify(rs1[0]))
    const sql = "insert into questions (content,id_topic) values (?,?)";
    let rs = await db.query(sql,[content,topic[0].id]);
})
router.post("/createExam/addQuestionListen", async (req,res) => {
    let content = req.body.content;
    const sql1= "select id from AudioList order by id desc limit 1";
    const rs1 = await db.query(sql1);
    const topic = JSON.parse(JSON.stringify(rs1[0]))
    const sql = "insert into questions (content,id_audio) values (?,?)";
    let rs = await db.query(sql,[content,topic[0].id]);
})
router.post("/createExam/addOptions", async (req,res) => {
    let content = req.body.content;
    const sql1= "select id from questions order by id desc limit 1";
    const rs1 = await db.query(sql1);
    const topic = JSON.parse(JSON.stringify(rs1[0]))
    const sql = "insert into optionRead (content,id_ques) values (?,?)";
    let rs = await db.query(sql,[content,topic[0].id]);
})
router.post("/createExam/addOptionsListen", async (req,res) => {
    let content = req.body.content;
    const sql1= "select id from questionLis order by id desc limit 1";
    const rs1 = await db.query(sql1);
    const topic = JSON.parse(JSON.stringify(rs1[0]))
    const sql = "insert into optionRead (content,id_ques) values (?,?)";
    let rs = await db.query(sql,[content,topic[0].id]);
})
router.post("/createExam/addSpeak", async (req,res) => {
    let content = req.body.ques;
    let part = req.body.part;
    const sql1= "select id from exams order by id desc limit 1";
    const rs1 = await db.query(sql1);
    const topic = JSON.parse(JSON.stringify(rs1[0]))
    const sql = "insert into SpeakQues (part,content,id_exam) values (?,?,?)";
    let rs = await db.query(sql,[part,content,topic[0].id]);
})

module.exports = router;