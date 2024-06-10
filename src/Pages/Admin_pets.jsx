import React, { useContext, useEffect, useState } from 'react'
import './Admin.css'
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand
} from 'mdb-react-ui-kit';
import {
  MDBCard,
  MDBCardImage,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardLink,
  MDBListGroup,
  MDBListGroupItem
} from 'mdb-react-ui-kit';

import logo from '../Components/Assets/logo1.png'
import { deletePetAPI, userPetAPI} from '../Services/allAPIs';
import { Link } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { baseUrl } from '../Services/baseUrl';
import AddPet from '../Components/AddPet';
import { addPetContextApi } from '../ContextAPI/ContextShare';
import EditPet from '../Components/EditPet';

import { editPetContextApi } from '../ContextAPI/ContextShare'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useNavigate } from 'react-router-dom';
import Footer from '../Components/Footer';


function Admin_pets() {

 // navigation
 const location = useNavigate()

 // logout

 const logout =()=>{
   sessionStorage.clear()
   location('/')
 }



  // const [centredModal, setCentredModal] = useState(false);

  // const toggleOpen = () => setCentredModal(!centredModal);

  const {addPetRes,setAddPetRes} = useContext(addPetContextApi)
  const {editPetRes,setEditPetRes} = useContext(editPetContextApi)

  
  const [userPets,setUserPet] =useState([])

  const userPet = async()=>{
    const token = sessionStorage.getItem("token")
    if(token){
      const reqHeader={
        "Content-type":"multipart/form-data",
        "Authorization":`Bearer ${token}`
      }
      try{
const result = await userPetAPI(reqHeader)
console.log(result);
setUserPet(result.data)
console.log(userPets);
      }
      catch(err){
        alert(err.message)
      }
    }
  }
  useEffect(()=>{
    userPet()
  },[addPetRes,editPetRes])



  const deletePet = async(pid)=>{
    const token = sessionStorage.getItem("token")
    if(token){
      const reqHeader={
        "Content-Type":"application/json",
        "Authorization":`Bearer ${token}`
      }
      const result = await deletePetAPI(pid,reqHeader)
      console.log(result);
      userPet()
      // toast.error("Pet Deleted Successfully")
      alert("Pet Deleted Successfully")
    }

  }
  return (


    <div>

      <MDBNavbar sticky style={{ backgroundColor: '#EDE0D4', height: '80px' }}>
        <MDBContainer fluid>
          <MDBNavbarBrand href='/'>
            <img style={{ height: '50px' }} src={logo} alt="" /><span style={{ color: 'rgba(69,34,18)' }}><b>FurEverFriends</b></span></MDBNavbarBrand>
            <button class="Btn" onClick={logout}>
  
  <div class="sign"><svg viewBox="0 0 512 512"><path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path></svg></div>
  
  <div class="text">Logout</div>
</button>

        </MDBContainer>
      </MDBNavbar>
      {/* <h3>PET LIST</h3> */}
      <br /><br />
<AddPet/>

      <br /><br />
<Row>
{
  userPets.length>0?userPets.map((item)=>(
    <Col>


<MDBCard style={{height:'480px', width:'350px',backgroundColor:'#EDE0D4'}}>
      {/* <MDBCardImage position='top' alt='...' src='https://mdbootstrap.com/img/new/standard/city/062.webp' /> */}
      <img src={item?`${baseUrl}/uploads/${item.petImage}`:"empty Image"} alt=""  style={{width:'350px',height:'220px'}}/>

      <MDBCardBody>
        <MDBCardTitle><span>{item.breed} , ({item.age})</span></MDBCardTitle>
        <MDBCardText>
          {item.about}
        </MDBCardText>
        Rs. {item.cost}
      </MDBCardBody>
      
      <MDBCardBody>
        <div style={{color:'rgba(61,34,18'}}>        <p className=''>
<EditPet pets={item}/>

 <span>        <button className='btn text-white rounded-pill ' onClick={()=>deletePet(item?._id)} style={{marginLeft:'195px',backgroundColor:'rgba(61,34,18)',marginTop:'-190px'}}>DELETE</button>
</span></p></div>

            
            
      </MDBCardBody>
    </MDBCard>



    </Col>
  )):"Can't Fetch"
}
</Row>


      
<br /><br /><br />
<Link>
<center>
<Link to ={'/bookings'}>
<button className='btn btn-dark btn-lg text-white rounded-pill shadow m-4 px-3' style={{backgroundColor:'rgba(69,34,18)'}}> PET BOOKINGS</button>

</Link>
</center>
</Link>
<ToastContainer
position="top-center"
autoClose={9800}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="colored"
/>

<Footer/>
    </div>
  )
}

export default Admin_pets