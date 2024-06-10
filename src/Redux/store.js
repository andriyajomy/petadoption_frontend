import {configureStore} from "@reduxjs/toolkit"
import wishlistSlice from "./Slice/wishlistSlice"
import cartSlice from "./Slice/cartSlice"

const store = configureStore({
    reducer:{
wishlistReducer:wishlistSlice,
cartReducer:cartSlice
    }
})

export default store