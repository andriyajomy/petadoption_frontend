import React, { useContext } from 'react'
import  { useEffect, useState } from 'react'

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
  import { addPetAPI} from '../Services/allAPIs';
import pic from '../Components/Assets/an.jpg'
import { addPetContextApi } from '../ContextAPI/ContextShare';



function AddPet() {
    

const {addPetRes,setAddPetRes} = useContext(addPetContextApi)
// to holf from sessionstorage
    const [token,setToken] = useState("")

    // to get token from sessionstorage
    useEffect(()=>{
        if(sessionStorage.getItem("token")){
          setToken(sessionStorage.getItem("token"))
        }
      },[])

    const [centredModal, setCentredModal] = useState(false);

    const toggleOpen = () => setCentredModal(!centredModal);
  
    
  const [projectDetails, setProjectDetails] = useState({
    kciId: "", breed: "", gender: "", age: "", about: "", cost: "", petImage: ""
  })
  //to hold image file converted into url
  const [preview,setPreview] = useState("")
  console.log(preview);

  useEffect(()=>{
    if(projectDetails.petImage){
      setPreview(URL.createObjectURL(projectDetails.petImage))
    }
  },[projectDetails.petImage])

  console.log(projectDetails);
  
  const petAdd = async()=>{
    const {kciId,breed,gender,age,about,cost,petImage} = projectDetails
    if(!kciId || !breed || !gender || !age || !about || !cost || !petImage){
      alert("Please fill the complete Details")
    }
    else{
      
      const reqBody = new FormData()
      reqBody.append("kciId",kciId)
      reqBody.append("breed",breed)
      reqBody.append("gender",gender)
      reqBody.append("age",age)
      reqBody.append("about",about)
      reqBody.append("cost",cost)
      reqBody.append("petImage",petImage)
      // let reqHeader
    
      const reqHeader ={
        "Content-Type":"multipart/form-data",  // indicates request containes image file
        "Authorization": `Bearer ${token}` // to send token from client side to the server side
      }
    
    

    // api call

    const result = await addPetAPI(reqBody,reqHeader)
    console.log(result);
    if(result.status===200){
      alert("Pet Details Added Successfully")
      setAddPetRes(result.data) // value assigned to state in the contextshare
      console.log(result.data);
      toggleOpen()
      setProjectDetails({
        kciId:"",breed:"",gender:"",age:"",about:"",cost:""
      })
      setPreview("") //image empty
    }
    else{
      console.log(result.response.data);
      alert(result.response.data)
    }
  }
  }
  return (
    <div>
 < MDBBtn rounded style={{ backgroundColor: 'rgba(69,34,18)', marginLeft:'1350px' }} onClick={toggleOpen}> ADD PET LISTING
          </MDBBtn>

<MDBModal  open={centredModal} setOpen={setCentredModal}>
        <MDBModalDialog centered>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>PET DETAILS</MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={toggleOpen}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <div className='d-flex justify-content-evenly'>
                <label>
                  <input type="file"  onChange={e => setProjectDetails({ ...projectDetails, petImage: e.target.files[0] })} style={{ display: 'none' }} />
                  <img src={preview?preview:pic} alt="" width={'250px'} height={'250px'} />
                </label>
                <div >
                  <input type="text" value={projectDetails.kciId} onChange={e => setProjectDetails({ ...projectDetails, kciId: e.target.value })} placeholder='KCI Id' className='form-control mb-3' style={{ borderRadius: '15px' }} />

                  <input type="text" value={projectDetails.breed} onChange={e => setProjectDetails({ ...projectDetails, breed: e.target.value })} placeholder='Pet Breed' className='form-control mb-3' style={{ borderRadius: '15px' }} />
                  <input type="text" value={projectDetails.gender} onChange={e => setProjectDetails({ ...projectDetails, gender: e.target.value })} placeholder='Gender' className='form-control mb-3' style={{ borderRadius: '15px' }} />
                  <input type="text" value={projectDetails.age} onChange={e => setProjectDetails({ ...projectDetails, age: e.target.value })} placeholder='Age' className='form-control mb-3' style={{ borderRadius: '15px' }} />
                  <input type="text" value={projectDetails.about} onChange={e => setProjectDetails({ ...projectDetails, about: e.target.value })} placeholder='About Pet' className='form-control mb-3' style={{ borderRadius: '15px' }} />
                  <input type="text" value={projectDetails.cost} onChange={e => setProjectDetails({ ...projectDetails, cost: e.target.value })} placeholder='Cost' className='form-control mb-3' style={{ borderRadius: '15px' }} />


                </div></div>
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn onClick={toggleOpen} rounded style={{ backgroundColor: 'rgba(69,34,18)' }}>
                Close
              </MDBBtn>
              <MDBBtn rounded style={{ backgroundColor: 'rgba(69,34,18)' }} onClick={petAdd} >Add Pet</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </div>
  )
}

export default AddPet