import React, { useEffect, useState } from 'react'
import './User.css'
import { allPetAPI } from '../Services/allAPIs';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { baseUrl } from '../Services/baseUrl';
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand
} from 'mdb-react-ui-kit';
import logo from '../Components/Assets/logo1.png'
import { Link, useNavigate } from 'react-router-dom';
import { MDBBtn } from 'mdb-react-ui-kit';
import {useDispatch, useSelector} from 'react-redux'
import Badge from 'react-bootstrap/Badge';
import { addToWishlist, clearWishlist } from '../Redux/Slice/wishlistSlice';
import { addToCart, clearCart } from '../Redux/Slice/cartSlice';
import Footer from '../Components/Footer';



function User_pet() {



  // adding to wishlist

  const wishlistArray = useSelector((state)=>state.wishlistReducer)
  const dispatch = useDispatch()

 const handleAddToWishlist =(item)=>{
  // check if product is available on wishlist

  const isPet = wishlistArray.some((wishlistItem)=>wishlistItem.kciId ==item.kciId)
  if(isPet){
    alert("Pet already added to wishlist")
  }
  else{
    dispatch(addToWishlist(item))
  }
 }
 


  
// add to cart

const cartArray = useSelector((state)=>state.cartReducer)

  // navigation
  const location = useNavigate()

  // logout

  const logout =()=>{
    sessionStorage.clear()
    dispatch(clearWishlist()); // Clear wishlist
    dispatch(clearCart()); // Clear cart
    location('/')
  }



// to hold search value from the input box

const [searchkey,setSearchKey] =useState("")
console.log(searchkey);

// to hold all the pets details

const [allPets,setAllpets] = useState([])

  // api call function to get all pets

  const getAllPets = async()=>{
    const result = await allPetAPI(searchkey)
    console.log(result);
    if(result.status===200){
      setAllpets(result.data)
      console.log(allPets);
    }
    else{
      console.log("Api fetching failed");
    }
  }
  useEffect(()=>{
    getAllPets()
  },[searchkey])
  const existingUser =JSON.parse(sessionStorage.getItem("existingUser"))
  console.log(existingUser);
  return (
    <div>
        <MDBNavbar sticky style={{ backgroundColor: '#EDE0D4', height: '80px' }}>
        <MDBContainer fluid>
          <MDBNavbarBrand href='/'>
            <img style={{ height: '50px' }} src={logo} alt="" /><span style={{ color: 'rgba(69,34,18)' }}><b>FurEverFriends</b></span></MDBNavbarBrand>
            {/* <div style={{marginLeft:'1070px'}}><i class="fa-solid fa-heart m-3 fa-xl" style={{color: 'red'}}></i> <span>  <i class="fa-solid fa-cart-shopping fa-xl" style={{color: '#bc294e'}}></i></span></div> */}
            <form className='d-flex ' style={{marginLeft:'1090px'}}>

              <Link to ={'/wishlist'}>
              
              <a><i class="fa-solid fa-heart fa-xl m-3 text-danger " ></i></a>
              <br />
              <Badge bg="danger" style={{marginLeft:'18px'}} >{wishlistArray.length}</Badge>

</Link>
{/* <Link to={'/cart'}>
<a ><i class="fa-solid fa-cart-shopping fa-xl text-danger me-4 my-3"></i></a>
<br />
<Badge bg="danger" style={{marginLeft:'9px'}} >{cartArray.length}</Badge>


</Link> */}
            </form>
            <button class="Btn" onClick={logout}>
  
  <div class="sign"><svg viewBox="0 0 512 512"><path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path></svg></div>
  
  <div class="text">Logout</div>
</button>



        </MDBContainer>
      </MDBNavbar>

      <div className="m-5">
      <div className="m-5">
<h2 className='m-5'>Welcome<span> {existingUser?.username}</span></h2>

<h4> Choose the Companion of your Wish </h4>
<center>
<div class="group">
  <svg viewBox="0 0 24 24" aria-hidden="true" class="icon">
    <g>
      <path
        d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"
      ></path>
    </g>
  </svg>
  <input class="input" type="search" placeholder="Search breed of your wish" onChange={e=>setSearchKey(e.target.value)}/>
</div>
</center>
</div>
      </div>

<Row>
  {
    allPets.length>0? allPets.map((item,index)=>(
      <Col>
       <section id="card1" class="card" >
 <img src={item?`${baseUrl}/uploads/${item.petImage}`:"empty Image"} alt="" />
  <div class="card__content">
    <p class="card__title">{item.breed}  ({item.age}) </p>
    <p class="card__title">{item.gender}</p>
    <p class="card__description">
      {item.about}
    </p>
    
  <a ><i onClick={()=> handleAddToWishlist(item)} class="fa-solid fa-heart fa-xl" style={{color: 'red',marginTop:'100px'}}></i></a> 
  {/* <span>  <i onClick={()=>dispatch(addToCart(item))} class="fa-solid fa-cart-shopping fa-xl" style={{color: '#bc294e'}}></i>  <br />   */}
   {/* <button className='btn btn-dark btn-lg text-white rounded-pill shadow m-2 px-3' style={{backgroundColor:'#E9C46A',marginLeft:'35px'}}> BOOK NOW</button> */}

{/* </span> */}
{/* <MDBBtn rounded color='warning'> <i class="fa-solid fa-heart  fa-xl" style={{color: 'red'}}></i></MDBBtn>
      <MDBBtn rounded className='mx-2'color='warning' >
      <i class="fa-solid fa-cart-shopping fa-xl" style={{color: '#bc294e'}}></i> 
      </MDBBtn>
      <MDBBtn rounded color='warning'>
        Take Home
      </MDBBtn> */}

  </div>

</section>
      </Col>
    )): <div> No Project Found</div>
  }
  
</Row>

<Footer/>

    </div>
  )
}

export default User_pet