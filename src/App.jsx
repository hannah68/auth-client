import './App.css';
import { useState } from 'react'

export default function App() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginUsername, setLoginUsername] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [newUsers, setNewUsers] = useState([]);
    const [userToken, setUserToken] = useState('');
    const [errorMessage, setErrorMessage] = useState('')

    // post user info in register route=============================
    const postUserInfo = async () => {
        const res = await fetch("http://localhost:4000/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password})
        })
        const userData = await res.json();
        setNewUsers([...newUsers, userData]);
    }

    // post user login info===========================
    const postUserLoginInfo = async () => {
        try{
            const res = await fetch("http://localhost:4000/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ loginUsername, loginPassword})
            });
            const token = await res.json();
            setUserToken(token);
            localStorage.setItem('user', token);
            
        }
        catch(err){
            setErrorMessage('Invalid Input, try again!')
        }
    }
    
    // submit form handler=============================
    const submitFormHandler = (e) => {
        e.preventDefault();
        postUserInfo();
    }

    // submit login form ==============================
    const submitLoginFormHandler = (e) => {
        e.preventDefault();
        postUserLoginInfo();
    }

    return (
        <div className="App">
            <h2>This is a register form</h2>
            <form onSubmit={submitFormHandler}>
                <div>
                    <input 
                        type="text" 
                        placeholder="Enter your username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <input 
                        type="password" 
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type='submit'>Submit</button>
            </form>
            <h2>This is a new list of users</h2>
            <ul>
                {newUsers.map((user, index) => {
                    return <li key={index}>{user.username}</li>
                })}
            </ul>

            <br/>
            <h2>This is a login form</h2>
            <form onSubmit={submitLoginFormHandler}>
                <div>
                    <input 
                        type="text" 
                        placeholder="Enter your username"
                        value={loginUsername}
                        onChange={(e) => setLoginUsername(e.target.value)}
                    />
                </div>
                <div>
                    <input 
                        type="password" 
                        placeholder="Enter your password"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                    />
                </div>
                <button type='submit'>Submit</button>
            </form>
            <p>{userToken ? userToken : errorMessage}</p>

        </div>
    );
}
