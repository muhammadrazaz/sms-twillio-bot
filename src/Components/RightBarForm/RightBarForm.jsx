import React, { useEffect } from 'react'
import './RightBarForm.css'
import { useRightBar } from '../../Provider/RightBarProvider'
export default function RightBarForm(props) {
  const {setRightBarCheckbox} = useRightBar()
    const closeRightBar = () =>{
      setRightBarCheckbox(false)
      }
  return (
    <form id='right-bar-form' onSubmit={props.onSubmit}>
      {props.children}
      <div className="btn-div">
      
          <button className='cancel-btn' type='button' onClick={closeRightBar}>
            Cancel
          </button>

          <button className='save-btn'>
            Save Changes
          </button>
        
      </div>

       </form>
  )
}
