import React,{Components} from 'react';
import './App.css';
import Login from './Pages/home';
import ProcessFlowModel from './Pages/ProcessFlowModel';
import ProjectManagement from './Pages/ProjectManagement';
import ClientManagement from './Pages/ClientManagement';
import UserManagement from './Pages/UserManagement';
import addProject from './Pages/Project/addProject';
import viewProject from './Pages/Project/viewProject';
import addClient from './Pages/addClient';
import addUser from './Pages/User/addUser';
import viewUser from './Pages/User/viewUser';
import adminDashboard from './Pages/adminDashboard';
import viewClient from './Pages/viewClient';
import Sidebar from './Components/Sidebar'; 
import ForgotPassword from './Pages/ForgotPassword';
import Map from './Pages/MapUser/Map';
import viewMap from './Pages/MapUser/viewMap'
import ChangePassword from './Pages/ChangePassword';
import Model4 from './Pages/Model4';
import Model2 from './Pages/Model2';
import {BrowserRouter as Router ,Route, Switch} from 'react-router-dom';


class Login extends React.Component {
  

  
  render(){
     
    if(window.location.pathname ==="/")
    {
      
      return(
      
      <div>
        
      <Router>
                  
      <Route exact path="/" component={Login} />
      
      </Router>
      </div>
      )
    }
    else if (window.location.pathname==="/ForgotPassword"){
      return(
        <div>
          <Router>
            <Route exact path="/ForgotPassword" component={ForgotPassword}/>
          </Router>
        </div>
      )
      
    }
    else
    {
      return(
        
  <div>
     <Router >
     
    {/*    <Header/> */}
    <Sidebar/>
      
   
      return(
        
  
     
    
      
        <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/ProcessFlowModel" component={ProcessFlowModel} />
        <Route exact path="/ProjectManagement" component={ProjectManagement}/>
        <Route exact path="/UserManagement" component={UserManagement}/>
        <Route exact path="/ClientManagement" component={ClientManagement}/>
        <Route exact path="/addProject" component={addProject}/>
        <Route exact path="/addClient" component={addClient}/>
        <Route exact path="/addUser" component={addUser}/>
        <Route exact path="/viewUser" component={viewUser}/>
        <Route exact path="/viewClient" component={viewClient}/>
        <Route exact path="/adminDashboard" component={adminDashboard}/>
        <Route exact path="/viewProject" component={viewProject}/>
        <Route exact path="/Map" component={Map}/>
        <Route exact path="/viewMap" component={viewMap}/>
        <Route exact path="/ChangePassword" component={ChangePassword}/>
        <Route exact path="/Model4" component={Model4}/>
        <Route exact path="/Model2" component={Model2}/>
        </Switch>
         

    
     
      
      </Router> 
    </div>
 );
      }
}}

export default Login;