import React,{Components} from 'react';
import './App.css';
import Login from './Pages/home';
import addProject from './Pages/Project/addProject';
import viewProject from './Pages/Project/viewProject';
import ProjectList from './Pages/Project/ProjectList';
import addUser from './Pages/User/addUser';
import viewUser from './Pages/User/viewUser';
import adminDashboard from './Pages/adminDashboard';
import Sidebar from './Components/Sidebar'; 
import ForgotPassword from './Pages/ForgotPassword';
import AssignUserstoProject from './Pages/AssignUserstoProjects/AssignUserstoProject';
import ChangePassword from './Pages/ChangePassword';
import AssignUserToProjectsList from './Pages/AssignUserstoProjects/AssignUserToProjectsList';
import EditAssignUsersToProjects from "./Pages/AssignUserstoProjects/EditAssignUsersToProjects";
import {BrowserRouter as Router ,Route, Switch} from 'react-router-dom';
import  { Redirect } from 'react-router-dom'
import Report from "./Pages/Report"
import Profile from './Pages/Profile';
import AddXml from "./Pages/addXml";
 import UNCCanvas   from "./Pages/Xml/UNCCanvas";
import example from './Pages/example';
import Report_daily from './Pages/Report_daily';
import Report_shift from './Pages/Report_shift';
import Scadapopup from './Pages/PopUp/popuptest';
// import viewMap from './Pages/MapUser/viewMap'
// import Model4 from './Pages/Model4';
// import Model2 from './Pages/Model2';
// import ProcessFlowModel from './Pages/ProcessFlowModel';
// import ProjectManagement from './Pages/ProjectManagement';
// import ClientManagement from './Pages/ClientManagement';
// import UserManagement from './Pages/UserManagement';
// import viewClient from './Pages/viewClient';
// import addClient from './Pages/addClient';

class App extends React.Component {
  

  
  render(){
     
    if(window.location.pathname ==="/")
    {
      
      return(
      
      <div>
        
    <Router>
      {
         localStorage.clear(),         
      <Route exact path="/" component={Login} />
    }
      </Router>
      </div>
      )
    }
    else if (window.location.pathname==="/ForgotPassword"){
      return(
        <div>
          <Router>
            <Route exact path="/ForgotPassword" component={ForgotPassword}/>
            <Route exact path="/" component={Login} />
            <Route exact path="/processflow" component={UNCCanvas}/>

          </Router>
        </div>
      )
      
    }
    else if(window.location.pathname==="/processflow")
    {
      return(
        <div>
        <Router>
          <Route exact path="/processflow" component={UNCCanvas}/>
        </Router>
      </div>
      )
    }
    else
    {
      return(
        
  <div>
    {
      
      localStorage.getItem("user")?
    <Router >
    <Sidebar/>
        <Switch>

        {/* <Route exact path="/ProcessFlowModel" component={ProcessFlowModel} />
        <Route exact path="/ProjectManagement" component={ProjectManagement}/>
        <Route exact path="/UserManagement" component={UserManagement}/>
        <Route exact path="/ClientManagement" component={ClientManagement}/> */}
      
        {localStorage.getItem("Admin")?
        <Route exact path="/addUser" component={addUser}/>
       
        :""
      }
      {localStorage.getItem("Admin")?
          <Route exact path="/addProject" component={addProject}/>
       
        :""
      }
      {localStorage.getItem("Admin")?
        <Route exact path="/AssignUserstoProject" component={AssignUserstoProject}/>
       
        :""
      }
       <Route exact path="/viewUser" component={viewUser}/>,
        <Route exact path="/adminDashboard" component={adminDashboard}/>
        <Route exact path="/viewProject" component={viewProject}/>
        <Route exact path="/ProjectList" component={ProjectList}/> 
        <Route exact path="/AddXml" component={AddXml}/>
        <Route exact path="/AssignUserToProjectsList" component={AssignUserToProjectsList }/> 
        <Route exact path="/EditAssignUsersToProjects" component={EditAssignUsersToProjects}/> 
        <Route exact path="/ChangePassword" component={ChangePassword}/>
        <Route exact path="/Download" component={Report}/>
        <Route exact path="/Profile" component={Profile}/>
        <Route exact path="/example" component={example}/>
        <Route exact path="/Report_shift" component={Report_shift}/>
        <Route exact path="/Report_daily" component={Report_daily}/>
        <Route exact path="/Popuptest" component={Scadapopup}/>
        {/* <Route exact path="/Model4" component={Model4}/>
        <Route exact path="/Model2" component={Model2}/> */}
      
        </Switch>
        
      </Router> 
      :
      
      window.location.assign("/") 
    
}

    </div>
 );
      }
}}

export default App;