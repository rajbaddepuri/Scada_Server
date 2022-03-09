import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import axios from "axios" ;
import IP from "./Utiltys";


class adminDashboard extends React.Component{

    constructor(props){
        super(props);
        this.state={
          usersCount: 0,
          projectsCount:0,
          assignedUsersCount:0
        }
      }


    componentDidMount(){

        // Fectch Users--------------------
   const fetchUsersApi = 'http://'+IP+'/api/userdetail?userid=0';

    fetch(fetchUsersApi)
      .then(res => res.json())
      .then(
        (result) => {
            console.log("Length of Users :" + result.length)
          this.setState({
            usersCount: result.length
          });
        },
        (error) => {
       
        }
      )

     //Fetch Projects -------------------------------------
     const fetchProjectsApi = 'http://'+IP+'/api/projectdetail?projectid=0';

     fetch(fetchProjectsApi)
       .then(res => res.json())
       .then(
         (result) => {
             console.log("Length of Projects :" + result.length)
           this.setState({
            projectsCount: result.length
           });
         },
         (error) => {
        
         }
       )


        //Fetch Projects -------------------------------------
     const fetchAssignedUsersApi = 'http://'+IP+'/api/UsersMapToProject?UserMapID=0';

     fetch(fetchAssignedUsersApi)
       .then(res => res.json())
       .then(
         (result) => {
             console.log("Length of Assigned Projects :" + result.length)
           this.setState({
            assignedUsersCount: result.length
           });
         },
         (error) => {
        
         }
       )

       //http://'+IP+'/ScadaClient/api/UsersMapToProject?UserMapID=0




    }




    render(){
        return(
         
            <body className="font-montserrat"> 
           <div>
            {/* <div className ="page-loader-wrapper">
                <div className="loader">
                </div>
            </div> */}
            
            <div id="main_content">
              
               
            
                <div className="page">
                 
                  <div className="section-body mt-3">
                        <div className="container-fluid">

                            <div className="row clearfix">
                                <div className="col-lg-12">
                                    <div className="mb-4">
                                        <h4>Welcome to Admin Dashboard</h4>
                                       
                                    </div>                        
                                </div>
                            </div>

                            <div className="row clearfix row-deck">
                             
                               <div className="col-xl-4 col-lg-5 col-md-6">
                                    <div className="card">
                                        <div className="card-header">
                                            <h3 className="card-title">No of Users</h3>
                                        </div>
                                        <div className="card-body">
                                            <h5 >Total Users - {this.state.usersCount}</h5>
                                            {localStorage.getItem("Admin")?
                                            <span className="font-12"><Link to='/AddUser'>Add User </Link></span>
                                            :""
                  }
                                            <br/>
                                            <span className="font-12"><Link to='/viewUser'> Users List</Link></span><br/><br/>
                                            
                                        </div>
                                    </div>
                                </div>

                                <div className="col-xl-4 col-lg-5 col-md-6">
                                    <div className="card">
                                        <div className="card-header">
                                            <h3 className="card-title">No of Projects</h3>
                                        </div>
                                        <div className="card-body">
                                            <h5 >Total No. of Projects - {this.state.projectsCount}</h5>
                                            {localStorage.getItem("Admin")?
                                            <span className="font-12"><Link to='/AddProject'>Add Project </Link></span>
                                            :""
                                          }
                                            <br/>
                                           
                                            <span className="font-12"><Link to='/viewProject'>Projects List </Link></span>
                                           
                                            <br/>
                                              </div>
                                    </div>
                                </div>
                                
                                <div className="col-xl-4 col-lg-5 col-md-6">
                                    <div className="card">
                                        <div className="card-header">
                                            <h3 className="card-title">No of Users AssignTo Projects</h3>
                                        </div>
                                        <div className="card-body">
                                            <h5 >Total No. of Users Assign To Projects- {this.state.assignedUsersCount}</h5>
                                            {localStorage.getItem("Admin")?
                                            <span className="font-12"><Link to='/Map'>Assign User To Project </Link></span>
                                            :""
                                          }
                                            <br/>
                                           
                                            <span className="font-12"><Link to='/UserList'>Users Assign To Projects List </Link></span><br/>
                                              </div>
                                    </div>
                                </div>
                           
                          
                    
                </div>    
            </div>
            
          </div> </div>
           </div>
           </div>
       </body>
        );
    }
}
export default adminDashboard;