require("dotenv").config();
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const authRoute = require("./routes/auth");
const cookieSession = require("cookie-session");
const passportStrategy = require("./passport");
const app = express();
const db = require("./dbsetup");

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use(
	cookieSession({
		name: "session",   
		keys: ["cyberwolve"],
		maxAge: 24 * 60 * 60 * 100,
		resave: false,
		saveUninitialized: true
	})
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
	cors({
		origin: "http://localhost:3000",
		methods: "GET,POST,PUT,DELETE",
		credentials: true,
	})
);

app.use("/auth", authRoute);
app.get('/history', async (req,res) =>{
	let sql1 = "select* from users where googleID = ? limit 1";
	const rs1 = await db.query(sql1, [req.session.passport.user._json.sub]);
	const user_id = JSON.parse(JSON.stringify(rs1[0]));
	res.send((user_id[0].id).toString())
});

app.get('/read/quiz/:type', async (req,res) =>{
	let type = req.params.type;
	let sql = 'select * from exams where category = ?';
	let rs = await db.query(sql,type);
	let exam = JSON.parse(JSON.stringify(rs[0]));
	res.send(exam)
});
app.get('/details/:id', async (req,res) =>{
	let id_exam = req.params.id;
	let sql = 'select * from topics where id_exam=?';
	let rs = await db.query(sql, id_exam);
	let topic = JSON.parse(JSON.stringify(rs[0]));
	res.send(topic)
});
app.get('/listen/:id', async (req,res) =>{
	let id_exam = req.params.id;
	let sql = 'select * from questionLis where id_exam=?';
	let rs = await db.query(sql, id_exam);
	let topic = JSON.parse(JSON.stringify(rs[0]));
	res.send(topic)
});
app.get('/listenOption/:id', async (req,res) =>{
	let id_exam = req.params.id;
	let sql = 'select * from optionLis where id_ques=?';
	let rs = await db.query(sql, id_exam);
	let topic = JSON.parse(JSON.stringify(rs[0]));
	res.send(topic)
});
app.get('/topics/:id', async (req,res) =>{
	let id_topic = req.params.id;
	let sql = 'select * from questions where id_topic=?';
	let rs = await db.query(sql, id_topic);
	let questions = JSON.parse(JSON.stringify(rs[0]));
	res.send(questions)
});
app.get('/options/:id', async (req,res) =>{
	let id_ques = req.params.id;
	let sql = 'select * from optionRead where id_ques=?';
	let rs = await db.query(sql, id_ques);
	let questions = JSON.parse(JSON.stringify(rs[0]));
	res.send(questions)
});

app.post('/history', async (req,res) => {
	let sql1 = "select* from users where googleID = ? ";
	const rs1 = await db.query(sql1, [req.body.user]);
	const user_id = JSON.parse(JSON.stringify(rs1[0]));
	const sql = 'insert into UserExam (id_user, id_exam) values (?,?)';
	await db.query(sql, [user_id[0].id,req.body.exam]);
})

app.get('/dashboard/:id', async (req,res) => {
	let sql1 = "select id from users where googleID = ?";
	const rs1 = await db.query(sql1, [req.session.passport.user._json.sub]);
	const user_id = JSON.parse(JSON.stringify(rs1[0]));
	const sql = 'select exams.* from exams, UserExam,users where users.id = ? and exams.id = UserExam.id_exam'
	const rs = await db.query(sql, [user_id[0].id]);
	const exam_done = JSON.parse(JSON.stringify(rs[0]));
	res.send(exam_done);
})
db.connect((err,connection) => {
    if(err)throw err;
    console.log("Connection to database is successful")
})
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listenting on port ${port}...`));
