import React, { createContext, useState } from 'react'


export const addPetContextApi = createContext()
export const editPetContextApi = createContext()




function ContextShare({children}) {
    const [addPetRes,setAddPetRes] = useState("")
    const [editPetRes,setEditPetRes] = useState("")
    // TO access this state for everyone we provide it

  return (
    <div>
        <addPetContextApi.Provider value={{addPetRes,setAddPetRes}}>
<editPetContextApi.Provider value={{editPetRes,setEditPetRes}} >


        {/* this state is passed as object to the addpet component */}
        {children}
        </editPetContextApi.Provider>
        </addPetContextApi.Provider>
    </div>
  )
}

export default ContextShare