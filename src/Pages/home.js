import React,{ useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import { Base64 } from 'js-base64';
import axios from "axios";
import IP from './Utiltys';


export default function Login() {
    const [username, setUsername]=useState("");
    const [password, setPassword]=useState("");
    const [userdetails,setuserdetails]=useState([]);
    console.log(Base64.encode("Scada@123"))

    React.useEffect(() => {


        fetch("http://"+process.env.REACT_APP_IP+"/api/userdetail?userid=0")
          .then(results => results.json())
          .then(data => {
            setuserdetails(data)
            console.log(data)
          });
      }, []); // <-- Have to pass in [] here!
  
async function login() {

    let item = { username,password };
   
    let result = await fetch("http://"+process.env.REACT_APP_IP+"/api/userAuthentication", {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Accept": 'application/json'
        }, 
        body: JSON.stringify(item)
    }).then((response) => {
        console.log(response)
       // console.log(response.status)
      
        if(response.status === 200){
           
            userdetails.map((a=>{
                if(a.Username == username && a.Password == password ){
               
                        console.log(a)
                localStorage.setItem("UserId",a.UserID)
                if(a.RoleID == 1){
                    console.log("entered")
                    localStorage.setItem("Admin",a.RoleID)
                    }
            }
            }))
            localStorage.setItem("user",username)
           
           window.location.assign("adminDashboard");
            //window.location.reload();  
        }else {
            console.log(response.status)
           alert("Please enter valid username and pasword")
        }
    })
    
    
    // .then(function(response) {
    //     console.log(response.status);
    //    // return response.status;
    //   })
    // ;
    
    // result = await result.json();

    // console.log(result)

    //  // check for error response
    //  if (!result.ok) {
    //     alert("please enter valid username")
    //  }
    // if (result.ExceptionMessage = "Username does not exists"){
    //   alert("please enter valid user name")
    //    history.push("/")
    // }
    // else{
    //     history.push("/AdminDashboard")
    // }
    // sessionStorage.setItem("user Auth", JSON.stringify(result))
    
    // return fetch(url)
    // .then(response => {
    //   const statusCode = response.status;
    //   const data = response.json();
    //   return Promise.all([statusCode, data]);
    // })
    // .then([res, data] => {
    //   console.log(res, data);
    // })
    // .catch(error => {
    //   console.error(error);
    //   return { name: "network error", description: "" };
    // });


}

        return(
            
            <div>
                <body className="font-montserrat">
                <div className="auth">
    <div className="auth_left">
        <div className="card">
            <div className="text-center mb-2">
               
            </div>
			 <div className="card-body">
			 <h3 style={{textAlign:"center"}}> ECSCADA Web Server Application </h3>
			 </div>
            <div className="card-body">
			<img className="text-center mb-2" src="assets/images/ecillogo.jpg"  style={{width:"150px"},{height:"170px"},{marginLeft:"75px"}} alt=""/>
                <div className="card-title" style={{textAlign: "center"}}>Login to ECSCADA Application</div>
                {/* <div className="form-group">
                    <select id="roles" className="custom-select" onChange={this.change}>
						<option>Choose Role...</option>
                        <option value="administrator@ecil.co.in">Administrator</option>
                        <option value="supervisor@ecil.co.in">Supervisor</option>
                        <option value="project-employee@ecil.co.in">Employee</option>
                    </select>
                </div> */}
					<div className="form-group">
                    <input type="text"   maxLength="25"  aria-describedby="username" className="form-control" id="inp" name="input" placeholder="Username" onChange={(e)=>setUsername(e.target.value)}/>
                </div>
                <div className="form-group">
                   
                <input type="password"   maxLength="25"  onKeyPress={(e) => e.key === 'Enter' && login()}  placeholder="Password" className="form-control" id="exampleInputPassword1" onChange={(e)=>setPassword(Base64.encode(e.target.value))}/>
					 <label className="form-label"><a href='/ForgotPassword' className="float-right small">I forgot password</a></label>
                </div>
               
                <div className="form-group">
                   
                 <Link  onClick={login}   className="btn btn-primary btn-block"  > Sign in</Link> 
                </div>
            </div>


        </div>        
    </div>

    <div className="auth_right full_img" ></div>
   
</div>


</body>
            </div>

        );
     }
//  }

// export default Login;