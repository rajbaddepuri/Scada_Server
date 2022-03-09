import React from 'react';
import {Form, Button } from 'react-bootstrap';
import DatePicker from "react-datepicker";    
import "react-datepicker/dist/react-datepicker.css";  
import * as moment from 'moment';
import {Link} from 'react-router-dom';


class EditProject extends React.Component {
    constructor(props) {
      super(props);
      this.state={
        StartDate: null,
        EndDate:  null,
       
      }
      this.initialState = {
                ProjectID:"",
                ActiveStatus:"",
                InsertedBy: "1",
                InsertedDate: "2021-01-01T00:00:00",
                Location: "",
                ModifiedBy: "1",
                ModifiedDate: "2021-01-01T00:00:00",
                ProjectCode: "",
                ProjectDesc: "", 
                ProjectName: "",
                ProjectValue: "",
                StartDate: null,
                EndDate:  null,
                Customer:"",
                ProjectManager:"",
                Consultant:"",
            
         };
    

   
         if(props.user[0]){
          var temp = props.user[0]
          
          temp.ActiveStatus= temp.ActiveStatus == null? "true":temp.ActiveStatus.toString()
          this.state = temp
          console.log(this.state)
        
      } else {
      this.state = this.initialState;
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    
  }


  
  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
 
    if(name == "ActiveStatus")
    {

      console.log(event.target.value)
      this.setState({
        ActiveStatus: event.target.value
      },()=>{
        console.log(this.state.ActiveStatus);
        console.log(typeof(this.state.ActiveStatus))
      })
  
    } 
    this.setState({
      [name]: value
    })
  }

  handleChange1 = StartDate => {
    console.log('onchange called....')
  console.log(StartDate)
  this.setState({        
    StartDate: StartDate,
     
  });
  }
  handleChange2 = EndDate => {
      console.log('onchange called....')
  
  
    console.log(EndDate)
    this.setState({        
        EndDate: EndDate,
       
    });
    }
    onClick(){
      window.location.reload()
    }     

handleSubmit(event) {
    event.preventDefault();
    console.log('Before Converting ')
    console.log(this.state)
    var s  = this.state
    const convertedstartdate = moment(s.StartDate).format('DD/MM/YYYY');
            s.StartDate = convertedstartdate.toString();
            const convertedDate = moment(s.EndDate).format('DD/MM/YYYY');
            s.EndDate = convertedDate.toString()
            this.setState({
                s
            },()=>{
                console.log('after Converting ')
                console.log(this.state)
            })
            console.log(this.state)
    this.props.onFormSubmit(this.state);
    this.setState(this.initialState);
  } 




  onCreateProject = () =>{
    console.log(this.initialState);
 }
  
