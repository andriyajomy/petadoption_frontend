// all api calls
 import {baseUrl} from "./baseUrl"
 import { commonAPI } from "./commonAPI"


 // register api call

 export const registerAPI = async(user)=>{
    return await commonAPI("post",`${baseUrl}/register`,user,"")
 }

 // login api call

 export const loginAPI = async(user)=>{
   return await commonAPI("post",`${baseUrl}/login`,user,"")
}

// add pet api call

export const addPetAPI = async(reqBody,reqHeader)=>{
   return await commonAPI("post",`${baseUrl}/pet/add`,reqBody,reqHeader)
   // header to hold token ..token is passed from front to back and also passes that there ia file type data(image)
   
}

// get Home pet api call  (before login no jwtmiddleware)
// no reqHeader because no need to check token
export const homePetAPI = async()=>{
   return await commonAPI("get",`${baseUrl}/pet/home-pet`,"","")


}

// get all petsapi call

export const allPetAPI = async(searchKey)=>{
   return await commonAPI("get",`${baseUrl}/pet/all-pet?search=${searchKey}`,"","")
}

// get all userproject api admin side

export const userPetAPI = async(reqHeader)=>{
   return await commonAPI("get",`${baseUrl}/pet/admin-added-pets`,"",reqHeader)
}

// updaTe pet api

export const updatePetAPI = async(petId,reqBody,reqHeader) =>{
   return await commonAPI("put",`${baseUrl}/pet/update-pet/${petId}`,reqBody,reqHeader)
}

// delete pet api

export const deletePetAPI = async(petId,reqHeader)=>{
   return await commonAPI("delete",`${baseUrl}/pet/delete-pet/${petId}`,{},reqHeader)
}

// add booking api

export const addBookingAPI = async(reqBody,reqHeader) =>{
   return await commonAPI("post",`${baseUrl}/booking/add`,reqBody,reqHeader)
}

// get user booking api

export const userBookingAPI = async()=>{
   return await commonAPI("get",`${baseUrl}/booking/get`,"","")
}