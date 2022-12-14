import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import DisplayAll from './components/DisplayAll';
import MyMons from './components/MyMons';
import UserMons from './components/UserMons';
import UpdateProfile from './components/UpdateProfile';
import EditMon from './components/EditMon';
import TrainMon from './components/TrainMon';
import OneMon from './components/OneMon';
import CreateMon from './components/CreateMon';
import Webmonsters from './components/Webmonsters';
import HowTo from './components/HowTo';

function App() {
  return (
    
    <BrowserRouter>
    <div className="App">
      <Routes>
    

        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route path="/intro" element={<Webmonsters />} />
        <Route path="/howto" element={<HowTo />} />

        <Route path="/home" element={<DisplayAll />} />

        <Route path="/mymonsters/:username" element={<MyMons />} />
        <Route path="/usermonsters/:username" element={<UserMons />} />

        <Route path="/updateprofile/:id" element={<UpdateProfile />} />
        <Route path="/updatemonster/:id" element={<EditMon />} />

        <Route path="/trainmonster/:id" element={<TrainMon />} />
        <Route path="/onemonster/:id" element={<OneMon />} />

        <Route path="/create" element={<CreateMon />} />

      </Routes>
    </div>
  
  </BrowserRouter>
  );
}

export default App;
