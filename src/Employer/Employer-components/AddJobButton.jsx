import React, { useState } from 'react'
import AddJobModal from './AddJobModal'

const AddJobButton=()=>{
  const [isModalOpen,setIsModalOpen]=useState(false)
  return(
    <div>
      <button onClick={()=>setIsModalOpen(true)} className='bg-secondary hover:bg-accent text-white font-bold py-2 px-4 rounded '
      >+ Post a job</button>
      {isModalOpen && (
        <AddJobModal 
        onClose={()=>setIsModalOpen(false)} 
        // onJobPosted={onJobPosted}
        />
      )}
    </div>
  )
}
export default AddJobButton