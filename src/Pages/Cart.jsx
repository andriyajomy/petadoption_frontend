

import React, { useEffect, useState } from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { baseUrl } from '../Services/baseUrl';
import { MDBBtn } from 'mdb-react-ui-kit';
import '../Pages/Cart.css'

import {
  MDBCard,
  MDBCardTitle,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol
} from 'mdb-react-ui-kit';
import { useDispatch, useSelector } from 'react-redux';
import { deleteFromCart, emptyCart } from '../Redux/Slice/cartSlice';
import empty from '../Components/Assets/empty.gif'
import { useNavigate } from 'react-router-dom';
import { addBookingAPI } from '../Services/allAPIs';
import Footer from '../Components/Footer';

import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand
} from 'mdb-react-ui-kit';
import logo from '../Components/Assets/logo1.png'
import { Link } from 'react-router-dom';


function Cart() {
  const navigate = useNavigate()
  const cartArray = useSelector((state)=>state.cartReducer)
  const dispatch = useDispatch()
  // to hold total proce of pets

  const [total,setTotal] = useState(0)
  const getCartTotal =()=>{
    if(cartArray.length >0){
      setTotal(cartArray.map(item=>parseFloat(item.cost)).reduce((c1,c2)=>c1 + c2,0))
    }
    else{
      setTotal(0)
    }
  }

  const emptyCartList =()=>{
    // alert("Order Placed Successfully")
    dispatch(emptyCart())
    // navigate('/user')
  }
  useEffect(()=>{
getCartTotal()
  },[cartArray])

  //to hold date and time details
const[bookingInputs,setBookingInputs]=useState({
  date:''
})
console.log(bookingInputs);

  // to hold token from session storage

  const [token,setToken] = useState("")

  // to get token
  useEffect(()=>{
    if(sessionStorage.getItem("token")){
      setToken(sessionStorage.getItem("token"))
    }
  },[])

  const [bookedDetails,setBookedDetails] = useState({})
console.log(bookedDetails);

useEffect(()=>{
  setBookedDetails({
    pets:cartArray,date:bookingInputs.date,totalPets:cartArray.length,totalPrice:total
  });
},[cartArray,bookingInputs,total])


const bookingAdd = async()=>{
  // api call
  const reqBody ={
    pets:bookedDetails.pets,
    date:bookedDetails.date,
    totalPets:bookedDetails.totalPets,
    totalPrice:bookedDetails.totalPrice
  }

  // let reqHeader

  const reqHeader={
    "Content-Type":"application/json",
    "Authorization":`Bearer ${token}`

  }
  const result = await addBookingAPI(reqBody,reqHeader);
console.log(result);
if(result.status===200){
  alert("Your Pet Is Booked..Please Collect your companion from the store on the booked date.")
  sessionStorage.setItem("token",result.data.token)
  console.log(result.data)
  emptyCartList()
  setBookingInputs({
    date:""
  })
} 
else{
  console.log(result.response.data);
}
}

  
  return (
    <div>


<MDBNavbar sticky style={{ backgroundColor: '#EDE0D4', height: '80px' }}>
        <MDBContainer fluid>
          <MDBNavbarBrand href='/'>
            <img style={{ height: '50px' }} src={logo} alt="" /><span style={{ color: 'rgba(69,34,18)' }}><b>FurEverFriends</b></span></MDBNavbarBrand>
            <Link to ={'/user'}>
            <button class="Btn" >
  
  <div class="sign"><svg viewBox="0 0 512 512"><path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path></svg></div>
  
  <div class="text">Back</div>
</button>
            </Link>


        </MDBContainer>
      </MDBNavbar>
      <Row>
        {
          cartArray.length > 0 ? cartArray.map((item) => (
            <Col key={item.id}>
              <MDBCard style={{ maxWidth: '540px',marginTop:'40px' }}>
                

              
                <MDBRow className='g-0'>
                  <MDBCol md='4'>
                    
                    <MDBCardImage  src={item?`${baseUrl}/uploads/${item.petImage}`:"empty Image"} alt='...' fluid />

                    

                  </MDBCol>
                  <MDBCol md='8'>
                    <MDBCardBody>
                      <MDBCardTitle>{item.breed}, [{item.age}] </MDBCardTitle>
                      <MDBCardText>
                        {item.gender}
                        <br />
                        {item.about}
                      </MDBCardText>
                      <MDBCardText>
                        <small > Rs.{item.cost}</small>
                        <br /><br />
                        {/* <MDBBtn rounded color='warning'>
        Order Now 
      </MDBBtn>  */}
      <span>   <MDBBtn rounded color='warning' onClick={() =>dispatch(deleteFromCart(item.kciId))} >  <i class="fa-solid fa-trash fa-xl text-light "></i></MDBBtn>                         
</span>
                      </MDBCardText>
                    </MDBCardBody>
                  </MDBCol>
                </MDBRow>
              </MDBCard>
            </Col>
          )) : <div><center> <img src={empty} alt="" /></center></div>
        }
      </Row>

<Row>
  <center>

<div class="container" >
  <div class="card cart" style={{backgroundColor:'rgba(237,224,212,0.5',width:'450px'}}>
    <label class="title p-2">CART SUMMARY</label>
    <div class="steps">
      <div class="step">
        <div>
          <span>Store Address</span>
          <p>221B Baker Street, W1U 8ED</p>
          <p>London, United Kingdom</p>
        </div>
        <hr/>
        <div>
        <span>Total Cart Items: </span>
          <p>{cartArray.length}</p>
        </div>
        <hr/>
        <div class="promo">
          <span>Choose PickUp Date</span>
          <form class="form">
            <input class="input_field" placeholder="Enter a pickUp Date" type="date" value={bookingInputs.date} onChange={e=>setBookingInputs({...bookingInputs,date:e.target.value})}/>
            {/* <button>Apply</button> */}
          </form>
        </div>
        <hr/>
       
        <div class="payments" >
          <span>PAYMENT</span>
          <div class="details">
            <span>Subtotal:</span>
            <span>{total}</span>
            {/* <span>Shipping:</span>
            <span>$10.00</span> */}
            {/* <span>Tax:</span>
            <span>$30.40</span> */}
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="card checkout" style={{width:'450px'}}>
    <div class="footer">
      <label class="price">Rs.{total}</label>
      <button onClick={bookingAdd} class="checkout-btn">Checkout</button>
    </div>
  </div>
</div>
</center>

</Row>

<Footer/>
      
    </div>
  )
}

export default Cart









