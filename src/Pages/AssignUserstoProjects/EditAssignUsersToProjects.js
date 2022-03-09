import React from 'react'
import { Form, Button, Container } from 'react-bootstrap';
import axios from "axios";
import { Hint } from "react-autocomplete-hint";
import { Link } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./styles1.css";
import * as moment from 'moment';
import Select from 'react-select';
import IP from "../Utiltys";


class EditAssignUsersToProjects extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      UserData: [],
      UsertoProjectData:[],
      Userselect:null,
      ProjectSelect:null,
      user: {},
      ProjectrData: [],
      UserFullName: "",
      ProjectName: "",
      ProjectID: [],
      Description: "",
      UserID: [],
      RoleID: [],
      ActiveStatus: false,
      InsertedDate: null,
      UserHintData: [],
      ProjectHintData: [],
      setHintData: [],
      setHintData1: [],
      ModifiedDate: null,
      AssignedFrom: null,
      AssignedTo: null,
      AssignedFrom: null,
      AssignedTo: null,
      RMID: "",
      RMID1: "",
      UserErr: "",
      ProjectnameErr: "",
      username1:{
      value:"",
      label:""},
      ProjectName1:{
        value:"",
        label:""},
      
    };

  }
 

  componentDidMount() {
    console.log(this.props.location.state)
  
    this.setState({
Userselect:this.props.location.state.UserFullName,
ProjectSelect:this.props.location.state.ProjectName,
user: this.props.location.state

    }, () => {
   
      var user = this.state.user;
      user.ActiveStatus = user.ActiveStatus.toString();
      this.setState({
        user
      }, () => {
       
        console.log(this.state.user.ActiveStatus)
      })
//const username1 = {value:"this.state.user.UserFullName", label:"this.state.user.UserFullName"}
      //const ProjectName1= {value:"this.state.user.ProjectName", label:"this.state.user.ProjectName"}
   
    this.setState({ProjectName1:{
      ...this.state.ProjectName1,
      value:this.state.user.ProjectName,
      label:this.state.user.ProjectName
      
  }});

    })
    

    this.getProjectData();
    this.getData();
    this. getUsersAssigntoProjectData();
  }




  getData = async () => {
    const res = await axios.get(
      "http://"+IP+"/ScadaClient/api/userdetail?userid=0"
    );
    //console.log(res);
    var hintArray = [];
    var hintId = [];

    res.data.map((a) => hintArray.push({ value: a.FirstName + " " + a.LastName, label: a.FirstName + " " + a.LastName }));
    res.data.map((a) => hintId.push(a.UserID));
    this.setState({ UserData: res.data })
    this.setState({ setHintData: hintArray });
    this.setState({ setHintId: hintId });
    console.log(this.state.setHintData)
  };
  getProjectData = async () => {
    const res = await axios.get(
      "http://"+IP+"/ScadaClient/api/ProjectDetails"
    );
    //console.log(res);
    var hintArray = [];
    var hintId = [];

    res.data.map((a) => hintArray.push({ value: a.ProjectName, label: a.ProjectName }));

    this.setState({ ProjectrData: res.data })
    this.setState({ setHintData1: hintArray });

    console.log(this.state.setHintData)
  };

  getUsersAssigntoProjectData = async () => {
    const res = await axios.get(
        "http://"+IP+"/ScadaClient/api/UsersMapToProjects"
    );

    
    this.setState({
        UsertoProjectData:res.data
    },()=>{
        console.log(this.state.UsertoProjectData )
    })
   

};

  handleChange1 = date => {
    console.log(date)
    console.log(date)
    this.setState({
      user: {
        ...this.state.user,
        AssignedFrom: date
      }
    });
  }

  handleChange2 = date => {
    console.log(date)
    console.log(date)
    this.setState({
      user: {
        ...this.state.user,
        AssignedTo: date
      }
    });
  }


  handleChange = event => {
    const name = event.target.name;
    const value = event.target.value;

    if (name == "ActiveStatus") {
      var user = { ...this.state.user }

      if (event.target.value === "true") {
        user.ActiveStatus = true;
      } else {
        user.ActiveStatus = false;
      }

      this.setState({
        user: user,
      }, () => {
        console.log(this.state.user.ActiveStatus);
      })

    }

    this.setState({
      user: {
        ...this.state.user,
        [name]: value
      }
    });

  }
  handleChange4(e) {
    console.log(e.label);
        this.state.UserData.map((user) => {
            var Users = user.FirstName + " " + user.LastName

            if (Users.toUpperCase() == e.label.toUpperCase()) {
                console.log(user.UserID)
                this.setState({
                    RMID: user.UserID
                },()=>{
                  console.log(this.state.RMID)
                })


            }

        })
        this.setState({
            user: {
                ...this.state.user,
                UserFullName: e.label
            }
        });

    
}
handleChange3(e) {


    this.state.ProjectrData.map((user) => {
        if (user.ProjectName.toUpperCase() == e.label.toUpperCase()) {
            console.log(user.ProjectID)
            this.setState({
                RMID1: user.ProjectID
            })


        }

    })

    this.setState({
        user: {
            ...this.state.user,
            ProjectName: e.label
        }
    });


}

  handleClick = event => {
    //  this.setState({ username: event.target.value });
  };
  onClick() {
    window.location.href = "AssignUserToProjectsList"
  }
  handleVAlidations() {


    let validUser = false;
    let validProject = false;
    let validUsertoProject=  false;

    //
    if(this.state.user.ProjectID == "" || this.state.user.UserID == ""){
      
      this.state.UsertoProjectData.map((p)=>{
        if(p.UserMapID == this.state.user.UserMapID){
          this.setState({
           
            user: {
              ...this.state.user,
              UserID: p.UserID,
              ProjectID: p.ProjectID
            }
            
          },()=>{
            console.log(this.state.user.ProjectID)
            console.log(this.state.user.UserID)
          })
        }
      })
    }

    //User Name Validations 
    if (this.state.user.UserFullName !== null) {
      this.state.UserData.map((user) => {
        // var Users = user.FirstName+" "+user.LastName
        var value = this.state.user.UserFullName

        var rm = user.FirstName + " " + user.LastName;

        console.log(rm)
        console.log(value)
        if (rm.toUpperCase() == value.toUpperCase()) {
          console.log("rm validation Success")
          validUser = true;
        }
        //
      });
    }
    if (this.state.user.ProjectName !== null) {
      this.state.ProjectrData.map((user) => {
        // var Users = user.FirstName+" "+user.LastName
        var value = this.state.user.ProjectName

        console.log(value)
        if (user.ProjectName.toUpperCase() == value.toUpperCase()) {
          console.log("rm validation Success")
          validProject = true;
        }
        //
      });
    }

    if (this.state.user.ProjectID !== null && this.state.user.UserID !== null ) {
     

           
      this.state.UsertoProjectData.map((temp) => {
          // var Users = user.FirstName+" "+user.LastName
          var value = this.state.user.ProjectID
          var value1 =this.state.user.UserID
          

          // if (temp.ProjectID == value && temp.UserID == value1 ) {
          //     console.log("rm validation Success")
          //     console.log(value)
          // console.log(value1)
          // console.log(temp.ProjectID )
          // console.log(temp.UserID)
          //     validUsertoProject = true;
          // }
          //
      });
  }


    ////console.log(formIsValid)
    return { validUser, validProject};

  }


  submitHandler = e => {
    e.preventDefault()
   
    console.log("hi",this.state.user)
  
    
    this.setState({
      
      user: {
        ...this.state.user,
        UserID: this.state.RMID == ""?this.state.user.UserID:this.state.RMID,
        ProjectID: this.state.RMID1 == ""?this.state.user.ProjectID:this.state.RMID1
      }
    }, () => {
      console.log('Before Converting ')
      console.log(this.state.user)
      var s = this.state.user
      console.log(s)

      var { validUser, validProject } = this.handleVAlidations();
      if (!validUser) {
        this.setState({

          UserErr: " * Not a Valid Username"
        }, () => {

        })

      }

      if (!validProject) {
        this.setState({

          ProjectnameErr: " * Not a Valid Project name"
        }, () => {

        })
      }

    //   if (validUsertoProject) {
    //     alert("Already User Assign to same Project")

    //  } 
   

      if (validUser && validProject) {

        const convertedstartdate = moment(s.InsertedDate).format('MM/DD/YYYY');
        s.InsertedDate = convertedstartdate.toString();
        const convertedDate = moment(s.ModifiedDate).format('MM/DD/YYYY');
        s.ModifiedDate = convertedDate.toString()
        this.setState({
          user: s
        }, () => {
          console.log('after Converting ')
          console.log(this.state.user)
        })

        
        let apiUrl;

        
       let AssignedFrom1 = moment(this.state.user.AssignedFrom).format('MM/DD/YYYY')
       let AssignTo1 = moment(this.state.user.AssignedTo).format('MM/DD/YYYY')
       
       
       
      
       
       //console.log(this.state.user.UserID)
        
   console.log(this.state.user)

        //  working now --> https://"+IP+":44348/api/EdiMapUsersToProjects?UserMapID=18&UserID=60&ProjectID=1&RoleID=2&Description=for%20test&AssignedFrom=10/26/2021&AssignedTo=11/29/2021&ActiveStatus=true
         apiUrl = 'http://'+IP+'/ScadaClient/api/EdiMapUsersToProjects?UserMapID='+this.state.user.UserMapID+'&UserID='+this.state.user.UserID+'&ProjectID='+this.state.user.ProjectID+'&RoleID='+this.state.user.RoleID+'&Description='+this.state.user.Description+'&AssignedFrom='+AssignedFrom1+'&AssignedTo='+AssignTo1+'&ActiveStatus='+this.state.user.ActiveStatus;
          console.log(apiUrl)
        // apiUrl = 'http://'+IP+'/ScadaClient/api/UpdateUsersMaptoProjects';


        // const requestOptions = {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify(this.state.user)
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
        this.props.history.push('/AssignUserToProjectsList')
      }
    })
  }
 
  render() {
    
    
    //this.state = this.props.location.state;
    // Because `this.handleClick` is bound, we can use it as an event handler.
    //console.log(new Date())
    //console.log(this.state.user.AssignedFrom)
    console.log(this.state.user.AssignedFrom)
    console.log(this.state.user.AssignedTo)
    this.state.user.AssignedFrom = new Date(this.state.user.AssignedFrom == undefined ? "1999-01-01T00:00:00" : this.state.user.AssignedFrom)
    const convertedAssignedFrom = moment(this.state.user.AssignedFrom).format('MM/DD/YYYY');

    var Assigndate = <DatePicker
      className="form-control"
      wrapperClassName="datepicker2"
      selected={convertedAssignedFrom == "01/01/1999" ? "" : this.state.user.AssignedFrom}
      onChange={this.handleChange1}
      dateFormat="MMMM d, yyyy"
      className="form-control"
      maxDate={new Date()}

    />
    console.log(this.props.location.state.UserFullName)
    var Userselect1 = this.props.location.state.UserFullName;
   var ProjectSelect1 = this.props.location.state.ProjectName;
    //console.log(this.state.user.AssignedTo)
    this.state.user.AssignedTo = new Date(this.state.user.AssignedTo == undefined ? "1999-01-01T00:00:00" : this.state.user.AssignedTo)
    const convertedAssignedTo = moment(this.state.user.AssignedTo).format('MM/DD/YYYY');

    var Assignto = <DatePicker
      className="form-control"
      wrapperClassName="datepicker2"
      selected={convertedAssignedTo == "01/01/1999" ? "" : this.state.user.AssignedTo}
      onChange={this.handleChange2}
      dateFormat="MMMM d, yyyy"
      className="form-control"
    

    />
  
    return (

      <body className="font-montserrat">
        <div className="page">

          <div className="section-body">

            {/*                     
                      <ul class="nav nav-tabs page-header-tab">
                        <li class="nav-item"><Link to="/Map" class="nav-link inactive show">Map User To Project</Link></li>

                        <li class="nav-item"><Link to="/UserLIst" class="nav-link active show" >View </Link></li>

                      </ul> */}

          </div>
          <br />

          <br />
          <Form onSubmit={this.submitHandler}>
          <div class="card-body" class="container" style={{ height: "500px", background: 'white', borderRadius: '10px' }}>


<div class="row clearfix" style={{ marginTop: "10px" }}>
    <div class="col-sm-12">


        <h4>Update Assign User to Project Details: </h4>
        <hr></hr>
    </div>
                <div class="col-sm-4 col-md-4">
                  <div class="form-group" style={{ width: "70%" }}>
                    <label class="form-label" style={{ color: "black" }}>User<span style={{ fontWeight: "", color: "red" }}>*</span>
                    </label>
                    <Select
                      options={this.state.setHintData}
                      onChange={this.handleChange4.bind(this)}
                      defaultValue={{value:Userselect1,
                                      label:Userselect1
                      }}
                      
                     
 

                    />
                    <span style={{ fontWeight: "", color: "red" }}>{this.state.UserErr}</span>

                  </div>
                </div>
                <div class="col-sm-4 col-md-4">
                  <div class="form-group" style={{ width: "70%" }} >
                    <label class="form-label" style={{ color: "black" }}>Project Name <span style={{ fontWeight: "", color: "red" }}>*</span></label>
                    <Select
                       defaultValue={{value:ProjectSelect1,
                        label:ProjectSelect1
        }}
                      options={this.state.setHintData1}
                      onChange={this.handleChange3.bind(this)}
                      

                    />
                   

                    <span style={{ fontWeight: "", color: "red" }}>{this.state.UserErr}</span>


                  </div>
                </div>

                <div class="col-sm-4 col-md-4">
                  <div class="form-group" >
                    <label class="form-label" style={{ color: "black" }}>Designation</label>
                    <select name="RoleID" className="form-control"
                      className="form-control" style={{ width: "70%" }} value={this.state.user.RoleID} onChange={this.handleChange}>
                      <option value="1">Team Member</option>
                      <option value="2">Team Lead</option>
                      <option value="3">Project Manager</option>
                      <option value="4">Delivery Head</option>
                      <option value="5">Director</option>
                    </select>
                  </div>
                </div>

                <div class="col-sm-4 col-md-4">
                  <div class="form-group" style={{}}>
                    <label class="form-label" style={{ color: "black" }}>Discription</label>
                    <input type="text" className="form-control" size="30" style={{ width: "70%" }}
                      className="form-control" name="Description" value={this.state.user.Description} onChange={this.handleChange} />

                  </div>
                </div>


                <div class="col-sm-4 col-md-4">
                  <div class="form-group"  style={{ width: "100%" }}>
                    <label class="form-label" style={{ color: "black" }}>Assign From</label>
                    {Assigndate}
                  </div>
                </div>
                <div class="col-sm-4 col-md-4">
                  <div class="form-group" style={{ width: "100%" }} >
                    <label class="form-label" style={{ color: "black" }}>Assign To</label>
                    {Assignto}

                  </div>
                </div>
                <div class="col-sm-4 col-md-4">
                  <div class="form-group" style={{}}>
                    <div >
                      <label class="form-label" style={{ color: "black" }}>Status</label>
                      <label>Active<input type="radio" name="ActiveStatus"
                        value={"true"}
                        checked={this.state.user.ActiveStatus === "true"} onChange={this.handleChange} style={{ marginLeft: "80px" }} /> </label>
                      <br />
                      <label>In Active<input type="radio" value={"false"}
                        checked={this.state.user.ActiveStatus === "false"} name="ActiveStatus" onChange={this.handleChange} style={{ marginLeft: "61px" }} /> </label>


                    </div>
                  </div>
                </div>
                <div className="center">

                  <button className="btn btn-primary" type="submit" style={{ textAlign: "center", width: "9%", marginRight: "50px", marginTop: "3px", background: "blue" }} onClick={this.onCreateProject}> Update</button>

                  <Link to="AssignUserToProjectsList"><button className="btn btn-primary" style={{ width: "8%", height: "44%", marginRight: "50px", background: "blue" }} onClick={this.onClick} >Back</button></Link>

                  <br />
                  <br />


                </div>

              </div>
            </div>

          </Form>


        </div>
      </body>
    );
  }
}
export default EditAssignUsersToProjects;
