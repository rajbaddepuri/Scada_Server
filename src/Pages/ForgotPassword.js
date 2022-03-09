import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';
import axios from 'axios'


class ForgotPassword extends React.Component{
    render(){
        return(
            <div>
            <body className="font-montserrat">
            <div id="main_content">

<div className="page">
<div class="container-fluid">

<div className="section-body" style={{width:"50%", marginTop:"100px", marginLeft:"100px", border:"ridge"}}>
            {/* <div className="auth"> */}
    {/* <div className="auth_left"> */}
        {/* <div className="card"> */}
  
            {/* <div className="card-body"> */}
                
            {/* <img src="assets/images/ecillogo.JPG" className="ecillogo" style={{marginBottom: "30px"},{marginLeft: "70px"}} alt=""/> */}
			
                <div className="card-title" style={{textAlign:"center", fontWeight:"bold", fontSize:"20px"}}>Forgot Password</div>
                <p className="text-muted">Enter your Email Id and your password will be reset and emailed to you.</p>
                <div className="form-group">
                    <label className="form-label" for="exampleInputEmail1">Email Id</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
                </div>
                <div className="form-footer">
                    <button type="submit" className="btn btn-primary btn-block" style={{width:"50%", marginLeft:"125px", marginBottom:"20px"}}> Continue </button>
                </div>
            {/* </div> */}
            <div className="text-center text-muted">
                Forget it, <a href="/">Send me Back</a> to the Sign in screen.
            </div>
        {/* </div>         */}
    {/* </div> */}
    {/* <div className="auth_right full_img"></div> */}
    </div>
    </div>
    </div>
    </div>
{/* </div> */}
</body>
</div>
        )

        
    }  
}

export default ForgotPassword