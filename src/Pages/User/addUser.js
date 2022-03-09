import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';
import DatePicker from "react-datepicker";    
import "react-datepicker/dist/react-datepicker.css"; 
import { Hint } from "react-autocomplete-hint";
import axios from "axios";
import "./styles.css";
import * as moment from 'moment';
import { Base64 } from 'js-base64';
import IP from "../Utiltys";




class addUser extends React.Component{


    constructor(props){
        super(props);
        this.state={
            UserDetails:[],
            hintData:[],
            setHintData:[],
            setHintId:[],
            text:"",
            setText :"",
            UserData:[],
            RMID:"",
            Emperror: "",
            Reportingerror: "",
            Usererror: "",
           add:{
            
            FirstName:'',
            LastName:'',
            EmpCode:'',
            Department:'',
            ReportingManager:'',
            ReportingManagerID:'',
            UserName:'',
            Password:'',
            DateofJoining:null,
            DateofRelieving:'',            
            Mobile:'',
            AlternatePhone:'',
            Gender:'',  
            Address:'',
            EmailID:'',
            ActiveStatus:'',
            RoleID:'',
            InsertedBy:'1',
            InsertedDate: "2021-05-06T00:00:00",
            ModifiedDate: "2021-05-06T00:00:00",
            DOB: null,
            Emperror: "",
            Reportingerror: "",
            Usererror: "",
            Confirm_Password:"",
            Passworderror:"",
 
           }
         
        };
     
    }

    componentDidMount(){
        this.getData()
        console.log(Base64.encode("Admin@123"))
       
    }
      getData = async () => {
        const res = await axios.get(
          "http://'+IP+'/ScadaClient/api/userdetail?userid=0"
        );
        //console.log(res);
        var hintArray = [];
        var hintId=[];
        res.data.map((a) => hintArray.push(a.FirstName+" "+a.LastName)
        
        );
        res.data.map((a) =>hintId.push(a.UserID));
        this.setState({UserData:res.data})
        this.setState({setHintData:hintArray});
        this.setState({setHintId:hintId});
            //console.log(this.state.setHintData)
      };
    changeHandler = e =>{

        const repo = "ReportingManagerID"
        const name=e.target.name;
        const value=e.target.value;
        console.log(name,value)
         //to fetch the user name

         if(name == "UserName")
        
         {
                 this.state.UserData.map((user)=>{
                     
                     if (user.Username !== value)
                     {
                         this.setState({
                             [name]:value
                         })
                     }
                   
                 })
         }
         // to fetch the emp code
         if (name == "EmpCode")
        // console.log(this.state.UserData)
         {
                 this.state.UserData.map((user)=>{
                    //console.log(user)
                     if (user.EmpCode !== value)
                     {
                         this.setState({
                             [name]:value
                         })
                     }
                    
                 })
         }
      
     

        //to fetch the userId--
        // if(name  == "ReportingManager")
        // {
        //     this.state.UserData.map((user)=>{
        //         var Users = user.FirstName+" "+user.LastName
        //             console.log("for test ID")
        //         if( Users.toUpperCase() == value.toUpperCase())
        //         {
        //             console.log(user.UserID)
                  
        //             this.setState({add:{
        //                 ...this.state.add,
        //                 ReportingManagerID:user.UserID
        //             }},()=>{
        //                 console.log('..................')
        //                 console.log(this.state.add)
        //             });

        //          }
        //          })
        // }
       /////pasword validation
       if (e.target.name == "Confirm_Password"){
           var new_password = this.state.add.Password
        if(new_password !== value){
            this.setState({
                Passworderror:"* new and confirm password sholud be same"
            },()=>{

            })
        }
        else{
            this.setState({
                Passworderror:""
            },()=>{
            })
        }

    }
   

        this.setState({add:{
            ...this.state.add,
            [name]:value
        }});
      //console.log(this.state.DOB)
    }


    //DoB HAndler ------
    handleChange = date => {

        
        this.setState({add:{
            ...this.state.add,
            DOB:date,
        }});
        }

        //Date of JOining Handler
        handleChange1 = date => {
        
            this.setState({add:{
                ...this.state.add,
                DateofJoining:date,
               
            }});
            }

            handleChange2 = date => {
                console.log(date)
                this.setState({ 
                      DateofRelieving: date,
                });
                }
       
