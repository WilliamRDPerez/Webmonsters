import { useEffect, useState } from "react";
import axios from "axios";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";

const DisplayAll = () => {
    const [allMons, setAllMons] = useState([]);
    const [user, setUser] = useState({})

    const navigate = useNavigate();
    const {username} = useParams();

    useEffect(() => {
    axios.get("http://localhost:8000/api/mons")
        .then((response) => {
        console.log(response.data);
        setAllMons(response.data);
        })
        .catch((err) => {
        console.log(err.response);
        });
    }, []);

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
    <div className="container">
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
            <h3 className="titles" style={{color:"brown"}}>Welcome {user.username}!</h3>

            <h3 className="titles" style={{color:"rgb(179, 147, 108)" , marginTop: "50px"}}>Leaderboard</h3>
            <div className="leaderboard">
                <table className="table" >
                    <thead style={{background:'rgb(179, 147, 108)'}}>
                        <tr>
                        <th className="ul6"></th>
                        <th className="ul6">Name</th>
                        <th className="ul6">Nature</th>
                        <td className="ul6" >Element</td>

                        <th className="ul6">Lvl</th>
                        <th className="ul6"> Trainer</th>
                        <th className="ul6"></th>


                        </tr>
                    </thead>

                    <tbody style={{background:'rgb(179, 147, 108)'}}>
                        {allMons.sort((level, level2) => {
                            if (level.level > level2.level) return -10;
                            if (level.level < level2.level) return 1;
                            return 0
                        }).map((mon, index) => {
                            return (
                                <tr key={mon._id}>
                                    <td className="ul6"> <img src={require('./images/cute monster.jpg')} className='images'></img></td>

                                    <td className="ul6"> 
                                        <Link  style={{color: "white", textDecoration: "none"} } to={`/onemonster/${mon._id}`}>{mon.name} </Link> 
                                    </td>

                                    <td className="ul6" >{mon.nature}</td>
                                    <td className="ul6" >{mon.element}</td>


                                    <td className="ul6">{mon.level}</td>

                                    <td className="ul6">
                                        <Link  style={{color: "white", textDecoration: "none", fontSize: "20px"}} to={`/usermonsters/${mon.createdBy.username}`}>
                                            {mon.createdBy.username}
                                        </Link>
                                    </td>
                                    <td className="ul6"> <img src={require('./images/profile picture.jpg')} className='images'></img></td>


                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
                
        </div>
    </div>
        



        
    );
};

export default DisplayAll;