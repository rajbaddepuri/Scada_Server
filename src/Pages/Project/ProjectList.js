import React from 'react';
import { Table, Button, Alert } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import "./styles.css";
import IP from "../Utiltys";

class ProjectList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      users: [],
      response: {}
    }
  }

  componentDidMount() {
    const apiUrl = 'http://'+IP+'/ScadaClient/api/ProjectDetails';

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

  deleteProduct(ProjectID) {
    const { users } = this.state;

    const apiUrl = 'http://'+IP+'/ScadaClient/api/projectdetail?projectid='+ProjectID;
  //   const formData = new FormData();
  //   formData.append('ProjectID', ProjectID);

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
            users: this.state.users.filter(user => user.ProjectID !== ProjectID)
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
            <li class="nav-item"><Link to="/AddProject" class="nav-link inactive show">Add Project</Link></li>
            :""
                  }
            <li class="nav-item"><Link to="/ViewProject" class="nav-link active show" >View Projects</Link></li>
        </ul>
   
    
      </div>
      {/* <div className='center'>
        <h2>Project Lists</h2>
        </div> */}
        
          <Table>
          <table className="table table-hover table-vcenter text-nowrap table_custom border-style list"> 
          <table className="table table-hover">
                                    
            <thead style={{textAlign:"-webkit-center", backgroundColor:"#252d42"}}>
              <tr >
                {/* <th style={{textTransform:"none", color:"#E5E5E5"}}>#ID</th> */}
                <th style={{textTransform:"none", color:"#E5E5E5"}}>Project Code</th>
                <th style={{textTransform:"none", color:"#E5E5E5"}}>Project Name</th>
                <th style={{textTransform:"none", color:"#E5E5E5"}}>Project Desc</th>
                {/* <th style={{textTransform:"none", color:"#E5E5E5"}}>Project Value</th> */}
                <th style={{textTransform:"none", color:"#E5E5E5"}}>Start Date</th>
                <th style={{textTransform:"none", color:"#E5E5E5"}}>End Date</th>
                {/* <th style={{textTransform:"none", color:"#E5E5E5"}}>Location</th> */}
                {localStorage.getItem("Admin")?
                <th style={{textTransform:"none", color:"#E5E5E5"}}>Action</th>
             
                                              
                 :""                            
                }                              
                                              
                                        
              </tr>
            </thead>
            <tbody>
              {this.state.users.map(data => (
                <tr key={data.ProjectID}>
                  {/* <td>{data.ProjectID}</td> */}
                  <td style={{textAlign:"-webkit-center",color:"black"}}>{data.ProjectCode}</td>
                  <td style={{textAlign:"-webkit-center",color:"black"}}>{data.ProjectName}</td>
                  <td style={{textAlign:"-webkit-center",color:"black"}}>{data.ProjectDesc}</td>
                  {/* <td style={{textAlign:"-webkit-center",color:"black"}}>{data.ProjectValue}</td> */}
                  <td style={{textAlign:"-webkit-center",color:"black"}}>{this.convert(data.StartDate)}</td>
                  <td style={{textAlign:"-webkit-center",color:"black"}}>{this.convert(data.EndDate)}</td>
                  {/* <td style={{color:"black"}}>{data.Location}</td> */}
                  {localStorage.getItem("Admin")?
                  <td>
                    <Button variant="info" onClick={() => this.props.editProduct(data.ProjectID)}>Edit</Button>
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

export default ProjectList;