import React, {useEffect, useState} from 'react';
import {useParams, Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import "../App.css"


const MyMons = () => {

    const {username} = useParams();
    const navigate = useNavigate();
    const[myMonList, setMyMonList] = useState([]);
    const [ user, setUser] = useState("");


    useEffect(() => {
        axios.get(`http://localhost:8000/api/monsbyuser/${username}`, {withCredentials: true})
            .then((res) => {
                console.log(res.data)
                setMyMonList(res.data);
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
            <div class="html-container">
                <div class="navigation">
                    <nav>
                        <div class="ul4">
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

            <h1 className='titles'> {username}'s Monsters</h1>
    
            <div className='leaderboard'>
                <table className="table">
                    <thead style={{background:'rgb(179, 147, 108)'}}>
                        <tr>
                        <th className="ul7"></th>

                        <th className="ul7">Name</th>
                        <th className="fighter">Nature</th>
                        <th className="fighter3">Element</th>

                        <th className="fighter1">Strength</th>
                        <th className="fighter2">Health</th>
                        <th className="fighter">Speed</th>
                        <th className="fighter4" style={{color: "white"}}>Level</th>
                        </tr>
                    </thead>

                    <tbody style={{background:'rgb(179, 147, 108)'}}>
                        {myMonList.sort((a, b) =>{
                            if (a.name > b.name) return 1;
                            if (a.name < b.name) return -10;
                            return 0
                        }).map((mon, index) => {
                            return (
                                <tr key={index}>
                                    <td className="ul7"> <img src={require('./images/sif.jpg')} className='images'></img></td>

                                    <td className="ul7"> <Link to={`/onemonster/${mon._id}`}  style={{color: "white", textDecoration: "none"}}>{mon.name}</Link> </td>
                                    <td className="fighter">{mon.nature}</td>
                                    <td className="fighter3">{mon.element}</td>

                                    <td  className="fighter1">{mon.strength}</td>
                                    <td  className="fighter2">{mon.health}</td>
                                    <td  className="fighter">{mon.speed}</td>
                                    <td  className="fighter4" style={{color: "white"}}>{mon.level}</td>

                                    
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            
        </div>
        </div>

    )
}

export default MyMons;