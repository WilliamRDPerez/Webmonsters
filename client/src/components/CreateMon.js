import axios from "axios";
import { useState , useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";

const CreatePet = () => {
    const [name, setName] = useState("");
    const [nature, setNature] = useState("");
    const [element, setElement] = useState("");

    const [health, setHealth] = useState("");
    const [strength, setStrength] = useState("");
    const [speed, setSpeed] = useState("");
    const [level, setLevel] = useState("");

    const [image, setImage] = useState([]);
    const [uploading, setUploading] = useState(false);

    const [user, setUser] = useState("");
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();


    const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:8000/api/mons", { name, nature, health, strength, speed, level, element, image }, {withCredentials: true})
        .then((response) => {
            console.log(response);
            navigate("/home");
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



    function randomNumberInRange(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    function generateLevel(){
        return(Math.ceil((strength + health + speed) / 3));
    }
    function randomNameInRange(){
        var names = ['Pico', 'Arnold', 'Teenie', 'Cash', 'Knight', 'Herald', 'Sif', 'Pooper', 'Steve', 'Howl', 'Oofus', 'Magna',
                    'Bluey', 'Moorgs', 'Asa', 'Dumpling General', 'Eyes Blue White Dragon', 'Aoi', 'Demon With Blue fur','Spike', 'Oro',
                    'Whitey', 'Hel', 'Fenrir', 'Moose','Fiaco', 'Widow', 'Pekke', 'Ani', 'oni', 'Fluffington']
        return names[Math.floor(Math.random() * names.length)];
    }
    function randomNatureInArray() {
        var natures = ['Intelligent', 'Timid', 'Caring', 'Aggressive', 'Crybaby', 'Calm', 'Happy', 'Confused', 'Mischevious', 'Tired']

        return natures[Math.floor(Math.random() * natures.length)];
    }
    function randomElement() {
        var elements = ['Normal','Water', 'Fire', 'Grass', 'Air', 'Earth','Fuel', 'Steam', 'Lava', 
                        'Metal', 'Gravity', 'Carbon', 'Rubber', 'Dragon']
        return  elements[Math.floor(Math.random() * elements.length)]
    }



    const handleClick = () => {
        setStrength(randomNumberInRange(1,1000));
        setHealth(randomNumberInRange(1,1000));
        setSpeed(randomNumberInRange(1,1000));
        setNature(randomNatureInArray());
        setName(randomNameInRange()); 
        setElement(randomElement());
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
                        <div class="ul3">
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
            </div>

            <form onSubmit={handleSubmit} className="form-fields">
                            <h3 className="titles" style={{color:"rgb(179, 147, 108)", marginTop: "30px"}}>"Catch a monster!</h3>
                < br />
                <img src={require('./images/cute monster.jpg')} className='images'></img>
                < br />
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                    type="text"
                    className="form-control"
                    onChange={handleClick}
                    value={name}
                    />
                    {errors.name ? <p style={{color:'red'}}>{errors.name.message}</p> : null}
                </div>

                <div className="form-group">
                    <label htmlFor="petType">Nature</label>
                    <input
                    type="text"
                    className="form-control"
                    onChange={handleClick}
                    value={nature}
                    />
                    {errors.nature ? <p style={{color:'red'}}>{errors.nature.message}</p> : null}
                </div>

                <div className="form-group">
                    <label htmlFor="petType">Element</label>
                    <input
                    type="text"
                    className="form-control"
                    onChange={handleClick}
                    value={element}
                    />
                    {errors.element ? <p style={{color:'red'}}>{errors.element.message}</p> : null}
                </div>

                <div className="form-group">
                    <label htmlFor="description">Strength </label>
                    <input
                    type="number"
                    className="form-control"
                    onChange={handleClick}
                    value={strength}
                    />
                    {errors.strength ? <p style={{color:'red'}}>{errors.strength.message}</p> : null}
                </div>

                <div className="form-group">
                    <label htmlFor="description">Health </label>
                    <input
                    type="number"
                    className="form-control"
                    onChange={handleClick}
                    value={health}
                    />
                    {errors.health ? <p style={{color:'red'}}>{errors.health.message}</p> : null}
                </div>

                <div className="form-group">
                    <label htmlFor="description">Speed </label>
                    <input
                    type="number"
                    className="form-control"
                    onChange={handleClick}
                    value={speed}
                    />
                    {errors.speed ? <p style={{color:'red'}}>{errors.speed.message}</p> : null}
                </div>

                <button type="button" onClick={handleClick}>Search For Monster</button>
                <button className="submit-input" type="submit" onClick={getLevel}>Catch</button>
            </form>
        </div>
            

    );
};

export default CreatePet;