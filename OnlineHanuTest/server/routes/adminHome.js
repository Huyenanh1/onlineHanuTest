const express = require('express');
const router = express.Router();
const db = require('../dbsetup');

router.get("/dashboard/exams", async (req,res) => {
    const sql = 'select*from exams order by id desc';
    const rs = await  db.query(sql);
    const exam = JSON.parse(JSON.stringify(rs[0]));
    res.send(exam);
})
router.get("/dashboard/users", async (req,res) => {
    const sql = `select *from users where id in (
        SELECT min(id) FROM users group by googleID)`;
    const rs = await  db.query(sql);
    const users = JSON.parse(JSON.stringify(rs[0]));
    res.send(users);
})

module.exports = router;