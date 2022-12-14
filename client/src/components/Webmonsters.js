import React, {useEffect, useState} from 'react';
import {useParams, Link, useNavigate} from 'react-router-dom';
import axios from 'axios';

const Webmonsters = () => {
    const [user, setUser] = useState("");
    const navigate = useNavigate("");

    useEffect(() => {
        axios.get("http://localhost:8000/api/users/secure", {withCredentials: true})
            .then((res) => {
                console.log(res.data)
                setUser(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    const logout = (e) => {
        axios.post("http://localhost:8000/api/users/logout",{}, {withCredentials: true})
            .then((res) => {
                navigate("/")
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <div className='container'>
            <style>
            @import url('https://fonts.cdnfonts.com/css/minecraft-4');
        </style>
                <div class="navigation">
                    <nav>
                        <ul class="nav-type">
                            
                            <span hidden>
                                <li><Link to="/home" className="active" ><button>Home</button></Link></li>
                                <li><Link to={`/updateprofile/${user._id}` } className="active"><button>Profile</button></Link></li>
                            </span>

                            

                            <span hidden>
                                <li><Link to={`/mymonsters/${user.username}` } className="active"><button>MyMonsters</button></Link></li>
                                <div class="line"></div>
                                
                            </span>
                            <li><Link to="/create" className="active" ><button></button></Link></li>
                            

                            <li><Link to="/intro" className="active"><button>  Webmonsters</button></Link> </li>
                            <li><button onClick={logout} className="active" >Logout</button></li>

                        </ul>
                    </nav>
                </div>

            <div className='form-fields'>
                <h1>Webmonsters</h1>
                        <p>Webmonsters is a collecting game in which you compete with others to collect and train the most powerful 
                            webmonsters, "catch" and "battle" with your monsters to appear on the glocal leaderboard and show everyone
                            how cool you and your monsters are!
                        </p>
                       <Link to='/home'>  <button>Click here to begin!</button> </Link>
                        
            </div>
        </div>




    )
}

export default Webmonsters;