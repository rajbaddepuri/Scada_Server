import React from 'react';
import { Table, Button, Alert } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import IP from "../Utiltys";

class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      users: [],
      response: {}
    }
  }

  componentDidMount() {
    const apiUrl = 'http://'+process.env.REACT_APP_IP+'/api/userdetail?userid=0';

    fetch(apiUrl)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            users: result
          });
          console.log(this.state.users)
        },
        (error) => {
          this.setState({ error });
        }
      )
  }

  deleteProduct(UserID) {
    const { users } = this.state;

    const apiUrl = 'http://'+process.env.REACT_APP_IP+'/api/userdetail?userid='+UserID;
  //   const formData = new FormData();
  //   formData.append('UserID', UserID);

  //   const requestOptions = {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify(data)
  // };
  
  fetch(apiUrl)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            response: result,
            users: this.state.users.filter(user => user.UserID !== UserID)
          });
        },
        (error) => {
          this.setState({ error });
        }
      )
  }

    convert = dateRange =>
  dateRange
    .split(" - ")
    .map(date => new Intl.DateTimeFormat("en-US").format(new Date(date)));

     

  render() {
    const { error, users} = this.state;

    if(error) {
      return (
        <div>Error: {error.message}</div>
      )
    } else {
      return(
        <div className="page">

          
        <div className="section-body">
          
         
          <ul class="nav nav-tabs page-header-tab">
          {localStorage.getItem("Admin")?
          <li class="nav-item"><Link to="/addUser" class="nav-link inactive show">Add User</Link></li>
          :""
                  }
          <li class="nav-item"><Link to="/viewUser" class="nav-link active show" >View User</Link></li>
      </ul>
   
    
      </div>
        {/* <h2>User List</h2>*/} <Table> 
          <table className="table table-hover table-vcenter text-nowrap table_custom border-style list"> 
          <table className="table table-hover ">
                                    
            <thead style={{textAlign:"-webkit-center", backgroundColor:"#252d42"}}>
              <tr >
                <th style={{textTransform:"none", color:"#E5E5E5"}}>Employee Code</th>
                <th style={{textTransform:"none", color:"#E5E5E5"}}>First Name</th>
                <th style={{textTransform:"none", color:"#E5E5E5"}}>Last Name</th>
                <th style={{textTransform:"none", color:"#E5E5E5"}}>Phone Number</th>
                <th style={{textTransform:"none", color:"#E5E5E5"}}>Email ID</th>
                {/* <th style={{textTransform:"none", color:"#E5E5E5"}}>DOB</th> */}
                <th style={{textTransform:"none", color:"#E5E5E5"}}>Gender</th>
                <th style={{textTransform:"none", color:"#E5E5E5"}}>Department</th>
                {/* <th style={{textTransform:"none", color:"#E5E5E5"}}>Action</th>
                  <th style={{textTransform:"none", color:"#E5E5E5"}}>Delete</th>  */}
                 {localStorage.getItem("Admin")?
                <th style={{textTransform:"none", color:"#E5E5E5"}}>Action</th>                
                  :""                            
                }                              
                                            
                                        
              </tr>
            </thead>
            <tbody>
              {this.state.users.map(data => (
                <tr key={data.UserID}>
                  <td>{data.EmpCode}</td>
                  <td style={{color:"black"}}>{data.FirstName}</td>
                  <td style={{color:"black"}}>{data.LastName}</td>
                  <td style={{color:"black"}}>{data.Mobile}</td>
                  <td style={{color:"black"}}>{data.EmailID}</td>
                  {/* <td style={{color:"black"}}>{this.convert(data.DOB)}</td> */}
                  <td style={{color:"black"}}>{data.Gender}</td>
                  <td style={{color:"black"}}>{data.Department}</td>
                  
                
                  {localStorage.getItem("Admin")?
                  <td>
                    <Button variant="info" onClick={() => this.props.editProduct(data.UserID)}>Edit</Button>
                      </td>
                       :""
                   }
                </tr>
              ))}
            </tbody>
            </table>
            </table>
          </Table>
        </div>
      )
    }
  }
}

export default UserList;