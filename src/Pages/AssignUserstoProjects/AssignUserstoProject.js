import React from 'react';
import ReactDOM from 'react-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios"
import { Hint } from "react-autocomplete-hint";
import * as moment from 'moment';
import Select from 'react-select'
import "./styles.css";
import IP from "../Utiltys";





class AssignUserstoProject extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            UserDetails: [],
            setHintData: [],
            setHintId: [],
            UserData: [],
            ProjectrData: [],
            UsertoProjectData: [],
            setHintData1: [],
            RMID: "",
            RMID1: "",
            UserErr: "",
            ProjectnameErr: "",
            add: {
                UserFullName: "",
                ProjectName: "",
                ProjectID: [],
                Description: "",
                UserID: [],
                RoleID: [],
                ActiveStatus: '',
                InsertedDate: null,
                AssignedFrom: null,
                AssignedTo: null,
                AssignedFrom: null,
                AssignedTo: null,
                option: "",

            }
        };

    }
    componentDidMount() {
        this.getData();
        this.getProjectData();
        this.getUsersAssigntoProjectData();
    }
    getData = async () => {
        const res = await axios.get(
            "http://"+IP+"/ScadaClient/api/userdetail?userid=0"
        );
        // console.log(res);
        var hintArray = [];


        res.data.map((a) => hintArray.push({ value: a.FirstName + " " + a.LastName, label: a.FirstName + " " + a.LastName }));

        this.setState({ UserData: res.data })
        this.setState({ setHintData: hintArray });

        //console.log(this.state.setHintData)




    };
    getProjectData = async () => {
        const res = await axios.get(
            "http://"+IP+"/ScadaClient/api/ProjectDetails"
        );
        //console.log(res);
        var hintArray = [];
        console.log(res.data)

        res.data.map((a) => hintArray.push({ value: a.ProjectName, label: a.ProjectName }));

        this.setState({ ProjectrData: res.data })
        this.setState({ setHintData1: hintArray });

        //console.log(this.state.setHintData)
    };


    getUsersAssigntoProjectData = async () => {
        const res = await axios.get(
            "http://"+IP+"/ScadaClient/api/UsersMapToProjects"
        );


        this.setState({
            UsertoProjectData: res.data
        }, () => {
            console.log(this.state.UsertoProjectData)
        })


    };
    changeHandler = e => {
        console.log(e)
        const name = e.target.name;
        const value = e.target.value;
        console.log(name)
        console.log(value)



        this.setState({
            add: {
                ...this.state.add,
                [name]: value
            }
        });
    }
    handleChange2(e) {
        //console.log(e.label);
        this.state.UserData.map((user) => {
            var Users = user.FirstName + " " + user.LastName

            if (Users.toUpperCase() == e.label.toUpperCase()) {
                console.log(user.UserID)
                this.setState({
                    RMID: user.UserID
                })


            }

        })
        this.setState({
            add: {
                ...this.state.add,
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
            add: {
                ...this.state.add,
                ProjectName: e.label
            }
        });


    }

    handleChange = date => {
        console.log(date)
        this.setState({
            add: {
                ...this.state.add,
                AssignedFrom: date
            }
        });
    }
    handleChange1 = date => {
        console.log(date)
        this.setState({
            add: {
                ...this.state.add,
                AssignedTo: date
            }
        });
    }


    handleVAlidations() {


        let validUser = false;
        let validProject = false;
        let validUsertoProject = false;

        //Reporting Manager Validations 
        if (this.state.add.UserFullName !== null) {
            this.state.UserData.map((user) => {
                // var Users = user.FirstName+" "+user.LastName
                var value = this.state.add.UserFullName

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
        if (this.state.add.ProjectName !== null) {
            this.state.ProjectrData.map((user) => {
                // var Users = user.FirstName+" "+user.LastName
                var value = this.state.add.ProjectName

                console.log(value)
                if (user.ProjectName.toUpperCase() == value.toUpperCase()) {
                    console.log("rm validation Success")
                    validProject = true;
                }
                //
            });
        }


        if (this.state.add.ProjectID !== null && this.state.add.UserID !== null) {


            this.state.UsertoProjectData.map((temp) => {
                // var Users = user.FirstName+" "+user.LastName
                var value = this.state.add.ProjectID
                var value1 = this.state.add.UserID



                if (temp.ProjectID == value && temp.UserID == value1) {
                    console.log("rm validation Success")
                    console.log(value)
                    console.log(value1)
                    console.log(temp.ProjectID)
                    console.log(temp.UserID)
                    validUsertoProject = true;
                }
                //
            });
        }

        ////console.log(formIsValid)
        return { validUser, validProject, validUsertoProject };

    }



    submitHandler = e => {
        e.preventDefault()
        console.log(this.state.RMID)
        this.setState({
            add: {
                ...this.state.add,
                UserID: this.state.RMID,
                ProjectID: this.state.RMID1
            }
        }, () => {
            console.log(this.state.add)
            var { validUser, validProject, validUsertoProject } = this.handleVAlidations();
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
            if (validUsertoProject) {
                alert("Already User Assign to same Project")

            }

            if (validUser && validProject && !validUsertoProject) {
                var s = this.state.add
                const convertedstartdate = moment(s.AssignedFrom).format('MM/DD/YYYY');
                s.AssignedFrom = convertedstartdate.toString();
                const convertedDate = moment(s.AssignedTo).format('MM/DD/YYYY');
                s.AssignedTo = convertedDate.toString()
                this.setState({
                    add: s
                }, () => {
                    console.log('after Converting ')
                    console.log(this.state.add)
                })

                console.log(this.state.add)
                const apiUrl = 'http://'+IP+'/ScadaClient/api/UsersMapToProjects';
                const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(this.state.add)
                };

                fetch(apiUrl, requestOptions)
                    .then(res => res.json())
                    .then(result => {
                        this.setState({
                            response: result,
                            isAddProduct: false,
                            isEditProduct: false
                        })
                    },
                        (error) => {
                            this.setState({ error });
                        }
                    )
                this.props.history.push('/AssignUserToProjectsList')
                window.location.reload()

            }
        })

    }
    setGender(event) {
        //console.log(event.target.value);

    }

    setStatus(event) {
        //console.log(event.target.value);
    }

    onCreateProject = () => {
        console.log(this.state.add);
    }
    onClick() {
        window.location.reload();
    }




    render() {
        return (
            <body className="font-montserrat">
                <div className="page">


                   

                            <div className="section-body">


                                <ul class="nav nav-tabs page-header-tab">
                                    {localStorage.getItem("Admin") ?
                                        <li class="nav-item"> <a href="/AssignUserstoProject" class="nav-link active show">Assign User To Project</a></li>
                                        : ""
                                    }
                                    <li class="nav-item"> <a href="/AssignUserToProjectsList" class="nav-link inactive show">Assign User To Projects LIst</a></li>



                                </ul>

                            </div>


                                    <br/>
                                    <br/>

                            <form onSubmit={this.submitHandler} >
                                <div class="card-body" class="container" style={{ height: "500px", background: 'white', borderRadius: '10px' }}>


                                    <div class="row clearfix" style={{ marginTop: "10px" }}>
                                        <div class="col-sm-12">


                                            <h4>Assign User to Project Details: </h4>
                                            <hr></hr>
                                        </div>

                                        <div className="row clearfix row-deck">
                                            <div className="col-xl-4 col-lg-5 col-md-6">
                                                <div class="form-group" style={{ width: "70%" }}>
                                                    <label class="form-label" style={{ color: "black" }}>User <span style={{ fontWeight: "bold", color: "red" }} >*</span></label>


                                                    <Select
                                                        options={this.state.setHintData}
                                                        onChange={this.handleChange2.bind(this)}
                                                        selectProps={this.state.add.Descriptionors}

                                                    />
                                                    <span style={{ fontWeight: "", color: "red" }}>{this.state.UserErr}</span>


                                                </div>
                                            </div>
                                            <div className="col-xl-4 col-lg-5 col-md-6">
                                                <div class="form-group" style={{ width: "70%" }}>
                                                    <label class="form-label" style={{ color: "black" }}>Project Name <span style={{ fontWeight: "bold", color: "red" }} >*</span></label>
                                                    <Select
                                                        options={this.state.setHintData1}
                                                        onChange={this.handleChange3.bind(this)}

                                                    />
                                                    <span style={{ fontWeight: "", color: "red" }}>{this.state.ProjectnameErr}</span>


                                                </div>
                                            </div>
                                            <div className="col-xl-4 col-lg-5 col-md-6">
                                                <div class="form-group" style={{ width: "88%" }}>
                                                    <label class="form-label" style={{ color: "black" }}>Designation</label>
                                                    <select name="RoleID" style={{ width: "80%" }}

                                                        className="form-control" style={{ width: "80%" }} value={this.state.add.RoleID} onChange={this.changeHandler}>
                                                        <option value=""></option>
                                                        <option value="1">Team Member</option>
                                                        <option value="2">Team Lead</option>
                                                        <option value="3">Project Manager</option>
                                                        <option value="4">Delivery Head</option>
                                                        <option value="5">Director</option>

                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-xl-4 col-lg-5 col-md-6">
                                                <div class="form-group" style={{ width: "88%" }}>
                                                    <label class="form-label" style={{ color: "black" }}>Description</label>
                                                    <input type="textarea" size="30" style={{ width: "80%" }} maxLength="50"
                                                        className="form-control" name="Description" value={this.state.add.Description} onChange={this.changeHandler} />

                                                </div>
                                            </div>
                                            <div className="col-xl-4 col-lg-5 col-md-6">
                                                <div class="form-group" style={{ width: "80%" }}>
                                                    <label class="form-label" style={{ color: "black", }}>Assign From</label>
                                                    <DatePicker
                                                        wrapperClassName="datepicker1"
                                                        class="react-datepicker__navigation react-datepicker__navigation--next"
                                                        minlength="4" maxlength="12"
                                                        className="form-control"
                                                        autoComplete="off"
                                                        selected={this.state.add.AssignedFrom}
                                                        onChange={this.handleChange}
                                                        name="DOB"
                                                        dateFormat="MM/dd/yyyy"

                                                        maxDate={new Date()}
                                                    /></div>

                                            </div>
                                            <div className="col-xl-4 col-lg-5 col-md-6">
                                                <div class="form-group" style={{ width: "80%" }}>
                                                    <label class="form-label" style={{ color: "black" }}>Assign To</label>
                                                    <DatePicker
                                                        wrapperClassName="datepicker1"
                                                        minlength="4" maxlength="12"
                                                        className="form-control"
                                                        autoComplete="off"
                                                        selected={this.state.add.AssignedTo}
                                                        onChange={this.handleChange1}
                                                        name="DOB"
                                                        dateFormat="MM/dd/yyyy"

                                                    />
                                                </div>
                                            </div>
                                            <div className="col-xl-4 col-lg-5 col-md-6">
                                                <div class="form-group" style={{ width: "50%" }}>
                                                    <div onChange={this.setStatus.bind(this)} style={{ color: "black" }}>
                                                        <label class="form-label"> Status </label>
                                                        {/* <input type="text" name="PhoneNumber" value={this.state.add.Company} onChange={this.changeHandler}/>  */}
                                                        <label>Active<input type="radio" value={this.state.ActiveStatus = true} name="ActiveStatus" onChange={this.changeHandler} style={{ marginLeft: "80px" }} /> </label>
                                                        <br />
                                                        <label>InActive<input type="radio" value={this.state.ActiveStatus = false} name="ActiveStatus" onChange={this.changeHandler} style={{ marginLeft: "68px" }} /> </label>

                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                        <div className="center">

                                            <button className="btn btn-primary" type="submit" style={{ width: "8%", marginRight: "50px", marginTop: "3px", background: "blue" }} onClick={this.onCreateProject}> Save</button>

                                            <button className="btn btn-primary" style={{ width: "8%", marginRight: "50px", background: "blue" }} onClick={this.onClick} ><a href="AssignUserToProjectsList">Back</a></button>
                                        </div>
                                    </div>
                                </div>
                            </form>

              
                </div>

            </body>
        )
    }
}
export default AssignUserstoProject;
const element = <AssignUserstoProject></AssignUserstoProject>
ReactDOM.render(element, document.getElementById("root"));