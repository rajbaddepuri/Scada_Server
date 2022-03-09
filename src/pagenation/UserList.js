import React from 'react';
import { Table, Button, Alert } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import "./styles.css";

class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      users: [],
      response: {},
      offset: 0,
          data: [],
          perPage: 5,
          currentPage: 0
    }
    this.handlePageClick = this
          .handlePageClick
          .bind(this);
  }



componentDidMount(){
  this.receivedData()
}




receivedData = async () => {
    const apiUrl = 'http://localhost/ScadaClient/api/userdetail?userid=0';

    await  fetch(apiUrl)
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result)
          this.setState({
            users: result
          });
          const data = this.state.users;
          console.log(data)
          const slice = data.slice(
            this.state.offset,
            this.state.offset + this.state.perPage
          );
          const postData = slice.map((data) => (
            <React.Fragment>
             
                <tr>
                  <td>{data.EmpCode}</td>
                  <td style={{color:"black"}}>{data.FirstName}</td>
                  <td style={{color:"black"}}>{data.LastName}</td>
                  <td style={{color:"black"}}>{data.Mobile}</td>
                  <td style={{color:"black"}}>{data.EmailID}</td>
                  <td style={{color:"black"}}>{data.DOB}</td>
                  <td style={{color:"black"}}>{data.Gender}</td>
                  <td style={{color:"black"}}>{data.Department}</td>
                  <td>
                    <Button variant="info" onClick={() => this.props.editProduct(data.UserID)}>Edit</Button>
                  
                  </td>
                </tr>
              
               </React.Fragment>
      ));

      this.setState({
        pageCount: Math.ceil(data.length / this.state.perPage),

        postData
      });
          console.log(this.state.users)
        },
        (error) => {
          this.setState({ error });
        }
      )
  }



 ///// pagenation
 handlePageClick = (e) => {
  const selectedPage = e.selected;
  const offset = selectedPage * this.state.perPage;

  this.setState(
    {
      currentPage: selectedPage,
      offset: offset
    },
    () => {
      this.receivedData();
    }
  );
}; 

  // deleteProduct(UserID) {
  //   const { users } = this.state;

  //   const apiUrl = 'http://localhost/ScadaWebApi/api/userdetail?UserID='+UserID;
  // //   const formData = new FormData();
  // //   formData.append('UserID', UserID);

  // //   const requestOptions = {
  // //     method: 'POST',
  // //     headers: { 'Content-Type': 'application/json' },
  // //     body: JSON.stringify(data)
  // // };
  
  // fetch(apiUrl)
  //     .then(res => res.json())
  //     .then(
  //       (result) => {
  //         this.setState({
  //           response: result,
  //           users: this.state.users.filter(user => user.UserID !== UserID)
  //         });
  //       },
  //       (error) => {
  //         this.setState({ error });
  //       }
  //     )
  // }

  render() {
    const { error, users} = this.state;

    if(error) {
      return (
        <div>Error: {error.message}</div>
      )
    } else {
      return(
        <div>
          <h2>User List</h2>
          {this.state.response.message && <Alert variant="info">{this.state.response.message}</Alert>}
        
          <Table>
          <table className="table table-hover table-vcenter text-nowrap table_custom border-style list"> 
          <table className="table table-hover table-vcenter mb-0 table_custom spacing8 text-nowrap">
                                    
            <thead style={{textAlign:"-webkit-center", backgroundColor:"#252d42"}}>
              <tr >
                <th style={{textTransform:"none", color:"#E5E5E5"}}>Employee Code</th>
                <th style={{textTransform:"none", color:"#E5E5E5"}}>First Name</th>
                <th style={{textTransform:"none", color:"#E5E5E5"}}>Last Name</th>
                <th style={{textTransform:"none", color:"#E5E5E5"}}>Phone Number</th>
                <th style={{textTransform:"none", color:"#E5E5E5"}}>Email Id</th>
                <th style={{textTransform:"none", color:"#E5E5E5"}}>Date of Birth</th>
                <th style={{textTransform:"none", color:"#E5E5E5"}}>Gender</th>
                <th style={{textTransform:"none", color:"#E5E5E5"}}>Department</th>
                <th style={{textTransform:"none", color:"#E5E5E5"}}>Action</th>
                 {/* <th style={{textTransform:"none", color:"#E5E5E5"}}>Delete</th>*/}
                                              
                                            
                                        
              </tr>
            </thead>
            <tbody>
            
              
         {this.state.postData}
            </tbody>
            </table>
            </table>
          </Table>
        
        <div class="center">
          <ReactPaginate
          previousLabel={"prev"}
          nextLabel={"next"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={this.state.pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={this.handlePageClick}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"}
        /></div>
   
        </div>
      )
    }
  }
}

export default UserList;