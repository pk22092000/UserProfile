import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css';
import UsersList from './componets/UsersList'
import {BrowserRouter as Link} from 'react-router-dom'
import {Button, Col, Container, Modal, Row} from 'react-bootstrap'
import "bootstrap/dist/css/bootstrap.min.css";

  
var count = 0;
var header = "";
function App() {
  const [users, setUsers] = useState([]);
  const [usersSort, setUsersSort] = useState([])
  const [gender, setGender] = useState("")

  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    axios.get("https://randomuser.me/api?results=10")
    .then(response => {
      const data = response.data.results;
      setUsers(data)
      setUsersSort(data)
    })
    .catch(error => {
      console.log(error);
    })
  }, [])

  const handleSort = (e) => {
    if(header === e.target.abbr) {
      count++;
    } else {
      count = 1
      header = e.target.abbr
    } 
    console.log("condition: " + count%3)
    switch (count%3) {
      case 0:
        var results = users.slice();
        setUsersSort(results)
        break;
      case 1:
        results = users.slice()
        results.sort( (prev, next) => {
          var header1 = header.slice(0, header.indexOf("."));
          var header2 = header.slice(header.indexOf(".") + 1, header.length);
          var userPrev;
          var userNext;
          if(header.indexOf(".") === -1) {
            userPrev = prev[header];
            userNext = next[header];
          }else{
            userPrev = prev[header1][header2];
            userNext = next[header1][header2];
          }
          console.log((userPrev))
          if (userPrev < userNext) {
            return -1;
          }
          if (userPrev > userNext) {
            return 1;
          }
          return 0;
        });
        setUsersSort(results)
        break;
      case 2:
        results = users.slice()
        results.sort( (prev, next) => {
          var header1 = header.slice(0, header.indexOf("."));
          var header2 = header.slice(header.indexOf(".") + 1, header.length);
          var userPrev;
          var userNext;
          if(header.indexOf(".") === -1) {
            userPrev = prev[header];
            userNext = next[header];
          }else{
            userPrev = prev[header1][header2];
            userNext = next[header1][header2];
          }
          console.log((userPrev))
          if (userPrev < userNext) {
            return -1;
          }
          if (userPrev > userNext) {
            return 1;
          }
          return 0;
        }).reverse();
        setUsersSort(results)
        break;
      default:
        break;
    }
  }
  return (
    <div className="grid-container">
      <header>
        <select name='gender' onChange={e => setGender(e.target.value)}>
          <option value={"all"}>All</option>
          <option value={"male"}>Male</option>
          <option value={"female"}>Female</option>
        </select>
        <Link to={"/"} >Download CVS</Link>
      </header>
      <main>
        <table>
          <thead>
            <tr>
              <th abbr='name.title' onClick={handleSort} >Title</th>
              <th abbr='name.first' onClick={handleSort} >Full Name</th>
              <th abbr='email' onClick={handleSort} >Email</th>
              <th abbr='cell'>Cell</th>
              <th abbr='gender' onClick={handleSort} >Gender</th>
              <th abbr='picture.large'>Avatar URL</th>
              <th abbr='dob.date' onClick={handleSort} >Birthyear</th>
              <th abbr='login.username' onClick={handleSort} >Username</th>
              <th abbr='location.postcode' onClick={handleSort} >Postcode</th>
              <th abbr='location.country' onClick={handleSort} >Country</th>
              <th abbr='location.state' onClick={handleSort} >State</th>
              <th abbr='location.city' onClick={handleSort} >City</th>
              <th abbr='location.street'>Street</th>
              <th abbr='location.timezone'>Timezone</th>
              <th abbr='nat' onClick={handleSort}>Nationality</th>
            </tr>
          </thead>
              <UsersList 
                users={usersSort} 
                gender={gender}
              />
        </table>

        {/* Modal */}
        <Button variant="primary" onClick={() => setModalShow(true)}>
          Launch modal with grid
        </Button>

        <MydModalWithGrid show={modalShow} onHide={() => setModalShow(false)} />
        
      </main>
      <footer>

      </footer>
    </div>
  );
}

export default App;

function MydModalWithGrid(props) {
  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Using Grid in Modal
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="show-grid">
        <Container>
          <Row>
            <Col xs={12} md={8}>
              .col-xs-12 .col-md-8
            </Col>
            <Col xs={6} md={4}>
              .col-xs-6 .col-md-4
            </Col>
          </Row>

          <Row>
            <Col xs={6} md={4}>
              .col-xs-6 .col-md-4
            </Col>
            <Col xs={6} md={4}>
              .col-xs-6 .col-md-4
            </Col>
            <Col xs={6} md={4}>
              .col-xs-6 .col-md-4
            </Col>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

