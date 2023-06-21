import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import FanSignUp from './Components/FanSignUp';
import FanPortal from './Components/FanPortal';
import FanSignIn from './Components/FanSignIn';
import FanHome from './Components/FanHome';
import Accommodation from './Components/Accomodation';
import Game from './Components/Game';
import EditFan from './Components/EditFan';
import Activity from './Components/Activity';
import Trip from './Components/Trip';
import AddTrip from './Components/AddTrip';
import AddActivity from './Components/AddActivity';
import AddAccommodation from './Components/AddAccomodation';
import EmpHome from './Components/EmpHome';
import ManageAccommodations from './Components/ManageAccommodations';
import EditAccommodation from './Components/EditAccommodation';
import EditTrip from './Components/EditTrip';
import AddBookingAgent from './Components/AddBookingAgent';
import AddTripManager from './Components/AddTripManager';
import EditBookingAgent from './Components/EditBookingAgent';
import EditTripManager from './Components/EditTripManager';
import EditActivity from './Components/EditActivity';
import ManageTrips from "./Components/ManageTrips";
import ViewGames from "./Components/viewGames";
import FansAnalytics from "./Components/FansAnalytics";
import ManageFans from "./Components/ManageFans";
import Admin from "./Components/Admin";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path = "/" element = {<Home />} />
        <Route path = "/fanPortal" element = { <FanPortal /> } />
        <Route path = "/fanSignUp" element = { <FanSignUp /> } />
        <Route path = "/editFan" element = { <EditFan /> } />
        <Route path = "/fanSignIn" element = { <FanSignIn /> } />
        <Route path = "/fan/:fanId" element = { <FanHome /> } />
        <Route path = "/accommodation" element = { <Accommodation /> } />
        <Route path = "/fan/:fanId/game/:gameId" element = { <Game /> } />
        <Route path = "/activity" element = { <Activity /> } />
        <Route path = "/trip" element = { <Trip /> } />
        <Route path = "/addTrip" element = { <AddTrip /> } />
        <Route path  ="/addActivity" element = { <AddActivity /> } />
        <Route path = "/editActivity" element = { <EditActivity/> } />
        <Route path = "/addAccommodation" element = { <AddAccommodation /> } />
        <Route path = "/empHome" element = { <EmpHome /> } />
        <Route path = "/manageAccommodations" element = { <ManageAccommodations /> } />
        <Route path = "/editAccommodation" element = { <EditAccommodation /> } />
        <Route path = "/editTrip" element = { <EditTrip /> } />
        <Route path = "/addBookingAgent" element = { <AddBookingAgent /> } />
        <Route path = "/addTripManager" element = { <AddTripManager /> } />
        <Route path = "/editBookingAgent" element = { <EditBookingAgent /> } />
        <Route path = "/editTripManager" element = { <EditTripManager /> } />
        <Route path = "/manageTrips" element = { <ManageTrips /> } />
        <Route path = "/viewGames" element = { <ViewGames /> } />
        <Route path = "/fansAnalytics" element = { <FansAnalytics /> } />
        <Route path = "/manageFans" element = { <ManageFans /> } />
        <Route path = "/admin" element = { <Admin /> } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
