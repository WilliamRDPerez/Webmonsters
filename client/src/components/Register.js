import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';


const Register = (props) => {

    const [confirmReg, setConfirmReg] = useState("");
    const [errors, setErrors] = useState({});

    const [user, setUser] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });
    };

    const register = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/api/users/register", 
        user, 
        {
            withCredentials: true
        })
        .then((res) => {
            console.log(res.data);
            setUser({
                username: "",
                email: "",
                password: "", 
                confirmPassword: "",
            });
            setConfirmReg(
                "Thank you for registering, you can now log in!",
            );
            setErrors({});
        })
        .catch((err) => {
            console.log(err);
            setErrors(err.response.data.errors);
        })

    }
    
    return (
        <div className='container'>
            <br/>
            <style>
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
            <form onSubmit={register} id='msform'>
                
            <fieldset>
                <h2 className='titles' style={{marginTop: "0px"}}>Register</h2>
                <br/>
                {confirmReg ? <h4 style={{color: "green"}}> {confirmReg} </h4>: null}
                <br/>
                <div>
                    {errors.username ? (
                        <span style={{color: "red"}}>
                            {errors.username.message}
                        </span>
                    ) : null}
                    <input type="text" name="username" value={user.username}  placeholder='Username' onChange={(e) => handleChange(e)} />
                </div>

                <div>
                    {errors.email ? (
                        <span style={{color: "red"}}>
                            {errors.email.message}
                        </span>
                    ) : null}
                    <input type="email" name="email" value={user.email} placeholder='Email' onChange={(e) => handleChange(e)} />
                </div>

                <div>
                    {errors.password ? (
                        <span style={{color: "red"}}>
                            {errors.password.message}
                        </span>
                    ) : null}
                    <input type="password" name="password" value={user.password} placeholder='Password' onChange={(e) => handleChange(e)} />
                </div>

                <div>
                    {errors.confirmPassword ? (
                        <span style={{color: "red"}}>
                            {errors.confirmPassword.message}
                        </span>
                    ) : null}
                    <input type="password" name="confirmPassword" value={user.confirmPassword} placeholder='Confirm Password' onChange={(e) => handleChange(e)} />
                </div>

                <div className='center'>
                    <button style={{background:"black"}}>Register</button>
                </div>
                <br/>
                <h4>Already have an account? Click <Link to='/login'>here</Link> to log in</h4>
                

            </fieldset>
                
            </form>

        </div>
        )
}

export default Register;