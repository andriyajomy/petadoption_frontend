import React, { useContext } from 'react'
import { useEffect, useState } from 'react'
// import pic from '../Components/Assets/an.jpg'
import {
  MDBBtn
 
} from 'mdb-react-ui-kit';
import Modal from 'react-bootstrap/Modal';

import {baseUrl} from '../Services/baseUrl'
import { updatePetAPI } from '../Services/allAPIs';
import { editPetContextApi } from '../ContextAPI/ContextShare'; 


function EditPet({ pets }) {
  const {editPetRes,setEditPetRes} = useContext(editPetContextApi)
  console.log(pets);


  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [projectDetails, setProjectDetails] = useState({
    id: pets._id,
    kciId: pets.kciId, breed: pets.breed, gender: pets.gender, age: pets.age, about: pets.about, cost: pets.cost, petImage: ""
  })
  //to hold image file converted into url
  const [preview, setPreview] = useState("")
  console.log(preview);

  useEffect(() => {
    if (projectDetails.petImage) {
      setPreview(URL.createObjectURL(projectDetails.petImage))
    }
  }, [projectDetails.petImage])

  console.log(projectDetails);

  const updatePet = async()=>{
    const {id,kciId,breed,gender,age,about,cost,petImage} = projectDetails
    // if(!kciId || !breed || !gender || !age || !about || !cost || !petImage){
    //   alert("Please fill the complete Details")
    // }
    // else{
 
      const reqBody = new FormData()
      reqBody.append("kciId",kciId)
      reqBody.append("breed",breed)
      reqBody.append("gender",gender)
      reqBody.append("age",age)
      reqBody.append("about",about)
      reqBody.append("cost",cost)
      preview?reqBody.append("petImage",petImage):reqBody.append("petImage",pets.petImage)
    

    // get token

    const token = sessionStorage.getItem("token")
    console.log(token);
    if(preview){
      const reqHeader = {
        "Content-Type" : "multipart/form-data",
        "Authorization" :`Bearer ${token}`
      }

      // api call
const result = await updatePetAPI(id,reqBody,reqHeader)
console.log(result);
      if(result.status==200){
        console.log(result.data);
        setEditPetRes(result.data)
        alert("Pet Details Updated Successfully")
        handleClose()
      }
      else{
        console.log(result.response.data);
      }
    }
    else{
      const reqHeader = {
        "Content-Type" : "application/json",
        "Authorization" :`Bearer ${token}`
      }

      // api call
const result = await updatePetAPI(id,reqBody,reqHeader)
console.log(result);
      if(result.status==200){
        console.log(result.data);
        setEditPetRes(result.data)
        alert("Pet Details Updated Successfully")
        handleClose()
      }
      else{
        console.log(result.response.data);
      }
    }
  // }
  }

console.log(projectDetails);
  return (
    <div>
      <p onClick={handleShow}>
        <i class="fa-solid fa-pen  " style={{ color: ' rgba(61,34,48)',marginTop:'-10px' }} ></i>

      </p>

 
              <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size={'lg'}
      >
        <Modal.Header closeButton>
          <Modal.Title>Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
              <div className='d-flex justify-content-evenly'>
                <label>
                  <input type="file" onChange={e => setProjectDetails({ ...projectDetails, petImage: e.target.files[0] })} style={{ display: 'none' }} />
                  <img src={preview ? preview : `${baseUrl}/uploads/${pets.petImage}`} alt="" width={'250px'} height={'250px'} />
                </label>
                <div >
                  <input type="text" value={projectDetails.kciId} onChange={e => setProjectDetails({ ...projectDetails, kciId: e.target.value })} placeholder='KCI Id' className='form-control mb-3' style={{ borderRadius: '15px' }} />

                  <input type="text" value={projectDetails.breed} onChange={e => setProjectDetails({ ...projectDetails, breed: e.target.value })} placeholder='Pet Breed' className='form-control mb-3' style={{ borderRadius: '15px' }} />
                  <input type="text" value={projectDetails.gender} onChange={e => setProjectDetails({ ...projectDetails, gender: e.target.value })} placeholder='Gender' className='form-control mb-3' style={{ borderRadius: '15px' }} />
                  <input type="text" value={projectDetails.age} onChange={e => setProjectDetails({ ...projectDetails, age: e.target.value })} placeholder='Age' className='form-control mb-3' style={{ borderRadius: '15px' }} />
                  <input type="text" value={projectDetails.about} onChange={e => setProjectDetails({ ...projectDetails, about: e.target.value })} placeholder='About Pet' className='form-control mb-3' style={{ borderRadius: '15px' }} />
                  <input type="text" value={projectDetails.cost} onChange={e => setProjectDetails({ ...projectDetails, cost: e.target.value })} placeholder='Cost' className='form-control mb-3' style={{ borderRadius: '15px' }} />


                </div></div>
                </Modal.Body>
            <Modal.Footer>
              <MDBBtn onClick={handleClose} rounded style={{ backgroundColor: 'rgba(69,34,18)' }}>
                Close
              </MDBBtn>
              <MDBBtn rounded style={{ backgroundColor: 'rgba(69,34,18)' }} onClick={updatePet} > Update Pet Details</MDBBtn>
            </Modal.Footer>
         
      </Modal>
    </div>
  )
}

export default EditPet





