import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams} from "react-router-dom";

const UpdateProfile = () => {

    const {id} = useParams();
    const [email, setEmail] = useState();
    const [username, setUsername] = useState();
    const [user, setUser] = useState();
    const [image, setImage] = useState([]);

    const [errors, setErrors] = useState({});
    const [userNotFound, setUserNotFound] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8000/api/users/${id}`)
            .then((response) => {
                console.log(response.data);
                setEmail(response.data.email);
                setUsername(response.data.username);
                setImage(response.data.image);
            })
            .catch((err) => {
                console.log(err.response);
                setUserNotFound(`User not found using that ID`);
            })
    }, [id]);

    const submitHandler = (e) => {
        e.preventDefault();

        axios.put(`http://localhost:8000/api/users/editUser/${id}`, { email, username, image })
            .then((response) => {
            console.log(response);
            navigate("/home")

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

    

    return (
    <div className="container" style={{background: "black"}}>
        <style>
            @import url('https://fonts.cdnfonts.com/css/minecraft-4');
        </style>
        <div className="row">     
            <div class="html-container">
                <div class="navigation">
                    <nav>
                        <div class="ul4">
                            <li><Link to="/intro" className="active"><button>  Webmonsters</button></Link> </li>

                            <li><Link to={`/home` } className="active"><button>Home</button></Link></li>
                            <li><Link to={`/updateprofile/${id}` } className="active"><button>Profile</button></Link></li>

                            <li><Link to="/create" className="active" ><button>"Catch"</button></Link></li>
                            <li><Link to={`/mymonsters/${username}` } className="active"><button>MyMonsters</button></Link></li>
                            <div class="line"></div>
                            <li><Link to={`/howto` } className="active"><button>How it works</button></Link></li>

                            <li><button onClick={logout} className="active" >Logout</button></li>

                        </div>
                    </nav>
                </div>
            </div>

        <form onSubmit={submitHandler} className="form-fields">
            {userNotFound ? (
            <h2>
                {userNotFound} <Link to="/">Click here to make new user</Link>
            </h2>
            ) : null}
        
            
            <h2 style={{fontFamily: "Minecraft, sans-serif"}}> Edit Profile</h2>
            <br />

            <img src={require('./images/profile picture.jpg')} className='images'></img>


            <div className="form-group">
                <label htmlFor="name">Username</label>
                <input
                    type="text"
                    id="name"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                {errors.username ? <p style={{color:'red'}}>{errors.username.message}</p> : null}
            </div>

            <div className="form-group">
                <label htmlFor="name">Email</label>
                <input
                    type="text"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email ? <p style={{color:'red'}}>{errors.email.message}</p> : null}
            </div>

            <button type="submit" className="btn btn-primary">Update</button>
        </form>
    </div>
    </div>
    );
};

export default UpdateProfile;