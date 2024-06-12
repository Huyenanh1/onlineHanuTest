import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NavBar from "./components/navbar/Navbar";
import Read from './pages/Read/Read';
import Listen from "./pages/Listen";
import Quiz from "./pages/QuizRead/Quiz";
import Write from "./pages/Write";
import Speak from "./pages/Speak";
import "./App.css";
import QuizListen from "./pages/QuizListen/QuizListen";


function App() {
	const [user, setUser] = useState(null);

	const getUser = async () => {
		try {
			const url = `http://localhost:5000/auth/login/success`;
			const { data } = await axios.get(url, { withCredentials: true });
			setUser(data.user._json);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		getUser();
	}, []);

	return (
		<div className="container">
			<NavBar/>
			<Routes>
				<Route
					exact
					path="/"
					element={user ? <Home user={user} />  : <Navigate to="/login" />}
				/>

				<Route
					exact
					path="/login"
					element={user ? <Navigate to="/" /> : <Login />}
				/>
				<Route
					path="/signup"
					element={user ? <Navigate to="/" /> : <Signup />}
				/>
				<Route
					path="/read"
					element={user ? <Read/> : <Login />}
				/>
				<Route
					path="/listen"
					element={user ? <Listen/> : <Login />}
				/>
				<Route
					path="/write"
					element={user ? <Write/> : <Login />}
				/>
				<Route
					path="/speak"
					element={user ? <Speak/> : <Login />}
				/>
				<Route
					path="/details/:id"
					element={user ? <Quiz/> : <Login />}
				/>
				<Route
					path="/listen/:id"
					element={user ? <QuizListen/> : <Login />}
				/>
			</Routes>
			
		</div>
	);
}

export default App;