  render() {
    this.state.StartDate = new Date(this.state.StartDate)
    const convertedStartDate = moment(this.state.StartDate).format('MM/DD/YYYY');
 
     
    var StartDate =   <DatePicker
    dateFormat="MMMM d, yyyy"
    wrapperClassName="mydatepicker" 
    onChange={this.handleChange1} 
    selected={convertedStartDate == "01/01/1970" ? "" :this.state.StartDate}
    className="form-control"
    maxDate={new Date()}
    
    />
    this.state.EndDate = new Date(this.state.EndDate) 
    const convertedEndDate = moment(this.state.EndDate).format('MM/DD/YYYY');
 
           var EndDate = <DatePicker
           selected={convertedEndDate == "01/01/1970" ? "" :this.state.EndDate}
   
               wrapperClassName="mydatepicker" 
               onChange={ this.handleChange2 }
               dateFormat="MMMM d, yyyy"
               className="form-control"
               
               
               />
    return(
        <body >
        <div>
    
        <div>
        
            <div className="page">
        
                    {/* <div className="section-body">
         
             <div className="row clearfix">
                 <div className="col-xl-12 col-lg-12">
                     <div className="card" style={{}}> 
                         <div className="card-header" className='center'>
                             <h3 className="card-title"  style = {{ fontSize:"20px", fontWeight:"bold"}}>Update Project</h3>
                         </div>
                     </div>                
                 </div>
           </div>  
        </div>  */}
        <br/>
        <br/>
        <Form onSubmit={this.handleSubmit}>
        <div class="card-body" class="container" style={{ height: "500px", background: 'white', borderRadius: '10px' }}>


<div class="row clearfix" style={{ marginTop: "10px" }}>
<div class="col-sm-12">

       
<h4>Update Project Details: </h4>
<hr></hr>
  </div>
        <div class="col-sm-4 col-md-4">
             <div class="form-group" style={{}}>
                 <label class="form-label" style={{color:"black"}}>Project Name<span style={{ fontWeight: "bold", color: "red" }} >*</span></label>
                 <input type="text" size="30" name="ProjectName" style={{width:"60%"}}
                 className="form-control" required maxLength="50"
                 value={this.state.ProjectName} onChange={this.handleChange}/>
                 
             </div>
         </div>
         <div class="col-sm-4 col-md-4">
             <div class="form-group" style={{}}>
                 <label class="form-label" style={{color:"black"}}>Project Code<span style={{ fontWeight: "bold", color: "red" }} >*</span></label>
                 <input type="text" size="30" style={{width:"60%"}} required maxLength="25"
                 className="form-control"  name="ProjectCode" value={this.state.ProjectCode} onChange={this.handleChange}/>
                
             </div>
         </div>
         <div class="col-sm-4 col-md-4">
             <div class="form-group" style={{}}>
                 <label class="form-label" style={{color:"black"}}>Project Description</label>
                 <textarea type="text"  style={{width:"60%"}} maxLength="200"
                 className="form-control"  rows="2" cols="50" name="ProjectDesc" value={this.state.ProjectDesc} onChange={this.handleChange}/>
         
             </div>
         </div>
         <div class="col-sm-4 col-md-4">
                                            <div class="form-group" >
                                                <label class="form-label" style={{ color: "black" }}>Project Manager</label>
                                                <input type="text"  style={{ width: "60%" }} maxLength="10"
                                                    className="form-control" rows="2" cols="50" name="ProjectManager" value={this.state.ProjectManager} onChange={this.changeHandler} />

                                            </div>
                                        </div>
                                        <div class="col-sm-4 col-md-4">
                                            <div class="form-group" >
                                                <label class="form-label" style={{ color: "black" }}>Customer</label>
                                                <input type="text"  style={{ width: "60%" }} maxLength="10"
                                                    className="form-control" rows="2" cols="50" name="Customer" value={this.state.Customer} onChange={this.changeHandler} />

                                            </div>
                                        </div>
                                        <div class="col-sm-4 col-md-4">
                                            <div class="form-group" >
                                                <label class="form-label" style={{ color: "black" }}>Consultant</label>
                                                <input type="text"  style={{ width: "60%" }} maxLength="10"
                                                    className="form-control" rows="2" cols="50" name="Consultant" value={this.state.Consultant} onChange={this.changeHandler} />

                                            </div>
                                        </div>
         <div class="col-sm-4 col-md-4">
 <div class="form-group" style={{}}>
         <label class="form-label" style={{color:"black"}}>Start Date</label>
         {StartDate}
     </div>
 </div>
 <div class="col-sm-4 col-md-4">
 <div class="form-group" style={{}}>
         <label class="form-label" style={{color:"black"}}>End Date</label>
      {EndDate}
     </div>
 </div>
        <div class="col-sm-4 col-md-4">
             <div class="form-group" style={{}}>
                 <label class="form-label" style={{color:"black"}}>Location</label>
                 <textarea type="text"  style={{width:"60%"}} maxLength="35"
                 className="form-control"  rows="2" cols="50" name="Location" value={this.state.Location} onChange={this.handleChange}/>
         
             </div>
         </div>
         
         <div class="col-sm-4 col-md-4">
     <div class="form-group" style={{color:"black",}}>
     <div >
     <label>Active<input type="radio"  name="ActiveStatus"
                  value="true"
              checked={this.state.ActiveStatus === "true"}  onChange={this.handleChange} style={{marginLeft:"80px"}}/> </label>
       <br/> 
        <label>In Active<input type="radio"   value="false"
              checked={this.state.ActiveStatus === "false"} name="ActiveStatus" onChange={this.handleChange}style={{marginLeft:"62px"}}/> </label>
        

     </div>
     </div>
 </div>
 
 <div className="center">
    <button className="btn btn-primary" type="submit" style={{width: "8%",marginRight:"50px",marginTop:"3px",background:"blue"}} onClick={this.onCreateProject}> Update</button>
    <Link to="ViewProject"><button className="btn btn-primary" style={{width: "8%",height:"82%" ,marginRight:"50px",background:"blue"}} onClick={this.onClick} >Back</button></Link>
 </div>
        </div>
        </div>
        </Form>
        </div>  
        </div>
        </div>
        </body>
    )
  }
}

export default EditProject;