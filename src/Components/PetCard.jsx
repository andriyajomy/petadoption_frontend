import React, { useState } from 'react'
import './PetCard.css'
import { baseUrl } from '../Services/baseUrl';
import {
    MDBBtn,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
  } from 'mdb-react-ui-kit';
  

  

function PetCard({petinfo}) {

    const [centredModal, setCentredModal] = useState(false);

    const toggleOpen = () => setCentredModal(!centredModal);

    console.log(petinfo);
  return (
    <div>
        <div className="card">
  <div className="card-details">
    <img src={petinfo?`${baseUrl}/uploads/${petinfo.petImage}`:"empty Image"} alt="" />
    <p className="text-body">{petinfo.breed}</p>
  </div>
  <button className="card-button" onClick={toggleOpen} >More info</button>
</div>

{/* <MDBBtn onClick={toggleOpen}>Vertically centered modal</MDBBtn> */}

      <MDBModal tabIndex='-1' open={centredModal} setOpen={setCentredModal}>
        <MDBModalDialog centered>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>{petinfo.breed}</MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={toggleOpen}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
            


              <div className='d-flex justify-content-evenly'>
              
              <img src={petinfo?`${baseUrl}/uploads/${petinfo.petImage}`:"empty Image"} alt="" />

              <div className='mx-3'>
              <h2> <b>Breed :</b> {petinfo.breed}</h2>
              <h5><b>Gender :</b> {petinfo.gender}</h5>
              <h5><b>Age :</b> {petinfo.age}</h5>
              <h5><b>About:</b> {petinfo.about}</h5>
              <h5><b>Cost : $</b> {petinfo.cost}</h5>


              </div>
              


              </div>

            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn color='secondary' onClick={toggleOpen}>
                Close
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </div>
  )
}

export default PetCard