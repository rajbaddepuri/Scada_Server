import React, { Component } from 'react';
//import './App.css';
import { Container, Button, Alert } from 'react-bootstrap';
import UserList from './UserList';
import EditUser from './UserForm';
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
    let apiUrl;

    console.log(data)

 // apiUrl = 'http://'+IP+'/ScadaClient/api/userdetails';
 // working now --> http://'+IP+'/ScadaClient/api/EditUser?UserID=61&FirstName=Anju&LastName=B&EmpCode=U194&Gender=F&Department=IT&Mobile=4541&AlternatePhone=1234&EmailID=raj@test.com&Address=hubsiguda&RoleiD=2&ActiveStatus=true

  apiUrl = 'http://'+IP+'/ScadaClient/api/EditUser?UserID='+data.UserID+'&FirstName='+data.FirstName+'&LastName='+data.LastName+'&EmpCode='+data.EmpCode+'&Gender='+data.Gender+'&DOB='+data.DOB+'&Department='+data.Department+'&ReportingManager='+data.ReportingManager+'&ReportingManagerID='+data.ReportingManagerID+'&Mobile='+data.Mobile+'&AlternatePhone='+data.AlternatePhone+'&EmailID='+data.EmailID+'&Address='+data.Address+'&DateofJoining='+data.DateofJoining+'&DateofRelieving='+moment(data.DateofRelieving).format('MM/DD/YYYY')+'&RoleiD='+data.RoleID+'&ActiveStatus='+data.ActiveStatus;
    console.log(apiUrl)
  //      apiUrl = 'http://'+IP+'/ScadaClient/api/UpdateUserDetails';
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
        })
      },
      (error) => {
        console.log(error)
        this.setState({ error });
      }
      
    )
   //this.props.history.push('/ViewUser')
   //window.location.reload();
  }

  editProduct = UserID => {
    console.log(UserID)

    const apiUrl = 'http://'+IP+'/ScadaClient/api/userdetail?userid='+UserID;
  //   const formData = new FormData();
  //   formData.append('UserID', UserID);
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
      userForm = <EditUser onFormSubmit={this.onFormSubmit} user={this.state.user} />
    }

    return (
      <div className="App">

          {!this.state.isAddProduct && <UserList editProduct={this.editProduct}/>} 
          { userForm }
          {this.state.error && <div>Error: {this.state.error.message}</div>}        
       
      </div>
    );
  }
}

export default App;