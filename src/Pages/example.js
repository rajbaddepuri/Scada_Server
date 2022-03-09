import React,{Component} from 'react';
import { Base64 } from 'js-base64';

//import Login from './Login';

class example extends React.Component{
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

 
    }
    openPage(){

        window.location.assign("adminDashboard");

    }
    


     
    render(){
        return(
            <div className="page">
<h1 className="center"> Hi Welcome to UI Api Calls </h1>
<div>
    <button onClick = {this.openPage}>
    openPage
    </button>
</div>

            </div>


        )

        
    }  
}

export default example;