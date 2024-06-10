import { createSlice } from "@reduxjs/toolkit";

const cartSlice =createSlice({
    name:'cart',
    initialState:[],
    reducers:{

        // add to cart
        addToCart:((state,action)=>{
            state.push(action.payload) // contaent in the payload of action is pushed to the state
        }),
        deleteFromCart:((state,action)=>{
            return state.filter(item=>item.kciId != action.payload)
        }),
        emptyCart:((state)=>{
            return state = []
        }),
        clearCart(state) {
            state.splice(0, state.length); // Clear the cart
          },

    }
})

export const {addToCart,deleteFromCart,emptyCart,clearCart} = cartSlice.actions
export default cartSlice.reducer