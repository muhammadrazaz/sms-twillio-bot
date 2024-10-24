import React, { useContext, useEffect } from 'react'
import './RightBar.css'
// import { RightBarContext } from '../../Context/RightBarContext'
export default function RightBar(props) {
  // const { rightBarCheckBox, setRightBarCheckBox, rightBarChildren, setRightBarChildren,rightBarTitle,setRightBarTitle } = useContext(RightBarContext)
  const closeRightBar = () => {
    // setRightBarCheckBox(false)
    // setRightBarChildren(null)
    // setRightBarTitle()
  }
  useEffect(() => {
    console.log(props, 'pros')
  }, [props.rightCheckbox])
  return (


    <>
    <div>{props.rightCheckbox}</div>
      <input type="checkbox" name="right-bar-checkbox" id="" className='right-bar-checkbox' value={props.rightCheckbox} checked={props.rightCheckbox} />
      <div>


      </div>
      <div className='right-bar-box'>
        <div className='d-flex align-items-center justify-content-between p-3 noto-sans-font semibold-font top-div' >
          <p >{'rightBarTitle'}</p>
          <button id='close-btn' onClick={closeRightBar}><i className="ti ti-x d-inline-block"></i></button>
        </div>
        <div className='p-3'>

          {props.children}
        </div>
      </div>
    </>

  )
}
