import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useNavigate, Link} from 'react-router-dom';

const Login = (props) => {

    const[email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const login = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/api/users/login", 
        {
            email: email,
            password: password,
        },
        {
            withCredentials: true,
        })
        .then((res) => {
            console.log(res, "res");
            console.log(res.data, "is res data!")
            navigate("/intro");
        })
        .catch((err) => {
            console.log(err.data);
            setErrorMessage(err.response.data.message);
        });
    };

    return(
        <div className='container'>
            <style  >
            @import url('https://fonts.cdnfonts.com/css/minecraft-4');
        </style>
                <div class="navigation">
                    <nav>
                        <div class="ul8">
                            
                            <span hidden>
                                <li><Link to="/home" className="active" ><button>Home</button></Link></li>
                                <li><Link to={`` } className="active"><button>Profile</button></Link></li>
                            </span>

                            

                            <span hidden>
                                <li><Link to={`/mymonsters` } className="active"><button>MyMonsters</button></Link></li>
                                <div class="line"></div>
                                
                            </span>
                            <li><Link to="/create" className="active" ><button></button></Link></li>
                            

                            <li><button className='active'>  Webmonsters</button> </li>

                        </div>
                    </nav>
                </div>
            <form onSubmit={login} id='msform'>
                <fieldset>
                    <h1 className='titles' style={{marginTop: "0px", color: "white"}}> Login</h1>
                    <p style={{color: "red"}}> {errorMessage ? errorMessage : ""} </p>
                    <br/>
                        <div>
                            <label>Email</label>
                            <input type="email" placeholder='email' name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>

                        <div>
                            <label>Password</label>
                            <input type="password" placeholder='password' name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>

                        <div className='center'>
                            <button style={{background:"black"}}>Sign In</button>
                        </div>
                        <br/>
                        <h4>Don't have an account? Click <Link to='/'>here</Link> to sign up</h4>
                </fieldset>
            </form>
        </div>
    )
}

export default Login;