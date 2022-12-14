import React, {useEffect, useState} from 'react';
import {useParams, Link, useNavigate} from 'react-router-dom';
import axios from 'axios';

const HowTo = () => {
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
        <div className="row">     
            <div className="html-container">
                <div className="navigation">
                    <nav>
                        <ul class="nav-type">
                            <li><Link to="/intro" className="active"><button>  Webmonsters</button></Link> </li>
                            <li><Link to="/home" className="active" ><button>Home</button></Link></li>
                            <li><Link to={`/updateprofile/${user._id}` } className="active"><button>Profile</button></Link></li>
                            <li><Link to="/create" className="active" ><button>"Catch"</button></Link></li>
                            <li><Link to={`/mymonsters/${user.username}` } className="active"><button>MyMonsters</button></Link></li>
                            <li><Link to={`/howto` } className="active"><button>How it works</button></Link></li>

                            <div class="line"></div>
                            <li><button onClick={logout} className="active" >Logout</button></li>

                        </ul>
                    </nav>
                </div>
            </div>


        <div className='form-fields'>
            <h1>What are the stats </h1>
            <p>
                <p>Strength => monsters attack power dealing with health</p>
                <p>Health => monsters health when dealing attack power</p>
                <p>Speed => monsters speed when seeing who attacks first</p>
                < br />
                <p> Each "special " typing is bred from two other typings (water, fire, grass, wind, dragon), e.g. water + fire = steam, </p>
                <p> The nature of the monster dictates certain stat boosts e.g. tired => has an extra boost in health </p>
            </p>
            <Link to='/home'> Click here to begin! </Link>
        </div>

            </div>

    </div>       

    )
}

export default HowTo;