import React, {useEffect, useState} from 'react';
import {useParams, Link, useNavigate} from 'react-router-dom';
import axios from 'axios';

const OneMon = () => {

    const {id} = useParams();
    const {username} = useParams();
    const[oneMon, setOneMon] = useState({});
    const navigate = useNavigate();
    const[user, setUser] = useState([]);


    useEffect(() => {
        axios.get(`http://localhost:8000/api/mons/${id}`)
        .then((res) => {
            console.log(res.data)
            setOneMon(res.data)
        })
        .catch((err) => console.log(err.res))
    }, [id])

    const deleteFilter = () => {
        axios.delete(`http://localhost:8000/api/mons/${id}`)
            .then((res) => {
                console.log(res.data)
                navigate("/home")
            })
            .catch((err) => console.log(err.res))
    }

    const logout = (e) => {
        axios.post("http://localhost:8000/api/users/logout",{}, {withCredentials: true})
            .then((res) => {
                navigate("/")
            })
            .catch((err) => {
                console.log(err)
            })
    }

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

    
    

    return (
        <div className='container'>
            <style>
                @import url('https://fonts.cdnfonts.com/css/minecraft-4');
            </style>
            <div className="row">     
                <div className="row">     
                    <div class="html-container">
                        <div class="navigation">
                            <nav>
                                <div class="ul5">
                                    <li><Link to="/intro" className="active"><button>  Webmonsters</button></Link> </li>
                                    <li><Link to="/home" className="active" ><button>Home</button></Link></li>
                                    <li><Link to={`/updateprofile/${user._id}` } className="active"><button>Profile</button></Link></li>
                                    <li><Link to="/create" className="active" ><button>"Catch"</button></Link></li>
                                    <li><Link to={`/mymonsters/${user.username}` } className="active"><button>MyMonsters</button></Link></li>
                                    <div class="line"></div>
                                    <li><Link to={`/howto` } className="active"><button>How it works</button></Link></li>

                                    <li><button onClick={logout} className="active" >Logout</button></li>

                                </div>
                            </nav>
                        </div>
                    </div>

                        <div className='card'>
                            <br /> 
                            <img src={require('./images/sif.jpg')} className='images2'></img>
                            <h1 className='titles' style={{marginTop: "20px"}}>Name: {oneMon.name}</h1>
                            <br />
                            <p className='card2'> <p >Nature:</p> {oneMon.nature}</p>
                            <p className='card2'><p >Strength:</p> {oneMon.strength}</p>
                            <p className='card2'><p >Health:</p> {oneMon.health}</p>
                            <p className='card2'><p >Speed:</p> {oneMon.speed}</p>
                            <p className='card2'><p >Level:</p> {oneMon.level}</p>
                            <br />
                        </div>
                </div>
            </div>
        </div>
        

    )
}

export default OneMon;