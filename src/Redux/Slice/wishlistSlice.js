import { createSlice } from '@reduxjs/toolkit';

const wishlistSlice = createSlice({
    name:"wishlist",
    initialState:[],
    reducers:{
        // to define actions
        // adding to wishlist

        addToWishlist:((state,action)=>{
            state.push(action.payload) // contaent in the payload of action is pushed to the state
        }),
        deleteFromWishlist:((state,action)=>{
            return state.filter(item=>item.kciId != action.payload)
        }),
        clearWishlist(state) {
            state.splice(0, state.length); // Clear the wishlist
          },
    }
})

export const {addToWishlist,deleteFromWishlist,clearWishlist} = wishlistSlice.actions
export default wishlistSlice.reducer