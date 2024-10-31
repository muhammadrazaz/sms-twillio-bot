import React, { useContext, useEffect } from 'react'
import './RightBar.css'
import { useRightBar } from '../../Provider/RightBarProvider'
export default function RightBar(props) {
  const {rightBarCheckbox,setRightBarCheckbox} = useRightBar()
  
 

  useEffect(()=>{
 
    const checkbox = document.getElementById('right-bar-checkbox')
    if(rightBarCheckbox){
      
      props.setIsFormShow(true)
      setTimeout(()=>{
        checkbox.checked =true
      },[1])
      
    }
    else{
      checkbox.checked =false
      setTimeout(()=>{
        props.setIsFormShow(false)
      },[1000])
    }

  },[rightBarCheckbox])
  const closeRightBar = () => {
    setRightBarCheckbox(false)
  }

  return (


    <>
    <div>{props.rightBarCheckbox}</div>
      <input type="checkbox" name="right-bar-checkbox" id="right-bar-checkbox" className='right-bar-checkbox d-none'   />
      <div>


      </div>
      <div className='right-bar-box'>
        <div className='d-flex align-items-center justify-content-between p-3 noto-sans-font semibold-font top-div' >
          <p >{props.rightBarTitle}</p>
          <button id='close-btn' onClick={closeRightBar}><i className="ti ti-x d-inline-block"></i></button>
        </div>
        <div className='p-3 form-box'>

          {props.children}
        </div>
      </div>
    </>

  )
}