     ///handle validation
     handleVAlidations(){
        let validUser = true;
        let validRM = false;
        let validEmp=true;
        let validPassword = true;
        //let validRMId=false;
       // let boolPasswordError = true;
        console.log(".....................")
        console.log(this.state.add.ReportingManager)
        console.log(this.state.add.UserName)
        console.log(this.state.add.EmpCode)


        //Reporting Manager Validations 
    if(this.state.add.ReportingManager !== null)        
    {
        this.state.UserData.map((user)=>{
            // var Users = user.FirstName+" "+user.LastName
             var value =this.state.add.ReportingManager   
             var rm = user.FirstName+" "+user.LastName ;

            // console.log(rm)
            // console.log(value)
            if(rm.toUpperCase() == value.toUpperCase())
            {
                //console.log("rm validation success")
                validRM = true;
            }
            var value1 =this.state.add.ReportingManagerID ;
            var rmid =user.UserID;

            console.log(value1)
            console.log(rmid)
           if( rmid == value1)
           {
               //console.log("rm validation success")
               validRM = true;
           }
            
            //
          });
     }
          //Reporting Manager Validations 
    // if(this.state.add.ReportingManagerID !== null)        
    // {
    //     this.state.UserData.map((user)=>{
    //         // var Users = user.FirstName+" "+user.LastName
    //          var value =this.state.add.ReportingManagerID ;
    //          var rmid =user.UserID;

    //          console.log(value)
    //          console.log(rmid)
    //         if( rmid == value)
    //         {
    //             //console.log("rm validation success")
    //             validRMId = true;
    //         }
            
    //         //
    //       });
    //  }
     //User Name Validation
     if(this.state.add.UserName !== null)
     {
         console.log(this.state.add.UserName) 
         this.state.UserData.map((user)=>{    
             //console.log("Verify User")
             if (user.Username.toUpperCase() == this.state.add.UserName.toUpperCase())
             {
                validUser = false           
             }                
         })        
     }
     ///pasword validation
     if(this.state.add.Password !== null){
        
        const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
        
        
        if(strongRegex.test(this.state.add.Password) ==  true){
            if(this.state.add.Password == this.state.add.Confirm_Password){
                validPassword = false
         
        }
        }
  
    }

     // Emp code Validation
     if(this.state.add.EmpCode !== null)
     {
         console.log(this.state.add.EmpCode) 
         this.state.UserData.map((user)=>{    
             console.log("Verify Empcode")
             if (user.EmpCode.toUpperCase() == this.state.add.EmpCode.toUpperCase())
             {
                validEmp = false
           
             }                
         })        
     }
    
    
     return {validUser,validRM,validEmp,validPassword};

      }      
               
      
        
      submitHandler = e =>{
        e.preventDefault()
     

        // this.setState({add:{
        //     ...this.state.add,
        //     ReportingManagerID:this.state.RMID
        // }})
        console.log('Before Converting ')
        console.log(this.state.add)
        // var s  = this.state.add
        // const convertedDOB = moment(s.DOB).format('MM/DD/YYYY');
        //         s.DOB = convertedDOB.toString();
        //         const convertedDate = moment(s.DateofJoining).format('MM/DD/YYYY');
        //         s.DateofJoining = convertedDate.toString()
        //         this.setState({
        //             add:s
        //         },()=>{
        //             console.log('after Converting ')
        //             console.log(this.state.add)
        //         })
        
       

    //, () => {
    //         console.log("......................")
    //         console.log(this.state.add.ReportingManager)
    //         console.log(this.state.add.UserName)

    var {validUser,validEmp,validPassword} = this.handleVAlidations();
    
    console.log(validUser)

    if ( validPassword) {
        alert("Please fallow instruction for valid Password")

    }

    if (!validUser) {

        this.setState({

            Usererror: " * UserName Should Be unique"
        }, () => {

        })

    }
    else{
        this.setState({
            Usererror:"",
            
        })
    }

    // if (!validRM) {
    //     this.setState({

    //         Reportingerror: " * Not Valid Reporting Manager"
    //     }, () => {

    //     })
    // }
    if (!validEmp) {
        this.setState({

            Emperror: " * Employee Code should Be Unique"
        }, () => {

        })
        
    }
    else {
        this.setState({
            Emperror:""
        })
    }
              
              if(validUser &&validEmp  && !validPassword  ){
                    
                        var s  = this.state.add
                        s.Password = Base64.encode(this.state.add.Password);
                        this.setState({
                            add:s
                        },()=>{
                            console.log(this.state.add.Password)
                        
                    
                    console.log(this.state.add)
            const apiUrl = 'http://'+IP+'/ScadaClient/api/userdetails';
                const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(this.state.add)
                };
                
                fetch(apiUrl, requestOptions)
                    .then(res => res.json())                    
                    .then(result => {
                        console.log(result)
                      this.setState({
                        response: result,
                        isAddProduct: false,
                        isEditProduct: false
                      })
                     this.props.history.push('/ViewUser') 
                     window.location.reload()
                    },
                    (error) => { 
                      this.setState({ error });
                      alert('Data is not submitted. Please try again');
                    }                    
                    )     
                    
                })
                 }
    // }) 
}


      setGender(event) {
    //console.log(event.target.value);

  }

  setStatus(event) {
    //console.log(event.target.value);
  }

    onCreateProject = () =>{
       //console.log(this.state.add);
    }

 //handlei validation hear//
 
