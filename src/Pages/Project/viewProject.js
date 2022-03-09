import React, { Component } from 'react';
//import './App.css';
import { Container, Button, Alert } from 'react-bootstrap';
import ProjectList from './ProjectList';
import EditProject from './ProjectForm';
import {Link} from 'react-router-dom';
import * as moment from 'moment';
import IP from "../Utiltys";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAddProduct: false,
      error: null,
      response: {},
      user: {},
      isEditProduct: false
    }
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onCreate() {
    this.setState({ isAddProduct: true });
  }

  onFormSubmit(data) {
    console.log(data)
    console.log(data.ProjectID)
    console.log(data.StartDate.split("/")[1]+"/"+data.StartDate.split("/")[0]+"/"+data.StartDate.split("/")[2])
    var startdate = data.StartDate.split("/")[1]+"/"+data.StartDate.split("/")[0]+"/"+data.StartDate.split("/")[2]
    var enddate = data.EndDate.split("/")[1]+"/"+data.StartDate.split("/")[0]+"/"+data.StartDate.split("/")[2]
   
  
    console.log(startdate)
    console.log(enddate)
    let apiUrl; 

    // workingo nw --> http://'+IP+'/ScadaClient/api/EditProjectDetails?ProjectID=32&ProjectName=Firebase%20aaaa&ProjectCode=F-125&ProjectDesc=Mobile%20App&StartDate=09/26/2021&EndDate=10/10/2021&ProjectValue=0&Location=hyd&ActiveStatus=true&ProjectManagerID=&ProjectManager=LRajeshSir&Customer=ChennaiSCADA&Consultant=RajKumar
     apiUrl = 'http://'+IP+'/ScadaClient/api/EditProjectDetails?ProjectID='+data.ProjectID+'&ProjectName='+data.ProjectName+'&ProjectCode='+data.ProjectCode+'&ProjectDesc='+data.ProjectDesc+'&StartDate='+startdate+'&EndDate='+enddate+'&ProjectValue='+data.ProjectValue+'&Location='+data.Location+'&ActiveStatus='+data.ActiveStatus+'&ProjectManagerID='+data.ProjectID+'&ProjectManager='+data.ProjectManager+'&Customer='+data.Customer+'&Consultant='+data.Consultant
      console.log(apiUrl)
  //     apiUrl = 'http://'+IP+'/ScadaClient/api/UpdateProjectDetails';    
  //     console.log(data)
  //   const requestOptions = {      
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify(data)
  // };
  
  fetch(apiUrl)
      
      .then(result => {
        console.log(result)
        this.setState({
          
          response: result,
          
          isAddProduct: false,
          isEditProduct: false
        },()=>{
          console.log(this.state.response)
        })
      },
      (error) => {
        alert(error)
        this.setState({ error });
      }
    )
    this.props.history.push('/viewProject')
 window.location.reload();
  }

  editProduct = ProjectID => {
    //console.log(ProjectID)
   
    const apiUrl = 'http://'+IP+'/ScadaClient/api/projectdetail?projectid='+ProjectID;
  //   const formData = new FormData();
  //   formData.append('ProjectID', ProjectID);
  //   const myHeaders = new Headers();
  //   myHeaders.append('Content-Type', 'application/json');

  //   const requestOptions = {
  //     method: 'GET',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: formData
  // };
  fetch(apiUrl)
      .then(res => res.json())
      .then(
        (result) => {
          //console.log(result)
          this.setState({
            user: result,
           isEditProduct: true,
           isAddProduct: true
          });
          console.log(this.state.user)
        },
        (error) => {
          this.setState({ error });
        }
      )
  }

  render() {

    let userForm;
    if(this.state.isAddProduct || this.state.isEditProduct) {
      userForm = <EditProject onFormSubmit={this.onFormSubmit} user={this.state.user} />
    }

    return (
      <div >
        
           {/* <Button variant="primary" onClick={() => this.onCreate()}>Add User</Button> */}          
          {!this.state.isAddProduct && <ProjectList editProduct={this.editProduct}/>} 
          { userForm }
          {this.state.error && <div>Error: {this.state.error.message}</div>}        
    
      </div>
    );
  }
}

export default App;