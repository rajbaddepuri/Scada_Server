import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import "./styles.css";
import * as moment from 'moment';
import IP from "../Utiltys";

class addProject extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            UserDetails: [],
            ProjectData: [],
            TrendData:[],
            ProjectNameerr:"",
            Projectcodeerr:"",
            add: {

                ActiveStatus: "",
                EndDate: null,
                InsertedBy: "1",
                InsertedDate: "",
                Location: "",
                ModifiedBy: "1",
                ModifiedDate: "",
                ProjectCode: "",
                ProjectDesc: "",
                ProjectName: "",
                StartDate: null,
                Customer:"",
                ProjectManager:"",
                consultant:"",
            }
        };

    }
    componentDidMount() {
        this.getData();
        this.getTrendData()
    }
    getData = async () => {
        const res = await axios.get(
            "http://"+IP+"/ScadaClient/api/projectdetail?projectid=0"
        );

        this.setState({ ProjectData: res.data })

        //console.log(this.state.setHintData)
    };
    getTrendData = async () => {
        const res = await axios.get(
            "http://192.168.0.45/ScadaClient/api/GroupwithTrendsTimestamp?GroupName=DAS_GRP2"
        );
        this.setState({ TrendData: res.data })

        //console.log(this.state.setHintData)
    };
    changeHandler = e => {
        const name = e.target.name;
        const value = e.target.value;
       

        this.setState({
            add: {
                ...this.state.add,
                [name]: value
            }
        });
    }

    handleChange = date => {
        console.log(date)
        this.setState({
            add: {
                ...this.state.add,
                StartDate: date
            }
        });
    }
    handleChange1 = date => {
        console.log(date)
        this.setState({
            add: {
                ...this.state.add,
                EndDate: date
            }
        });
    }


    handleVAlidations() {

        let validProject = true;

        let validCode = true;


        //Project Name Validation
        if (this.state.add.ProjectName !== null) {
            console.log(this.state.add.UserName)
            this.state.ProjectData.map((user) => {
                console.log("Verify User")
                if (user.ProjectName.toUpperCase() == this.state.add.ProjectName.toUpperCase()) {
                    validProject = false

                }
            })
        }

        // Project code Validation

        if (this.state.add.ProjectCode !== null) {
            console.log(this.state.add.ProjectCode)
            this.state.ProjectData.map((user) => {
                console.log("Verify Empcode")
                if (user.ProjectCode.toUpperCase() == this.state.add.ProjectCode.toUpperCase()) {
                    validCode = false

                }
            })
        }



        ////console.log(formIsValid)
        return { validProject, validCode };

    }

    submitHandler = e => {
        e.preventDefault()
        console.log('Before Converting ')
        console.log(this.state.add)
      
        
        if(this.state.add.ProjectName !==null){
            var item =this.state.add.ProjectName 
            alert("ok")
         axios.post("http://"+IP+":8000/ProjectFolader",{"file":item}, { 
               }).then(res => { 
               console.log(res.data)})
         }

           

        var { validProject, validCode } = this.handleVAlidations();

      


        if (!validProject) {
            this.setState({

                ProjectNameerr: " * Project Name should be Unique"
            }, () => {
    
            })
            
        }
        if (!validCode) {
            //$(".spassword_error").show();
            this.setState({

                Projectcodeerr: " * Project Code should be Unique"
            }, () => {
    
            })

           

        }

        if (validProject & validCode) {
            
            var s = this.state.add
            const convertedstartdate = moment(s.StartDate).format('MM/DD/YYYY');
            s.StartDate = convertedstartdate.toString();
            const convertedDate = moment(s.EndDate).format('MM/DD/YYYY');
            s.EndDate = convertedDate.toString()
            this.setState({
            add: s
            }, () => {
            console.log('after Converting ')
            
        }) 
            console.log(this.state.add)
            const apiUrl = 'http://'+IP+'/ScadaClient/api/projectdetails';
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
             this.props.history.push('/viewProject');
            window.location.reload()
        
        }
    }

    setGender(event) {
        //console.log(event.target.value);

    }

    setStatus(event) {
        //console.log(event.target.value);
    }

    onCreateProject = () => {
        
     


    }




    render() {
        return (
            <body className="font-montserrat">
                <div className="page">

                    <div className="section-body">


                        <ul class="nav nav-tabs page-header-tab">
                            {localStorage.getItem("Admin") ?
                                <li class="nav-item"><Link to="/AddProject" class="nav-link active show">Add Project</Link></li>
                                : ""
                            }
                            <li class="nav-item"><Link to="/ViewProject" class="nav-link inactive show" >View Projects</Link></li>
                        </ul>


                    </div>

                    <br />
                    <br />
                    {/* <div className='center'>
         <h3 className="card-title"  style = {{fontSize:"20px", fontWeight:"bold"}}>Add Project</h3>

</div>   */}
                    <form onSubmit={this.submitHandler} >
                        <div class="card-body" class="container" style={{ height: "500px", background: 'white', borderRadius: '10px' }}>


                            <div class="row clearfix" style={{ marginTop: "10px" }}>
                                <div class="col-sm-12">


                                    <h4>Project Details: </h4>
                                    <hr></hr>
                                </div>
                                <div class="col-sm-4 col-md-4" >
                                    <div class="form-group" >
                                        <label class="form-label" style={{ color: "black" }}>Project Name <span style={{ fontWeight: "bold", color: "red" }} >*</span></label>
                                        <input type="text" style={{ width: "60%" }} size="30" name="ProjectName" maxLength="50" required
                                            className="form-control" value={this.state.add.ProjectName} onChange={this.changeHandler} />
                                        <span style={{ fontWeight: "", color: "red" }}>{this.state.ProjectNameerr}</span>

                                    </div>
                                </div>
                                <div class="col-sm-4 col-md-4">
                                    <div class="form-group" >
                                        <label class="form-label" style={{ color: "black" }}>Project Code <span style={{ fontWeight: "bold", color: "red" }} >*</span></label>
                                        <input type="text" size="30" style={{ width: "60%" }} maxLength="25" required
                                            className="form-control" name="ProjectCode" value={this.state.add.ProjectCode} onChange={this.changeHandler} />
                                        <span style={{ fontWeight: "", color: "red" }}>{this.state.Projectcodeerr}</span>

                                    </div>
                                </div>
                                <div class="col-sm-4 col-md-4">
                                    <div class="form-group" >
                                        <label class="form-label" style={{ color: "black" }}>Project Description</label>
                                        <textarea type="text" style={{ width: "60%" }} maxLength="200"
                                            className="form-control" rows="2" cols="50" name="ProjectDesc" value={this.state.add.ProjectDesc} onChange={this.changeHandler} />

                                    </div>
                                </div>
                                <div class="col-sm-4 col-md-4">
                                    <div class="form-group" >
                                        <label class="form-label" style={{ color: "black" }}>Project Manager</label>
                                        <input type="text" style={{ width: "60%" }} maxLength="10"
                                            className="form-control" rows="2" cols="50" name="ProjectManager" value={this.state.add.ProjectManager} onChange={this.changeHandler} />

                                    </div>
                                </div>
                                <div class="col-sm-4 col-md-4">
                                    <div class="form-group" >
                                        <label class="form-label" style={{ color: "black" }}>Customer</label>
                                        <input type="text" style={{ width: "60%" }} maxLength="10"
                                            className="form-control" rows="2" cols="50" name="Customer" value={this.state.add.Customer} onChange={this.changeHandler} />

                                    </div>
                                </div>
                                <div class="col-sm-4 col-md-4">
                                    <div class="form-group" >
                                        <label class="form-label" style={{ color: "black" }}>Consultant</label>
                                        <input type="text" style={{ width: "60%" }} maxLength="10"
                                            className="form-control" rows="2" cols="50" name="consultant" value={this.state.add.consultant} onChange={this.changeHandler} />

                                    </div>
                                </div>
                                <div class="col-sm-4 col-md-4">
                                    <div class="form-group">
                                        <label class="form-label" style={{ color: "black" }}>Start Date</label>
                                        <DatePicker
                                            wrapperClassName="mydatepicker"
                                            selected={this.state.add.StartDate}
                                            onChange={this.handleChange}
                                            dateFormat="MMMM d, yyyy"
                                            className="form-control"
                                            required
                                            maxDate={new Date()}

                                        />
                                    </div>
                                </div>
                                <div class="col-sm-4 col-md-4">
                                    <div class="form-group" >
                                        <label class="form-label" style={{ color: "black" }}>End Date</label>
                                        <DatePicker
                                            wrapperClassName="mydatepicker"
                                            selected={this.state.add.EndDate}
                                            onChange={this.handleChange1}
                                            dateFormat="MMMM d, yyyy"
                                            className="form-control"

                                        />
                                    </div>
                                </div>
                                <div class="col-sm-4 col-md-4">
                                    <div class="form-group" >
                                        <label class="form-label" style={{ color: "black" }}>Location</label>
                                        <textarea type="text" style={{ width: "60%" }} maxLength="35"
                                            className="form-control" rows="2" cols="50" name="Location" value={this.state.add.Location} onChange={this.changeHandler} />

                                    </div>
                                </div>

                                <div class="col-sm-4 col-md-4">
                                    <div class="form-group" style={{}}>
                                        <div onChange={this.setStatus.bind(this)} style={{ color: "black" }}>
                                            <label class="form-label"> Status </label>
                                            {/* <input type="text" name="PhoneNumber" value={this.state.add.Company} onChange={this.changeHandler}/>  */}

                                            <label>Active<input type="radio" value={this.state.ActiveStatus = true} name="ActiveStatus" onChange={this.changeHandler} style={{ marginLeft: "80px" }} /> </label><br />
                                            <label> InActive<input type="radio" value={this.state.ActiveStatus = false} name="ActiveStatus" onChange={this.changeHandler} style={{ marginLeft: "68.2px" }} /> </label>



                                        </div>
                                    </div>
                                </div>




                                <div className="center">
                                    <button className="btn btn-primary" type="submit" style={{ width: "10%", marginRight: "50px", marginTop: "3px", background: "blue" }} onClick={() => this.onCreateProject(this.state.ProjectName)}> Save</button>

                                    <Link to={{ pathname: './Viewproject' }}> <button className="btn btn-primary" style={{ width: "11%", height: "70%", marginRight: "50px", background: "blue" }} >Back</button></Link>
                                </div>
                                <br />
                                <br />

                            </div>
                        </div>
                    </form>
                </div>
            </body>
        )
    }
}
export default addProject;
const element = <addProject></addProject>
ReactDOM.render(element, document.getElementById("root"));