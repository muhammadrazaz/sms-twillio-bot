import React, { useContext, useEffect } from 'react'
import './RightBarForm.css'
import { RightBarContext } from '../../Context/RightBarContext'
export default function RightBarForm(props) {
  const {setRightBarCheckBox,setRightBarChildren,setRightBarTitle} = useContext(RightBarContext)


  useEffect(()=>{
    console.log('---------------------')
  },[props.formData])
  
  const closeRightBar = () => {
    setRightBarCheckBox(false)
    setRightBarChildren(null)
    setRightBarTitle()
  }
  return (
    <form id='right-bar-form' onSubmit={(e)=>{e.preventDefault();props.onSubmit(props.formData)}}>
      {props.children}
      <div className="btn-div">
      
          <button className='cancel-btn' type='button' onClick={closeRightBar}>
            Cancel
          </button>

          <button className='save-btn'>
            Save Changes
          </button>
        
      </div>
      <button onClick={()=>{test('test')}} type='button'>test</button>
       </form>
  )
}
