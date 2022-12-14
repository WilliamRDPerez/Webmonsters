import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams,useNavigate } from "react-router-dom";


const EditMon = (props) => {
    const { id } = useParams();
    const [name, setName] = useState("");
    const [nature, setNature] = useState("");
    const [health, setHealth] = useState("");
    const [strength, setStrength] = useState("");
    const [speed, setSpeed] = useState("");
    const [level, setLevel] = useState("");
    const [image, setImage] = useState([]);

    const[user, setUser] = useState("");
    const [errors, setErrors] = useState({});
    const [monNotFound, setMonNotFound] = useState("");
    const navigate = useNavigate();


    useEffect(() => {
        axios.get(`http://localhost:8000/api/mons/${id}`)
            .then((response) => {
        console.log(response.data);
        setName(response.data.name);
        setStrength(response.data.strength);
        setHealth(response.data.health);
        setSpeed(response.data.speed);
        setNature(response.data.nature);
        setLevel(response.data.level);
        })
        .catch((err) => {
            console.log(err.response);
            setMonNotFound(`Monster not found using that ID`);
        });
    }, [id]);

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



    const submitHandler = (e) => {
        e.preventDefault();

        axios.put(`http://localhost:8000/api/mons/${id}`, { name, strength, speed, health, nature, level })
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

    function randomNumberInRange(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    function generateLevel(){
        return(Math.ceil((strength + health + speed) / 3));
    }
    function randomNatureInArray() {
        var natures = ['Intelligent', 'Timid', 'Caring', 'Aggressive', 'Crybaby', 'Calm', 'Happy', 'Confused', 'Mischevious', 'Tired']
        return natures[Math.floor(Math.random() * natures.length)];
    }



    const handleStrength = () => {
        setStrength(randomNumberInRange(1,600));
    };
    const handleHealth = () => {
        setHealth(randomNumberInRange(1,600));
    };
    const handleSpeed = () => {
        setSpeed(randomNumberInRange(1,600));
    };
    const getLevel = () => {
        setLevel(generateLevel());
    }

    return (
    <div className="container">
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

    <form onSubmit={submitHandler} className="form-fields">

        {monNotFound ? (
        <h2>
            {monNotFound} <Link to="/new">Click here to create monster</Link>
        </h2>
        ) : null}
    
        <br />
        <h2 className="titles " style={{marginTop: "20px"}}> Reroll {name}'s stats</h2>
        <br />
        <img src={require('./images/cute monster.jpg')} className='images'></img>

        <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
            type="text"
            className="form-control"
            value={name}
            />
            {errors.name ? <p style={{color:'red'}}>{errors.name.message}</p> : null}
        </div>

        <div className="form-group">
            <label htmlFor="petType">Nature</label>
            <input
            type="text"
            className="form-control"
            value={nature}
            />
            {errors.nature ? <p style={{color:'red'}}>{errors.nature.message}</p> : null}
        </div>
        < br />

        <div className="form-group">
            <label htmlFor="description">Strength </label>
            <input
            type="number"
            className="form-control"
            onChange={handleStrength}
            value={strength}
            />
            {errors.strength ? <p style={{color:'red'}}>{errors.strength.message}</p> : null}
            <button type="button" className="fighter1" onClick={handleStrength}>Reroll Strength</button>
        </div>
        < br />


        <div className="form-group">
            <label htmlFor="description">Health </label>
            <input
            type="number"
            className="form-control"
            onChange={handleHealth}
            value={health}
            />
            {errors.health ? <p style={{color:'red'}}>{errors.health.message}</p> : null}
            <button type="button" className="fighter2" onClick={handleHealth}>Reroll Health</button>
        </div>
        < br />


        <div className="form-group">
            <label htmlFor="description">Speed </label>
            <input
            type="number"
            className="form-control"
            onChange={handleSpeed}
            value={speed}
            />
            {errors.speed ? <p style={{color:'red'}}>{errors.speed.message}</p> : null}
            <button type="button" className="fighter" onClick={handleSpeed}>Reroll Speed</button>
        </div>
        < br />


        <div className="form-group">
            <label htmlFor="description">Lv </label>
            <input
            type="number"
            className="form-control"
            onChange={getLevel}
            value={level}
            />
            {errors.level ? <p style={{color:'red'}}>{errors.level.message}</p> : null}
        </div>
            <br />

        <button type="submit" className="ul7" onClick={getLevel} style={{width: "150px"}}>Finish</button>
    </form>

    </div>
    </div>
    );
};

export default EditMon;