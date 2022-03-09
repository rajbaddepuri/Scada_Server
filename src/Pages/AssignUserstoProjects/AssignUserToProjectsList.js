import React from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Table, Button, Alert } from 'react-bootstrap';
import IP from "../Utiltys";






 class AssignUserToProjectsList extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          message: 'Hello!',
          data:[],
        
        };
      // This line is important!
      this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount(){
        axios.get('http://'+IP+'/ScadaClient/api/UsersMapToProjects').
        then((res)=>{
           
            this.setState({
                data:res.data
            })

                console.log(this.state.data)
        
        });
    }
  
    handleClick = e => {
        console.log(e)
   // return  <Redirect  to="/EditUser/" />
    }
  
    render() {
      // Because `this.handleClick` is bound, we can use it as an event handler.
      return (
       <div className='page'>
         
         <div className="section-body">
          
         
          <ul class="nav nav-tabs page-header-tab">
          {localStorage.getItem("Admin")?
              <li class="nav-item"><Link to="/AssignUserstoProject" class="nav-link inactive show">Assign User To Project</Link></li>
              :""
                  }
              <li class="nav-item"><Link to="/AssignUserToProjectsList" class="nav-link active show" >Assign Users To Projects List</Link></li>
          </ul>
     
      
        </div>
        {/* <div className='center'>
          <h2>Map Users To Projects List</h2>
          </div> */}
          
            <Table>
            <table className="table table-hover table-vcenter text-nowrap table_custom border-style list"> 
            <table className="table table-hover">
                                      
              <thead  style={{textAlign:"-webkit-center", backgroundColor:"#252d42"}}>
              <th style={{textTransform:"none", color:"#E5E5E5"}}>User </th>
                <th style={{textTransform:"none", color:"#E5E5E5"}}>Project Name</th>
                <th style={{textTransform:"none", color:"#E5E5E5"}}>Role</th>
                <th style={{textTransform:"none", color:"#E5E5E5"}}>Active Status</th>
                {localStorage.getItem("Admin")?
                <th style={{textTransform:"none", color:"#E5E5E5"}}>Action</th>
                :""
              }
              </thead>
           
  
     <tbody>
              {this.state.data.map(user => (
                <tr>
                 <td style={{textAlign:"-webkit-center",color:"black"}}>{user.UserFullName}</td>
                <td style={{textAlign:"-webkit-center",color:"black"}}>{user.ProjectName}</td>
                <td style={{textAlign:"-webkit-center",color:"black"}}>{user.RoleName}</td>
                <td style={{textAlign:"-webkit-center",color:"black"}}>{user.ActiveStatus.toString()}</td>    
                {localStorage.getItem("Admin")?
                <td style={{textAlign:"-webkit-center"}}> <Link to={{pathname:'./EditAssignUsersToProjects',state:user}}> <Button  variant="info" onClick={() => this.handleClick(user)}>
                 Edit
                </Button></Link></td>
                :""
              }
                </tr>
              ))}
            </tbody>
     
     
     </table>
     </table>
     
     </Table>
    
     
        </div>
      );
    }
  }
  export default AssignUserToProjectsList;
