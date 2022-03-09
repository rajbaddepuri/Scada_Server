import React,{Component} from 'react';
import {Link} from 'react-router-dom';


/* import {BrowserRouter as Router ,Route,Switch} from 'react-router-dom'; */




class Sidebar extends React.Component{
    
    constructor(props) {
    super(props);

        
    this.state = {
       data: ''
    }
    this.updateAdmin=this.updateAdmin.bind(this)
    this.updateProcessFlowModel=this.updateProcessFlowModel.bind(this)
    this.updateAddProject = this.updateAddProject.bind(this);
    this.UpdateViewProject = this.UpdateViewProject.bind(this);
    this.UpdateAddUser = this.UpdateAddUser.bind(this);
    this.UpdateViewUser = this.UpdateViewUser.bind(this);
    this.UpdateAddClient = this.UpdateAddClient.bind(this);

    this.UpdateViewClient = this.UpdateViewClient.bind(this);
    /* this.UpdateHelp = this.UpdateHelp.bind(this);
    this.UpdateContact = this.UpdateContact.bind(this); */
    this.UpdateProcessFlowModels = this.UpdateProcessFlowModels(this);
    this.UpdateMap=this.UpdateMap.bind(this);
    this.UpdateViewMap=this.UpdateViewMap.bind(this);
      this.UpdateXml=this.UpdateXml.bind(this);
    this.UpdateProfile=this.UpdateProfile.bind(this);
    this.UpdateProfile=this.UpdateProfile.bind(this);
    this.UpdateChangePassword = this.UpdateChangePassword.bind(this);
    this.UpdateReport=this.UpdateReport.bind(this); 
 };

     updateAdmin() {
         
    this.setState({data: 'Dashboard'})
    this.updateAdmin = this.updateAdmin.bind(this);
}

updateProcessFlowModel() {
         
    this.setState({data: 'Process Flow Models'})
    this.updateProcessFlowModel = this.updateProcessFlowModel.bind(this);
     window.location.assign('/processflow')
}

 updateAddProject() {
         
     this.setState({data: 'Add Project'})
     this.updateAddProject = this.updateAddProject.bind(this);
 }

 UpdateViewProject() {
    window.location.assign("ViewProject");
    this.setState({data: 'View Project'});
    this.UpdateViewProject = this.UpdateViewProject.bind(this);
   
   
    
}

UpdateAddUser()
{
    this.setState({data: 'Add User'});
    this.UpdateAddUser = this.UpdateAddUser.bind(this);
    
    
}


UpdateViewUser()
{
   
    
    
    
    window.location.assign("ViewUser");
   this.UpdateViewUser = this.UpdateViewUser.bind(this);
   this.setState({data: 'View User'});
  
}


UpdateAddClient()
{
    this.setState({data: 'Add Client'});
    this.UpdateAddClient = this.UpdateAddClient.bind(this);
    
}

UpdateViewClient()
{
    this.setState({data: 'View Client'});
    this.UpdateViewClient = this.UpdateViewClient.bind(this);
    
}

UpdateMap()
{
    this.setState({data: 'Assign Users to Project'});
    this.UpdateMap = this.UpdateMap.bind(this);
    
}
UpdateViewMap()
{
    this.setState({data: 'Assign Users to Project'});
    this.UpdateViewMap = this.UpdateViewMap.bind(this);
   window.location.assign("AssignUserToProjectsList");
  
}
 
UpdateChangePassword()
{
    this.setState({data: ' Change Password'});
    this.UpdateChangePassword = this.UpdateChangePassword.bind(this);
    
}
UpdateProfile()
{
    this.setState({data: ' My Profile'});
    this.UpdateProfile = this.UpdateProfile.bind(this);
    
}
UpdateXml()
{
    this.setState({data: ' Add Xml'});
    this.UpdateXml = this.UpdateXml.bind(this);
    
}
UpdateReport()
{
    this.setState({data: ' Reports'});
    this.UpdateReport = this.UpdateReport.bind(this);
    
}
UpdateProcessFlowModels()
{
    this.setState({data: ' ProcessFlowModels'});
    this.UpdateProcessFlowModels = this.UpdateProcessFlowModels.bind(this);
    
}
   
