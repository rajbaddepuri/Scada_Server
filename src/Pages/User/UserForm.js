import React from 'react';
import {Form, Button } from 'react-bootstrap';
import axios from "axios";
import { Hint } from "react-autocomplete-hint";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as moment from 'moment';
import IP from "../Utiltys";



import {Link} from 'react-router-dom';

class EditUser extends React.Component {
  constructor(props) {
    super(props);
    this.state={
        DateofJoining:null,
        DateofRelieving:null,
    }
    this.state = {
      UserID: '',
      HintData:[],
      FirstName:'',
      LastName:'',
      EmpCode:'',
      DOB:null,
      Department:'',
      ReportingManager:'',
      ReportingManagerID:'',
      Username:'',
      Password:'',
      DateofJoining:null,
      DateOfReliving:null,
      Mobile:'',
      AlternatePhone:'',
      Gender:'',
      Address:'',
      EmailID:'',
      ActiveStatus:'',
      RoleID:'',
      Userdata:[],
      Emperror: "",
      Reportingerror: "",
      Usererror: "",

    }

    if(props.user[0]){
      var temp = props.user[0]

      temp.ActiveStatus= temp.ActiveStatus == null? "true":temp.ActiveStatus.toString()
      this.state = temp
      console.log(this.state)

  }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  componentDidMount(){
    axios.get(
        "http://"+IP+"/ScadaClient/api/userdetail?userid=0"
      ).then((val)=>{
          var hintArray = [];

        //   val.data.map((a) => hintArray.push(a.FirstName+" "+a.LastName));

        //   this.setState({HintData:hintArray});

          //this.setState({UserData:val.data})
      })
}


  handleChange(event) {

    const name = event.target.name;
    const value = event.target.value;
    //  if(name  == "ReportingManager")
    //     {
    //         this.state.UserData.map((user)=>{
    //             var Users = user.FirstName+" "+user.LastName

    //             if( Users.toUpperCase() == value.toUpperCase())
    //             {
    //                 console.log(user.UserID)
    //                 this.setState({
    //                     ReportingManagerID:user.UserID
    //                 })


    //             }

    //           })

    //     }
        if(name == "Gender")
        {


          this.setState({
            Gender: event.target.value
          },()=>{
            console.log(this.state.Gender);
          })

        }

        if(name == "ActiveStatus")
        {

          console.log(event.target.value)
          this.setState({
            ActiveStatus: event.target.value == "false" ? 0 : 1
          },()=>{
            console.log(this.state.ActiveStatus);
            console.log(typeof(this.state.ActiveStatus))

          })

        }
    this.setState({
      [name]: value
    })
  }

  handleVAlidations(){

    //let validUser = true;
    let validRM = false;
    // let validEmp=true;
    // let boolPasswordError = true;
    // console.log(".....................")
    // console.log(this.state.ReportingManager)
    // console.log(this.state.UserName)
    // console.log(this.state.EmpCode)

    //Reporting Manager Validations
if(this.state.ReportingManager !== null)
{
    this.state.UserData.map((user)=>{
        // var Users = user.FirstName+" "+user.LastName
         var value =this.state.ReportingManager

     var rm = user.FirstName+" "+user.LastName ;

         console.log(rm)
         console.log(value)
        if(rm.toUpperCase() == value.toUpperCase())
        {
            console.log("rm validation Success")
            validRM = true;
        }
        //
      });
 }

 ////console.log(formIsValid)
 return {validRM};

  }


  handleSubmit(event) {
    event.preventDefault();
    //var {validRM} = this.handleVAlidations();
    console.log('Before Converting ')
    // console.log(this.state)
    // var s  = this.state
    // const convertedDOB = moment(s.DOB).format('MM/DD/YYYY');
    //         s.DOB = convertedDOB.toString();
    //         const convertedDate = moment(s.DateofJoining).format('MM/DD/YYYY');
    //         s.DateofJoining = convertedDate.toString()
    //         this.setState({
    //             s
    //         },()=>{
    //             console.log('after Converting ')
    //             console.log(this.state)
    //         })


    // if (!validRM) {
    //     this.setState({

    //         Reportingerror: " * Not Valid Reporting Manager"
    //     }, () => {

    //     })
    // }


    //   if(validRM)
    //     {
    console.log(this.state)
    this.props.onFormSubmit(this.state);
    this.setState(this.State);
  }
//}



  setGender(event) {
    console.log(event.target.value);

  }
  handleChange1 = DateofRelieving => {
    console.log('onchange called....')
  console.log(DateofRelieving)
  this.setState({
      DateofRelieving: DateofRelieving,

  });
  }

  handleChange2 = DateofJoining => {
      console.log('onchange called....')


    console.log(DateofJoining)
    this.setState({

        DateofJoining: DateofJoining

    });
    }

    handleChange3 = DOB => {
      console.log('onchange called....')
      //DOB = moment(DOB).format('MM/DD/YYYY')
    console.log(DOB)
    this.setState({
        DOB: DOB,
    });
    }

    onClick(){
        window.location.reload()
    }
  render() {

//  this.state.DateofRelieving = new Date(this.state.DateofRelieving)

//      const convertedDateofRelieving = moment(this.state.DateofRelieving).format('MM/DD/YYYY');
//      //console.log(convertedDOB)

//     var DateofRelieving =   <DatePicker
//     time={false}  dateFormat="MMMM d, yyyy"
//     onChange={this.handleChange1}
//     maxDate={new Date()}
//     selected={convertedDateofRelieving == "01/01/1970" ? "" :this.state.DateofRelieving }
//     className="form-control"/>

// this.state.DateofJoining = new Date(this.state.DateofJoining)
// const convertedDateofJoining = moment(this.state.DateofJoining).format('MM/DD/YYYY');

//            var DateofJoining = <DatePicker
//                selected={convertedDateofJoining == "01/01/1970" ? "" :this.state.DateofJoining}
//                onChange={ this.handleChange2 }
//                dateFormat="MMMM d, yyyy"
//                maxDate={new Date()}
//                className="form-control"/>

// this.state.DOB = new Date(this.state.DOB)
// const convertedDOB = moment(this.state.DOB).format('MM/DD/YYYY');
//            var DOB = <DatePicker
//            selected={convertedDOB == "01/01/1970" ? "" :this.state.DOB}
//            onChange={ this.handleChange3 }
//                dateFormat="MMMM d, yyyy"
//                className="form-control"
//                maxDate={new Date()}

//                />
    return(

    <body className="font-montserrat">
          <div id="main_content">

<div className="page" >
{/*
<div className="center">
         <h3 className="card-title"  style = {{fontSize:"20px", fontWeight:"bold"}}>Update User</h3>
         <br/>
        </div> */}
        <br/>
        <br/>
            <Form onSubmit={this.handleSubmit}>
            <div class="card-body" class="container" style={{ height: "800px", background: 'white', borderRadius: '10px' }}>


<div class="row clearfix" style={{ marginTop: "20px" }}>
<div class="col-sm-12">
                                    
                                           
                                    <h4>Update User Details: </h4>
                                    <hr></hr>
                                      </div>
            <div class=" col-sm-4 col-md-4">
     <div class="form-group" style={{}}>
         <label class="form-label" style={{color:"black"}}>First Name <span style={{fontWeight:"bold",color:"red"}} >*</span></label>
         <input type="text" maxLength="35" name="FirstName" style={{width:"50%"}}
        required className="form-control" placeholder="FirsttName" required
         value={this.state.FirstName} onChange={this.handleChange}/>

     </div>
 </div>
 <div class=" col-sm-4 col-md-4">
     <div class="form-group"  style={{}}
     >
         <label class="form-label" style={{color:"black"}}>Last Name <span style={{fontWeight:"bold",color:"red"}} >*</span></label>
         <input type="text" size="30" style={{width:"50%"}} required maxLength="35" required
         className="form-control"  name="LastName" value={this.state.LastName} onChange={this.handleChange}/>

     </div>
 </div>
 <div class=" col-sm-4 col-md-4">
     <div class="form-group" style={{}}>
     <div  style={{color:"black"}}>
         <label class="form-label" >Gender</label>
         <label>Male<input type="radio"  name="Gender"
                  value="M"
              checked={this.state.Gender === "M"}  onChange={this.handleChange} style={{marginLeft:"80px"}}/> </label>
       <br/>
        <label>Female<input type="radio"   value="F"
              checked={this.state.Gender === "F"} name="Gender" onChange={this.handleChange}style={{marginLeft:"64px"}}/> </label>


     </div>
     </div>
 </div>
 <div class="col-sm-12">
                                            <div class="form-group" >
                                               <h4>Update Employment Details:</h4>
                                               <hr></hr>
                                            </div>
                                        </div>
 <div class=" col-sm-4 col-md-4">
     <div class="form-group" style={{}}>
         <label class="form-label" style={{color:'black'}}>Employee Code<span style={{fontWeight:"bold",color:"red"}} >*</span></label>
         <input type="text" size="30"  style={{width:"50%"}} maxLength="15" required
         className="form-control" disabled name="EmpCode" value={this.state.EmpCode} onChange={this.handleChange}/>

     </div>
 </div>

 <div class=" col-sm-4 col-md-4">
     <div class="form-group" style={{}}>
         <label class="form-label" style={{color:"black"}}>Designation<span style={{fontWeight:"bold",color:"red"}} >*</span></label>
         <select name="RoleID" required
         className="form-control"  style={{width:"50%"}} value={this.state.RoleID} onChange={this.handleChange}>
             <option value="1">Admin</option>
             <option value="2">Operator</option>

         </select>
     </div>
 </div>
 <div class=" col-sm-4 col-md-4">
     <div class="form-group" style={{color:"black",}}>
     <div >
     <label>Active<input type="radio"  name="ActiveStatus"
                  value="true"
              checked={this.state.ActiveStatus === "true"}  onChange={this.handleChange} style={{marginLeft:"80px"}}/> </label>
       <br/>
        <label>In Active<input type="radio"   value="false"
              checked={this.state.ActiveStatus === "false"} name="ActiveStatus" onChange={this.handleChange}style={{marginLeft:"66px"}}/> </label>


     </div>
     </div>
 </div>
 {/* <div class=" col-sm-4 col-md-4">
     <div class="form-group" style={{}}>
         <label class="form-label" style={{color:"white"}}>Desigination</label>
         <input type="text" name="Role" value={this.state.Role} onChange={this.changeHandler}/>
     </div>
 </div> */}


 {/* <div class=" col-sm-4 col-md-4">
 <div class="form-group" style={{}}>
         <label class="form-label" style={{color:"black"}}>Date of Birth</label> */}
         {/* <input type="date" min='1960-01-01' id="dt" required onChange={this.handleChange}
         className="form-control"  name="DOB" value={this.state.DOB} onChange={this.handleChange}/>
     */}
     {/* {DOB} */}
     {/* </div>
 </div> */}
 <div class=" col-sm-4 col-md-4">
     <div class="form-group" style={{}}>
         <label class="form-label" style={{color:"black"}}>Mobile Number <span style={{fontWeight:"bold",color:"red"}} >*</span></label>
         <input type="text" required maxLength="12" style={{width: "50%"}} required
         className="form-control" size="10" name="Mobile" value={this.state.Mobile} onChange={this.handleChange}/>

     </div>
 </div>
 <div class=" col-sm-4 col-md-4">
     <div class="form-group" style={{}}>
         <label class="form-label" style={{color:"black"}}>Extn. No</label>
         <input type="text"  style={{width: "50%"}}
         className="form-control" size="10" name="AlternatePhone" value={this.state.AlternatePhone} onChange={this.handleChange}/>

     </div>
 </div>

 <div class=" col-sm-4 col-md-4">
     <div class="form-group" style={{}}>
         <label class="form-label" style={{color:"black"}}>Department</label>
         <input type="text"  maxLength="35" style={{width: "50%"}}
         className="form-control"  size="30" name="Department" value={this.state.Department} onChange={this.handleChange}/>

     </div>
 </div>
 {/* <div class=" col-sm-4 col-md-4">
     <div class="form-group" style={{}}>
         <label class="form-label" style={{color:"black"}}>Reporting Manager</label>

         <Hint options={this.state.HintData!=null?this.state.HintData:[]} allowDropDown>
        <input style={{width: "50%"}} maxLength="50" required autoComplete="off"
          type="text" name="ReportingManager" value={this.state.ReportingManager} onChange={this.handleChange}

        />

       </Hint>
       <span style={{ fontWeight: "", color: "red" }}>{this.state.Reportingerror}</span>

     </div>
 </div> */}

  {/* <div class=" col-sm-4 col-md-4">
     <div class="form-group" style={{}}>
         <label class="form-label" style={{color:"white"}}>ReportingManagerId</label>
         <input type="text" required onChange={this.handleChange}
         className="form-control"  size="10" name="ReportingManagerID" value={this.state.ReportingManagerID} onChange={this.handleChange}/>

     </div>
 </div> * */}
 <div class="col-sm-12">
                                            <div class="form-group" >
                                               <h4>Update Login Details:</h4>
                                               <hr></hr>
                                            </div>
                                        </div>
 <div class=" col-sm-4 col-md-4">
 <div class="form-group" style={{}}>
         <label class="form-label" style={{color:"black"}}>Username</label>
         <input type="text" required maxLength="35" style={{width: "50%"}}
         className="form-control" disabled   name="Username" value={this.state.Username} onChange={this.handleChange}/>

     </div>
 </div>
 <div class=" col-sm-4 col-md-4">
     <div class="form-group" style={{}}>
         <label class="form-label" style={{color:"black"}}>Password</label>
         <input type="text" style={{width: "50%"}} name="Password" disabled required minLength={8} maxLength={20}
             className="form-control" value={this.state.Password} type="Password" onChange={this.handleChange}/>

     </div>
 </div>
 <div class=" col-sm-4 col-md-4">
     <div class="form-group" style={{}}>
         <label class="form-label" style={{color:"black"}}>Email ID<span style={{fontWeight:"bold",color:"red"}} >*</span></label>
         <input type="email" required maxLength="35" style={{width: "50%"}} maxLength="50" required
         className="form-control"  name="EmailID" value={this.state.EmailID} onChange={this.handleChange}/>

     </div>
 </div>

 
 {/* <div class=" col-sm-4 col-md-4">
     <div class="form-group" style={{}}>
         <label class="form-label" style={{color:"black"}}>Date of Joining</label>
         {DateofJoining}
     </div>
 </div>
 <div class=" col-sm-4 col-md-4">
     <div class="form-group" style={{}}>
         <label class="form-label" style={{color:"black"}}>Date of Relieving</label>
         {DateofRelieving}
     </div>
 </div> */}
<div class=" col-sm-4 col-md-4">
     <div class="form-group" style={{}}>
         <label class="form-label" style={{color:"black"}}>Address</label>
         <textarea type="text"  style={{width: "50%"}} maxLength="200"
         className="form-control"  rows="2" cols="50" name="Address" value={this.state.Address} onChange={this.handleChange}/>

     </div>
 </div>
             <br/>


      <Form.Group>

<div class="row clearfix">
<div  className='center'>
                <Form.Control type="hidden" name="id" value={this.state.UserID} />
                <button className="btn btn-primary" type="submit" style={{width: "9%",marginLeft:"150px",marginTop:"3px",background:"blue"}}> Update</button>

                <Link to="UserList"><button className="btn btn-primary" style={{width: "9%",height:"92%" ,marginLeft:"50px",background:"blue"}} onClick={this.onClick} >Back</button></Link>

              </div>
              </div>
              </Form.Group>
            </div>
            </div>
            </Form>

        </div>
        </div>
        </body>

    )
  }
}

export default EditUser;