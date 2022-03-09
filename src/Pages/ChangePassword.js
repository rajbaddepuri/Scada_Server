import React,{Component} from 'react';
import { Base64 } from 'js-base64';
import IP from "./Utiltys";

//import Login from './Login';

class ChangePassword extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            add:{
                
            username:"",
            old_password:"",
            Password:"",
            Confirm_Password:"",
            Passworderror:"",
            }
        };

    this.state.add.username=localStorage.getItem("user")
     this.state.add.old_password=localStorage.getItem("password")
    }
    
    changeHandler = e =>{
        const name=e.target.name;
        const value=e.target.value;
        console.log(e.target.name)
        var oldstatepass = localStorage.getItem("password")
        console.log('old state passw')
        console.log(oldstatepass)
        console.log('old changing passw')
        console.log(value)
        // if(this.state.add.value !== e.targe.value)
        // console.log('not equal')
        var new_password = this.state.add.Password
        if (e.target.name == "Confirm_Password"){
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

        var old_password_change = this.state.add.old_password
        if(oldstatepass!== old_password_change)
         {
             alert('Old password is incorrect')
             return
         }
         
         
    }
    onCreateProject = () =>{
        console.log(this.state.add);
        console.log(this.state.add.old_password)
     }    
//handle validation...................
handleVAlidations(){
    let validPassword = false;
    if (this.state.add.Password !== null){
        const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    
        if(strongRegex.test(this.state.add.Password) ==  true){
            validPassword = true;
            
        }
       
    }
    console.log(validPassword)
    return validPassword;
}



     submitHandler = e =>{
        e.preventDefault()
       // console.log("test")
        var oldstatepass = localStorage.getItem("password")
        var old_password_change = this.state.add.old_password
       if(oldstatepass!== old_password_change)
         {
             alert('Old password is incorrect')
             return
         }
         var validPassword = this.handleVAlidations();
         if(!validPassword){
             alert("please follow Below Note for valid password")
         }
         if(validPassword){
            var s  = this.state.add
            s.Password = Base64.encode(this.state.add.Password);
            this.setState({
                add:s
            },()=>{
                console.log(this.state.add.Password)


       const apiUrl = 'http://'+IP+'/ScadaClient/api/ChangePassword';
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
                
              })
            },
            (error) => {
              this.setState({ error });
            }
          )
          alert('Password updated succesfully')
          window.location.assign("/")

        })
        }
    }
    render(){
        return(
            <body className="font-montserrat"  className="page" class="container" style={{ height: "750px",width:"900px", background: 'white',marginTop:"50px", borderRadius: '10px' }}>
                <form onSubmit={this.submitHandler} >
            <div id="main_content">
                 <div >
                <div className="section-body">
                <div className="card-title" className="center"> <label class="form-label"style={{ fontWeight:"bold", fontSize:"20px"}}>Change password</label>
               <hr></hr>
                
                <div className="form-group" style={{width:"50%"}}>
                <label class="form-label" style={{textAlign:"left", color:"black"}}>Username:</label>
         <input type="text" size="30" name="username" 
         className="form-control" placeholder="username" disabled
         value={this.state.add.username} onChange={this.changeHandler}/>
                </div>
                 <div className="form-group" style={{width:"50%"}}>
                    <label className="form-label" for="exampleInputEmail1" style={{textAlign:"left", color:"black"}}> Old Password: </label>
                    <input type="password" size="30" maxLength="25" name="old_password" required
         className="form-control" placeholder="old_password" disabled
         value={this.state.add.old_password} onChange={this.changeHandler}/>
                </div> 
                <div className="form-group" style={{width:"50%"}}>
                    <label className="form-label" for="exampleInputEmail1" style={{textAlign:"left", color:"black"}}> New Password: </label>
                    <input type="Password" size="30" name="Password" required
         className="form-control" placeholder="new_password" maxLength="25" 
         value={this.state.add.new_password} onChange={this.changeHandler}/>
                </div>
                <div className="form-group" style={{width:"50%"}}>
                    <label className="form-label" for="exampleInputEmail1"style={{textAlign:"left", color:"black"}}> Confirm Password: </label>
                    <input type="Password" size="30" name="Confirm_Password" required
         className="form-control" placeholder="Confirm_Password" maxLength="25" 
         value={this.state.add.Confirm_Password} onChange={this.changeHandler}/>
          <span style={{ fontWeight: "", color: "red" }}>{this.state.Passworderror}</span>
                </div>
                </div>
                <br/>
 <div className="form-footer" className="center">
                <div class="row clearfix">
                <div class="col-sm-6 col-md-6">
                    <button type="submit" className="btn btn-primary btn-block" style={{width:"20%", marginLeft:"200px"}} onClick={this.onCreateProject}> Update </button>
                    </div>
               
                </div>
                </div>
 <label style={{ fontSize:"20px",fontWeight:'bold'}}>Note:</label> 
 <hr></hr>

 <div className="center">
                   <li style={{textAlign:"left"}}> The Password must contain at least 1 lowercase alphabetical character</li>
                   <li style={{textAlign:"left"}}>The Password must contain at least 1 uppercase alphabetical character</li>
                   <li style={{textAlign:"left"}}>The Password must contain at least 1 numeric character               </li>
                   <li style={{textAlign:"left"}}>The Password must contain at least one special character             </li>
                   <li style={{textAlign:"left"}}> The Password must be eight characters or longer                     </li>
    </div>
    <br/>
    <br/>
              
            </div>
            {/* <div className="text-center text-muted">
                Forget it, <a href="index.html">Send me Back</a> to the Sign in screen.
            </div> */}
        </div>        
</div>

{/* </div> */}
{/* </div> */}
</form>
     </body>


        )

        
    }  
}

export default ChangePassword;