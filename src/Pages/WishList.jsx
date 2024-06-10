

import React from 'react'
import { useSelector } from 'react-redux'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './User.css'
import { baseUrl } from '../Services/baseUrl';
import { addToWishlist, deleteFromWishlist } from '../Redux/Slice/wishlistSlice';
import { useDispatch } from 'react-redux'
import empty from '../Components/Assets/empty.gif'
import { addToCart } from '../Redux/Slice/cartSlice';
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand
} from 'mdb-react-ui-kit';
import logo from '../Components/Assets/logo1.png'
import { Link } from 'react-router-dom';
import Badge from 'react-bootstrap/Badge';
import Footer from '../Components/Footer';





function WishList() {
  const wishlistArray= useSelector((state)=>state.wishlistReducer)
  const dispatch = useDispatch()
  const cartArray = useSelector((state)=>state.cartReducer)

  const handleCart=(item)=>{
    // add tp cart 
    dispatch(addToCart(item))

    // to remove frm wishlist
dispatch(deleteFromWishlist(item.kciId))

  }
  return (
    <div>

<MDBNavbar sticky style={{ backgroundColor: '#EDE0D4', height: '80px' }}>
        <MDBContainer fluid>
          <MDBNavbarBrand href='/'>
            <img style={{ height: '50px' }} src={logo} alt="" /><span style={{ color: 'rgba(69,34,18)' }}><b>FurEverFriends</b></span></MDBNavbarBrand>
            {/* <div style={{marginLeft:'1070px'}}><i class="fa-solid fa-heart m-3 fa-xl" style={{color: 'red'}}></i> <span>  <i class="fa-solid fa-cart-shopping fa-xl" style={{color: '#bc294e'}}></i></span></div> */}
            <form className='d-flex ' style={{marginLeft:'1000px'}}>

              <Link to ={'/wishlist'}>
              
              <a><i class="fa-solid fa-heart m-3 fa-xl text-danger " ></i></a>
              <br />
              <Badge bg="danger" style={{marginLeft:'16px'}} >{wishlistArray.length}</Badge>

</Link>
<Link to={'/cart'}>
<a ><i class="fa-solid fa-cart-shopping fa-xl text-danger me-4 my-3"></i></a>
<br />
<Badge bg="danger" style={{marginLeft:'9px'}} >{cartArray.length}</Badge>


</Link>
            </form>
    



        </MDBContainer>
      </MDBNavbar>
      <Row>
        {
          wishlistArray.length > 0 ? wishlistArray.map((item) => (
            <Col key={item.id}>
              <section id="card1" className="card my-5">
                <img src={item ? `${baseUrl}/uploads/${item.petImage}` : "empty Image"} alt="" />
                <div className="card__content">
                  <p className="card__title">{item.breed}  ({item.age}) </p>
                  <p className="card__title">{item.gender}</p>
                  <p className="card__description">
                    {item.about}
                  </p>

                  <i onClick={() => dispatch(deleteFromWishlist(item.kciId))} className="fa-solid fa-trash mx-3 fa-xl" style={{ color: 'red' ,marginTop:'120px'}}></i>
                  <span>
                    <i onClick={()=>handleCart(item)} className="fa-solid fa-cart-shopping fa-xl" style={{ color: '#bc294e' }}></i> <br />
                    {/* <button className='btn btn-dark btn-lg text-white rounded-pill shadow m-2 px-3' style={{ backgroundColor: '#E9C46A', marginLeft: '35px' }}> BOOK NOW</button> */}

                  </span>
                </div>
              </section>
            </Col>
          )) : <div>
            <center>
            <img src={empty} alt="" />
            <Link to ={'/user'}>
            <button className='btn btn-dark btn-lg text-white rounded-pill shadow m-2 px-3' style={{ backgroundColor: '#E9C46A', marginLeft: '35px' }}> BACK TO HOME</button>

            </Link>

            </center>

          </div>
        }
      </Row>
    
      <br /><br /><br /><br />
      <Footer/>
    </div>
  )
}

export default WishList
