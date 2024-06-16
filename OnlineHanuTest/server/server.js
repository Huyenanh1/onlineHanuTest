require("dotenv").config();
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const authRoute = require("./routes/auth");
const cookieSession = require("cookie-session");
const passportStrategy = require("./passport");
const app = express();
const db = require("./dbsetup");

app.use('/', require('./routes/controll'));

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
app.get("/", (req, res) => {
	res.setHeader("Access-Control-Allow-Origin", "*")
	res.setHeader("Access-Control-Allow-Credentials", "true");
	res.setHeader("Access-Control-Max-Age", "1800");
	res.setHeader("Access-Control-Allow-Headers", "content-type");
	res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" ); 
	 });
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
	let sql = 'select * from AudioList where id_exam=?  ';
	let rs = await db.query(sql, id_exam);
	let topic = JSON.parse(JSON.stringify(rs[0]));
	res.send(topic)
});
app.get('/write/:id', async (req,res) =>{
	let id_exam = req.params.id;
	let sql = 'select * from WritePart where id_exam=?';
	let rs = await db.query(sql, id_exam);
	let topic = JSON.parse(JSON.stringify(rs[0]));
	res.send(topic)
});   
app.get('/listenQues/:id', async (req,res) =>{
	let id_exam = req.params.id;
	let sql = 'select * from questionLis where id_audio=?';
	let rs = await db.query(sql, id_exam);
	let topic = JSON.parse(JSON.stringify(rs[0]));
	res.send(topic)
});
app.get('/listenOptions/:id', async (req,res) =>{
	let id_exam = req.params.id;
	let sql = 'select * from optionLis where id_ques=?';
	let rs = await db.query(sql, id_exam);
	let topic = JSON.parse(JSON.stringify(rs[0]));
	res.send(topic)
});
app.get('/writeOption/:id', async (req,res) =>{
	let id_exam = req.params.id;
	let sql = 'select * from WriteWord where id_write=?';
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
app.get('/speak/:id/:part', async (req,res) =>{
	let id_exam = req.params.id;
	let part = req.params.part;
	let sql = 'select * from SpeakQues where id_exam=? and part=?';
	let rs = await db.query(sql, [id_exam,part]);
	let questions = JSON.parse(JSON.stringify(rs[0]));
	res.send(questions)
});

app.post('/history', async (req,res) => {
	let sql1 = "select* from users where googleID = ? ";
	const rs1 = await db.query(sql1, [req.body.user]);
	const user_id = JSON.parse(JSON.stringify(rs1[0]));
	const sql2 = "select*from UserExam";
	const rs2 = await db.query(sql2);
	const list_done = JSON.parse(JSON.stringify(rs2[0]));
	let valid = true;
	if(list_done.filter(e => ((e.id_user === user_id[0].id) && (e.id_exam === req.body.exam)).length > 0)){
		valid =false;
		return res.redirect('http://localhost:3000');
	} 
	if(valid) {
		const sql = 'insert into UserExam (id_user, id_exam) values (?,?)';
		await db.query(sql, [user_id[0].id,req.body.exam], (err, results) => {
		if(err) throw err;
		console.log("Succesfull");
	});
	}

})

app.get('/dashboard/:id', async (req,res) => {
	let id = req.params.id;
	let sql1 = "select* from users where googleID = ? limit 1";
	const rs1 = await db.query(sql1, [id]);
	const user_id = JSON.parse(JSON.stringify(rs1[0]));
	const sql = 'select distinct exams.* from exams, UserExam,users where UserExam.id_user = ? and exams.id = UserExam.id_exam'
	const rs = await db.query(sql, [user_id[0].id]);
	const exam_done = JSON.parse(JSON.stringify(rs[0])); 
	res.send(exam_done);
})   
app.get("/demoWord", async (req,res) => {
    const sql1= "select * from WordDemo";
    const rs1 = await db.query(sql1);
    const words = JSON.parse(JSON.stringify(rs1[0]));
    res.send(words);
})
app.post("/deleteExam/:id", async (req,res) => {
	let id = req.params.id;
	await db.query(`SET FOREIGN_KEY_CHECKS=0`);
	let sql1 =`delete from exams where id =?`;
	const rs1 = await db.query(sql1, [id]);
	await db.query(`SET FOREIGN_KEY_CHECKS=1`);
})
app.get("/auth/login/role/:id", async (req,res) => {
	let id = req.params.id;
	const sql1= "select * from users where googleID =?";
    const rs1 = await db.query(sql1, [id]);
    const users = JSON.parse(JSON.stringify(rs1[0]));
	res.send(users[0].user_role);
})
app.post("/login", async (req,res) => {
	let email = req.body.email;
	let pass = req.body.pass;
	const sql1= "select * from users where email =? and password=?";
    const rs1 = await db.query(sql1, [email,pass]);
    const users = JSON.parse(JSON.stringify(rs1[0]));
	if(users.length > 0){
		res.json("Successful")
	}else {
		res.json("Failed")
	}
})
db.connect((err,connection) => {   
    if(err)throw err;
    console.log("Connection to database is successful")
})
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listenting on port ${port}...`));
