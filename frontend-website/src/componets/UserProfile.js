import React from 'react'
import {Button, Col, Container, Modal, Row} from 'react-bootstrap'

export default function UserProfile(props) {
  const { user } = props;
  return (
    user && (
      <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter center">
            User Profile
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="show-grid">
          <Container>
            <Row>
              <Col xs={6} md={6} className="align-items-center" >
                <img alt='avt' src={user.picture.large} width="250px"></img>
                <h5 className="mt-1"> {user.name.title}. {user.name.first} {user.name.last} </h5>
              </Col>
              <Col xs={6} md={6}>
                <div className='fw-bold' >Day of Birth: </div>
                <div> {user.dob.date.split("T")[0]} </div>
                <div className='fw-bold' >Phone: </div>
                <div> {user.cell} </div>
                <div className='fw-bold' >Email: </div>
                <div> {user.email} </div>
                <div className='fw-bold' >Address: </div>
                <div className='text-capitalize'> {user.location.street.number} {user.location.street.name} , {user.location.city} , {user.location.state} , {user.location.country} </div>
                <div className='fw-bold' >Gender: </div>
                <div className='text-capitalize'> {user.gender} </div>
                <div className='fw-bold' >Nationality: </div>
                <div className='text-uppercase'> {user.nat} </div>

              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    )
  );
}