    render(){

        return(


    <body  >
        <div className="page">
                    <div id="page_top" className="section-body top_dark">
        
                        <div className="page-header">
                            <div className="left">
                            <Link className="icon menu_toggle mr-3"><i className="fa  fa-align-left"></i></Link>
                            {this.state.data} 
                            <h1 className="page-title"></h1>                        
                            </div>
                        <div className="right">
                            <div className="notification d-flex">
                                <div className="dropdown d-flex">
                                    <div className="nav-link icon d-none d-md-flex btn btn-default btn-icon ml-2" data-toggle="dropdown"> <i className="fa fa-user" style={{color:"white"}} > Loged in User : {localStorage.getItem("user")}</i>
                                    </div>
                                    
                                        <div className="dropdown-menu dropdown-menu-right dropdown-menu-arrow">
                                            <Link onClick = {this.UpdateProfile} to='/Profile' className="dropdown-item" ><i className="dropdown-icon fe fe-user"></i> My Profile</Link>
                                            <a href='/' className="dropdown-item" ><i className="dropdown-icon fe fe-log-out"></i> Sign out</a>
                                        </div>
                                </div>
                            </div>
                        </div>
                        </div>
                     </div>
        
        {/* ................................. */}
            
             <div id="header_top" className="header_top">
                <div className="sidebar-opposite-hide">
                
                    <div className="hleft">
                        <div className="dropdown">
                            < div className="icon menu_toggle mr-3">
                                <Link  onClick = {this.updateAdmin} to='/AdminDashboard' class="nav-link icon xs-hide"><i className="fa fa-tachometer"  data-toggle="tooltip" data-placement="right" title="Dashboard" ></i></Link >  
                                {localStorage.getItem("Admin")?
                                <Link  onClick = {this.UpdateAddUser} to='/AddUser'  class="nav-link icon xs-hide"><i className="fa fa-user"  data-toggle="tooltip" data-placement="right" title="Add User"></i></Link >
                                :""
                            }
                                <Link  onClick = {this.UpdateViewUser} href="ViewProject" class="nav-link icon app_file xs-hide"><i className="fa fa-eye"  data-toggle="tooltip" data-placement="right" title="Users List"></i></Link >
                                {localStorage.getItem("Admin")?
                                <Link  onClick = {this.updateAddProject} to='/AddProject' class="nav-link icon app_inbox xs-hide"><i className="fa fa-plus"  data-toggle="tooltip" data-placement="right" title="Add Project"></i></Link >
                                :""
                            }
                                <Link  onClick = {this.UpdateViewProject} href='ViewProject' class="nav-link icon xs-hide"><i className="fa fa-eye"  data-toggle="tooltip" data-placement="right" title="Projects List"></i></Link >
                                {localStorage.getItem("Admin")?
                                <Link  onClick = {this.UpdateMap} to='/AssignUserstoProject' class="nav-link icon app_file xs-hide"><i className="fa fa-eye"  data-toggle="tooltip" data-placement="right" title="Assign Users to Project"></i></Link >
                                :""
                            }
                                <Link onClick = {this.UpdateViewMap} href='AssignUserToProjectsList' class="nav-link icon app_file xs-hide"><i className="fa fa-eye"  data-toggle="tooltip" data-placement="right" title="Assign Users to Projects List"></i></Link >
                                <Link  onClick = {this.UpdateChangePassword} to='/ChangePassword' class="nav-link icon app_file xs-hide"><i className="fa fa-key"  data-toggle="tooltip" data-placement="right" title="Change Password"></i></Link >
                                <Link  onClick = {this.UpdateXml} to='/AddXml' class="nav-link icon app_file xs-hide"><i className="fa fa-key"  data-toggle="tooltip" data-placement="right" title="AddXml"></i></Link >
                                <Link  onClick = {this.UpdateReport} to='/Report_daily' class="nav-link icon app_file xs-hide"><i className="fa fa-key"  data-toggle="tooltip" data-placement="right" title="Reports"></i></Link >
                                <a href='/processflow' className="nav-link icon app_file xs-hide"><i className="fa fa-file-code-o" data-toggle="tooltip" data-placement="right" title="Processflowmodel"></i></a>


                            </div>
                        </div>
                    
                    </div>
                </div>            
 
                <div id="left-sidebar" className="sidebar-nav " >
                
                    <nav id="left-sidebar-nav" className="sidebar-nav" >
                    <div className="right">
                <Link className="icon menu_toggle mr-3 float-right" ><i  className="fa fa-window-close "></i></Link>
                 </div>
                        <img src="assets/images/ecillogo.JPG" style={{width:"160px"},{height:"170px"}} alt=""/>
                         <h5 class="brand-name"><a href="javascript:void(0)" class="menu_option float-right"><i  onclick="gridView()" class="icon-grid font-16" data-toggle="tooltip" data-placement="left" title="Grid & List Toggle"></i></a></h5>

                        <ul className="metismenu" >
                                                               
                            <li><Link onClick = {this.updateAdmin}  to="/AdminDashboard"><i className="fa fa-tachometer"></i><span>Dashboard</span></Link></li>
                            {localStorage.getItem("Admin")?
                            <li><Link to="/AddUser" onClick = {this.UpdateAddUser}><i className="fa fa-user-plus"></i><span>Add User</span></Link></li>
                            :""
                        }
                            <li><Link href="ViewUser"  onClick = {this.UpdateViewUser}><i className="fa fa-user"></i><span>List of Users </span></Link></li>
                            {localStorage.getItem("Admin")?
                            <li><Link onClick = {this.updateAddProject} to="/AddProject" ><i className="fa fa-plus"></i><span>Add Project</span></Link></li>
                            :""
                        }
                            <li><Link onClick = {this.UpdateViewProject} href="ViewProject" ><i className="fa fa-file"></i><span>List of Projects</span></Link></li>
                            {localStorage.getItem("Admin")?
                            <li><Link to="/AssignUserstoProject"  onClick = {this.UpdateMap}><i className="fa fa-user"></i><span>Assign Users to Project</span></Link> </li> 
                            :""
                        }
                            <li><Link href="AssignUserToProjectsList"  onClick = {this.UpdateViewMap}><i className="fa fa-user"></i><span>List of Users Assigned to Projects </span></Link></li>
                            <li><Link to="/ChangePassword"  onClick = {this.UpdateChangePassword}><i className="fa fa-key"></i><span>Change Password</span></Link></li>
                            <li><Link to="/AddXml"  onClick = {this.UpdateXml}><i className="fa fa-key"></i><span>Add Xml</span></Link></li>
                            <li><Link to="/Report_daily"  onClick = {this.UpdateReport}><i className="fa fa-key"></i><span>Report</span></Link></li>
                            <li><a href='/processflow' onclick={this.UpdateProcessFlow} ><i className="fa fa-file-code-o"></i><span>Project Flow Model</span></a></li>
           
                        </ul>
              
                    
                    </nav>        
                </div>
            </div>       
       
        
        
        
        </div>

       

    </body>
        )
    }
}
    export default Sidebar;