//  handleChange = e => {
//     this.form.validateFields(e.target);
//   }

//   contactSubmit = e => {
//     e.preventDefault();

//     this.form.validateFields();

//     if (!this.form.isValid()) {
//       console.log('form is invalid: do not submit');
//     } else {
//       console.log('form is valid: submit');
//     }
//   }


//Convert DateTime to Date
//2021-05-03T11:30:00  -> 5/3/2021
//  convert = dateRange =>
//   dateRange
//     .split(" - ")
//     .map(date => new Intl.DateTimeFormat("en-US").format(new Date(date)));


    render(){
        return(
            <body className="font-montserrat">
<div>




    <div className="page">
    <div>


    <div className="section-body">
            
           
            <ul class="nav nav-tabs page-header-tab">
            {localStorage.getItem("Admin")?
            <li class="nav-item"><Link to="/addUser" class="nav-link active show">Add User</Link></li>
            :""
                  }
            <li class="nav-item"><Link to="/viewUser" class="nav-link inactive show" >View User</Link></li>
            </ul>
     
      
</div>


{/* <div className="center">
         <h3 className="card-title"  style = {{fontSize:"20px", fontWeight:"bold"}}>Add User</h3>

</div>   */}
<form onSubmit={this.submitHandler} >
<div class="card-body" class="container" style={{ height: "850px", background: 'white', borderRadius: '10px' }}>


<div class="row clearfix" style={{ marginTop: "20px" }}>
<div class="col-sm-12">

       
  <h4>User Details: </h4>
  <hr></hr>
    </div>
<div class=" col-sm-4 col-md-4">
     <div class="form-group" style={{ }}>
         <label class="form-label" style={{color:"black"}}>First Name <span style={{fontWeight:"bold" ,color:"red"}} >*</span></label>
         <input type="text" style={{width: "50%"}} size="30" name="FirstName"  required className="form-control" 
      maxLength="35"   value={this.state.add.FirstName} onChange={this.changeHandler}/>
         
     </div>
 </div>
 <div class=" col-sm-4 col-md-4">
     <div class="form-group" style={{ }}>
         <label class="form-label" style={{color:"black"}}>Last Name <span style={{fontWeight:"bold",color:"red"}} >*</span></label>
         <input type="text" style={{width: "50%"}} size="30"  required  maxLength="35" 
         className="form-control"  name="LastName" value={this.state.add.LastName} onChange={this.changeHandler}/>
        
     </div>
 </div>
 <div class=" col-sm-4 col-md-4">
     <div class="form-group" style={{ }}>
     <div onChange={this.setGender.bind(this)} style={{color:"black"}}>
         <label class="form-label" >Gender</label>
         {/* <input type="text" name="Gender" value={this.state.add.Gender} onChange={this.changeHandler}/> */}
         <label>Male<input type="radio" value={"M"} name="Gender" onChange={this.changeHandler} style={{marginLeft:"80px"}}/> </label>
       <br/> 
        <label>Female<input type="radio" value={"F"} name="Gender" onChange={this.changeHandler}style={{marginLeft:"63.5px"}}/> </label>
        
     </div>
     </div>
 </div>
                                        <div class="col-sm-12">
                                            <div class="form-group" >
                                                <h4>Employment Details:</h4>
                                                <hr></hr>
                                            </div>
                                        </div>
 <div class=" col-sm-4 col-md-4">
     <div class="form-group" style={{ }}>
         <label class="form-label" style={{color:"black"}}>Employee Code <span style={{fontWeight:"bold",color:"red"}} >*</span></label>
         <input type="text" style={{width: "50%"}} size="10"   required  maxLength="15" 
         className="form-control"  name="EmpCode" value={this.state.add.EmpCode} onChange={this.changeHandler}/> 
             <span style={{ fontWeight: "", color: "red" }}>{this.state.Emperror}</span>
                                 
     </div>
 </div>
 
  
   <div class=" col-sm-4 col-md-4">
     <div class="form-group" style={{ }}>
         <label class="form-label" style={{color:"black"}}>Designation  <span style={{fontWeight:"bold",color:"red"}} >*</span> </label>
         <select name="RoleID" 
         className="form-control"  style={{width:"50%"}} value={this.state.add.RoleID} required onChange={this.changeHandler}>
             <option value=""></option>
             <option value="1">Admin</option>
             <option value="2">Operator</option>
           
         </select>
     </div>
 </div>  
 
 <div class=" col-sm-4 col-md-4">
     <div class="form-group" style={{ }}>
     <div onChange={this.setStatus.bind(this)}  style={{color:"black"}}>
        <label class="form-label"> Status </label> 
         {/* <input type="text" name="PhoneNumber" value={this.state.add.Company} onChange={this.changeHandler}/>  */}
          
       <label>Active<input type="radio" value={this.state.ActiveStatus=true} name="ActiveStatus"   onChange={this.changeHandler} style={{marginLeft:"80px"}}/> </label> 
       <br/>
       <label>InActive<input type="radio" value={this.state.ActiveStatus=false} name="ActiveStatus"   onChange={this.changeHandler} style={{marginLeft:"68.5px"}}/> </label> 
       
     
     </div>
     </div>
 </div>
{/* 
 <div class=" col-sm-4 col-md-4">
 <div class="form-group" style={{ }}>
         <label class="form-label" style={{color:"black"}}>Date of Birth</label> */}
         {/* <input type="date" min='1960-01-01' id="dt" required onChange={this.handleChange}
         className="form-control"  name="DOB" value={this.state.add.DOB} onChange={this.changeHandler}/>  */}
{/* 
<DatePicker
wrapperClassName="datepicker" 
className="form-control"
autoComplete="off"
selected={ this.state.add.DOB}
onChange={ this.handleChange }
name="DOB"
dateFormat="MM/dd/yyyy"
maxDate={new Date()}
          /> 
    
     </div>
 </div> */}
 <div class=" col-sm-4 col-md-4">
     <div class="form-group" style={{ }}>
         <label class="form-label" style={{color:"black"}}>Mobile Number <span style={{fontWeight:"bold",color:"red"}} >*</span></label>
         <input type="text"  required maxLength="12" style={{width: "50%"}}
         className="form-control" size="10" name="Mobile" value={this.state.add.Mobile} onChange={this.changeHandler}/> 
     
     </div>
 </div>
 <div class=" col-sm-4 col-md-4">
     <div class="form-group" style={{ }}>
         <label class="form-label" style={{color:"black"}}>Extn. No</label>
         <input type="text"   maxLength="12" style={{width: "50%"}}
         className="form-control" size="10" name="AlternatePhone" value={this.state.add.AlternatePhone} onChange={this.changeHandler}/> 
     
     </div>
 </div>

 <div class=" col-sm-4 col-md-4">
     <div class="form-group" style={{ }}>
         <label class="form-label" style={{color:"black"}}>Department</label>
         <input type="text" style={{width: "50%"}} maxLength="35" 
         className="form-control"  size="30" name="Department" value={this.state.add.Department} onChange={this.changeHandler}/>
     
     </div>
 </div>
 {/* <div class=" col-sm-4 col-md-4">
     <div class="form-group" style={{ }}>
         <label class="form-label" style={{color:"black"}}>Reporting Manager <span style={{fontWeight:"bold",color:"red"}} >*</span></label>
        <Hint options={this.state.setHintData} allowDropDown> 
         <input type="text" style={{width: "50%"}} maxLength="50" autoComplete="off" required
         className="form-control"  size="30" name="ReportingManager" value={this.state.add.ReportingManager} onChange={this.changeHandler}/></Hint>
        <span style={{ fontWeight: "", color: "red" }}>{this.state.Reportingerror}</span>
                              
     </div>
 </div> */}
  {/* <div class=" col-sm-4 col-md-4">
     <div class="form-group" style={{ }}>
         <label class="form-label" style={{color:"white"}}>ReportingManagerID</label>
            <Hint options={this.state.setHintData} allowDropDown>
        <input
          className="input-with-hint"
          type="text" name="ReportingManagerID" value={this.state.add.ReportingManagerID} onChange={this.changeHandler}
          
        />
      </Hint>
     </div>
 </div>  */}
 <div class="col-sm-12">
                                            <div class="form-group" >
                                               <h4>Login Details:</h4>
                                               <hr></hr>
                                            </div>
                                        </div>
 <div class=" col-sm-4 col-md-4">
 <div class="form-group" style={{ }}>
         <label class="form-label" style={{color:"black"}}>Username <span style={{fontWeight:"bold",color:"red"}} >*</span></label>
         <input type="text"  required  maxLength="35" style={{width: "50%"}} autoComplete="off"
         className="form-control"  size="30"  name="UserName" value={this.state.add.UserName} onChange={this.changeHandler}/> 
      <span style={{ fontWeight: "", color: "red" }}>{this.state.Usererror}</span>
                             
     </div>
 </div>
 <div class=" col-sm-4 col-md-4">
     <div class="form-group" style={{ }}>
         <label class="form-label" style={{color:"black"}}>Password <span style={{fontWeight:"bold",color:"red"}} >*</span></label>
         <input type="text" name="Password" style={{width: "50%"}} required minLength={8} maxLength={20}
          className="form-control" value={this.state.add.Password} type="Password" onChange={this.changeHandler}/> 
     
     </div>
 </div>
 <div class=" col-sm-4 col-md-4">
     <div class="form-group" style={{ }}>
 <label className="form-label" for="exampleInputEmail1"> Confirm Password <span style={{fontWeight:"bold",color:"red"}} >*</span></label>
                    <input type="Password" size="30" name="Confirm_Password" required
         className="form-control"  style={{width: "50%"}} required  maxLength="25" 
         value={this.state.add.Confirm_Password} onChange={this.changeHandler}/>
          <span style={{ fontWeight: "", color: "red" }}>{this.state.Passworderror}</span>
          </div>
 </div>
 <div class=" col-sm-4 col-md-4">
     <div class="form-group" style={{ }}>
         <label class="form-label" style={{color:"black"}}>Email ID  <span style={{fontWeight:"bold",color:"red"}} >*</span></label>
         <input type="email" style={{width: "50%"}} className="form-control"  maxLength="35" required  name="EmailID" value={this.state.add.EmailID} onChange={this.changeHandler}/> 
     
     </div>
 </div>


 {/* <div class=" col-sm-4 col-md-4">
     <div class="form-group"  style={{ }} >
         <label class="form-label"  style={{marginLeft:"0px", color:"black"}}>Date of Joining</label>
         <DatePicker
wrapperClassName="datepicker" 
style={{ }}
className="form-control"
autoComplete="off"
selected={ this.state.add.DateofJoining }
onChange={ this.handleChange1 }
name="DateofJoining"
dateFormat="MM/dd/yyyy"
maxDate={new Date()}
          /> 
     </div>
 </div> */}
<div class=" col-sm-4 col-md-4">
     <div class="form-group" style={{ }}>
         <label class="form-label" style={{color:"black"}}>Address</label>
         <textarea type="text"  style={{width: "50%"}} maxLength="200"
         className="form-control"  rows="2" cols="50" name="Address" value={this.state.add.Address} onChange={this.changeHandler}/>
 
     </div>
 </div>
 <br/>
 <br/>
 <br/>
 <div >
                   <label style={{textAlign:"left",fontSize:"20px",fontWeight:'bold'}}>Note:</label> 
                   <li style={{textAlign:"left"}}> The Password must contain at least 1 lowercase alphabetical character</li>
                   <li style={{textAlign:"left"}}>The Password must contain at least 1 uppercase alphabetical character</li>
                   <li style={{textAlign:"left"}}>The Password must contain at least 1 numeric character               </li>
                   <li style={{textAlign:"left"}}>The Password must contain at least one special character             </li>
                   <li style={{textAlign:"left"}}> The Password must be eight characters or longer                     </li>
    </div>

    <button className="btn btn-info" type="submit" style={{ background: "blue", height: "35px", marginRight: "40px", width: "80px" }} onClick={this.onCreateProject}> Save</button>
     <Link to={{ pathname: './Viewuser' }}> <button className="btn btn-info" style={{ background: "blue", width: "80px" }} >Back</button></Link>

</div>
</div>
</form>

</div>  
</div>
</div>
</body>
        )
    }
}
export default addUser;
const element=<addUser></addUser>
ReactDOM.render(element,document.getElementById("root"));
