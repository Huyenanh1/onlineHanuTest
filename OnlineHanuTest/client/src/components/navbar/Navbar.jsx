import React, { useEffect, useState } from "react";
import './Navbar.css';
import logo from '../Assets/logo.jpg';
import { Link, json } from "react-router-dom";
import axios from "axios";



const NavBar = () => {
    const [menu,setMenu] = useState('home');
    const logout = () => {
		window.open(`http://localhost:5000/auth/logout`, "_self");
	};
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
        <div className="navbar">
            <div className="nav-logo">
                <img src={logo}></img>
                <p>Online practical system for HANU Test</p>
            </div>
            <ul className="nav-menu">
                <li onClick={() =>{setMenu('home')}}><Link style={{textDecoration: 'none', color: "black"}} to='/'>Home {menu === 'home'?<hr/>:<></>}</Link></li>
                {(user !== null) && 
                    <div className="nav-menu-sub">
                        <li onClick={() =>{setMenu('read')}}><Link style={{textDecoration: 'none', color: "black"}} to='/read'>Reading {menu === 'read'?<hr/>:<></>}</Link></li>
                        <li onClick={() =>{setMenu('listen')}}><Link style={{textDecoration: 'none', color: "black"}} to='/listen'>Listening {menu === 'listen'?<hr/>:<></>}</Link></li>
                        <li onClick={() =>{setMenu('write')}}><Link style={{textDecoration: 'none', color: "black"}} to='/write'>Writing {menu === 'write'?<hr/>:<></>}</Link></li>
                        <li onClick={() =>{setMenu('speak')}}><Link style={{textDecoration: 'none', color: "black"}} to='/speak'>Speaking {menu === 'speak'?<hr/>:<></>}</Link></li>
                    </div>
                }
    
            </ul>
            <div className="nav-login-signup">
                {(user === null) &&
                    <div>
                        <Link to='/login'><button className="login">Login</button></Link> 
                        <Link to= '/signup'><button className="signup" >Sign up</button></Link>
                    </div>   
                }
                
                {(user !== null) && 
                    <div className="login-user">
                        <div className="ava-user">
                            <img src={user.picture} alt="profile"/>
                            <p>{user.name}</p>
                        </div>
                        <button className="signup" onClick={logout} >Log out</button>
                    </div>
                    
                }
                
                
            </div>
            
        </div>
        
    )
}
export default NavBar