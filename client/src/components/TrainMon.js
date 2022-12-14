import React, {useEffect, useState} from 'react';
import {useParams, Link, useNavigate} from 'react-router-dom';
import axios from 'axios';

const OneMon = () => {

    const {id} = useParams();

    const [name, setName] = useState("");
    const [nature, setNature] = useState("");
    const [element, setElement] = useState("");


    const [health, setHealth] = useState("");
    const [strength, setStrength] = useState("");
    const [speed, setSpeed] = useState("");   
    const [level, setLevel] = useState("");

    const navigate = useNavigate();
    const[user, setUser] = useState("");
    const [errors, setErrors] = useState({});

    const handleStrength = () => {
        if (strength > 0){
            setStrength(prevCount => prevCount + 1);
        } 
        if (strength > 500) {
            setStrength(prevCount => prevCount + 10);
        }
        if (strength > 1000) {
            setStrength(prevCount => prevCount + 100)
        }
    }
    const handleHealth = () => {
        if (health > 0){
            setHealth(prevCount => prevCount + 1);
        } 
        if (health > 500) {
            setHealth(prevCount => prevCount + 10);
        }
        if (health > 1000) {
            setHealth(prevCount => prevCount + 100)
        }
    }
    const handleSpeed = () => {
        if (speed > 0){
            setSpeed(prevCount => prevCount + 1);
        } 
        if (speed > 500) {
            setSpeed(prevCount => prevCount + 10);
        }
        if (speed > 1000) {
            setSpeed(prevCount => prevCount + 100)
        }
    }

    useEffect(() => {
        axios.get(`http://localhost:8000/api/mons/${id}`)
        .then((res) => {
            console.log(res.data)
            setName(res.data.name);
            setStrength(res.data.strength);
            setHealth(res.data.health);
            setSpeed(res.data.speed);
            setNature(res.data.nature);  
            setLevel(res.data.level); 
            setElement(res.data.element);      
        })
        .catch((err) => console.log(err.res))
    }, [id])

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

    const deleteFilter = () => {
        axios.delete(`http://localhost:8000/api/mons/${id}`)
            .then((res) => {
                console.log(res.data)
                navigate(`/mymonsters/${user.username}`)
            })
            .catch((err) => console.log(err.res))
    }

    const submitHandler = (e) => {
        e.preventDefault();

        axios.put(`http://localhost:8000/api/mons/${id}`, { name, strength, speed, health, nature, level, element })
            .then((response) => {
            console.log(response);
            navigate(`/mymonsters/${user.username}`)

        })
        .catch((err) => {
            console.log(err.response.data.err.errors);
            setErrors(err.response.data.err.errors);
        });
    };

    const logout = (e) => {
        axios.post("http://localhost:8000/api/users/logout",{}, {withCredentials: true})
            .then((res) => {
                navigate("/")
            })
            .catch((err) => {
                console.log(err)
            })
    }

    function generateLevel(){
        return(Math.ceil((strength + health + speed) / 3));
    }
    const getLevel = () => {
        setLevel(generateLevel());
    }

    return (
        <div className='container'>
            <style>
                @import url('https://fonts.cdnfonts.com/css/minecraft-4');
            </style>
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
            < form onSubmit={submitHandler} >
                <div className='card'>
                    <br />
                    <img src={require('./images/sif.jpg')} className='images2'></img>
                    <br /><br />

                    <h1 className='card2'>Name: {name}</h1>
                    <br />
                    <p className='card2'> <p >Nature:</p> {nature}</p>
                    <br />
                    <p className='card2'> <p >Element:</p> {element}</p>

                    <br />
                    <p className='card2'>
                        <p >Strength:</p> 
                        <p>{strength}</p>
                        <button onClick={handleStrength} type="button" className='fighter1'>Fight</button>
                    </p> 

                    <p className='card2'>
                        <p >Health:</p> 
                        <p>{health}</p>
                        <button onClick={handleHealth} type="button" className='fighter2'>Feed</button>

                    </p> 
                    <p className='card2'>
                        <p >Speed:</p> 
                        <p>{speed}</p>
                        <button onClick={handleSpeed} type="button" className='fighter'>Run</button>
                    </p> 
                    <p className='card2'><p >Lvl:</p> {level}</p>

                    <br />
                    <br />
                
                    <button type="submit" onClick={getLevel} className="fighter2" >Finish Training</button>
                    <button onClick={deleteFilter} className="fighter1">Release</button>

                </div>

            </form>


            </div>
        
        </div>

    )
}

export default OneMon;