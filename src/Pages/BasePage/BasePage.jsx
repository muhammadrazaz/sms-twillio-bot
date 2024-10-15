import React, { useState } from 'react'
import './BasePage.css'
import SideBar from '../../Components/SideBar/SideBar'
export default function BasePage() {
    const [isChecked, setIsChecked] = useState(false);
    const sidebarRef = useState(null)
    const handleSideBarMouseEnter = () => {
        if(sidebarRef.current){

            if (isChecked) {
             
                sidebarRef.current.style.setProperty('width', '245px');
                document.documentElement.style.setProperty('--side-bar-arrow-opacity', 1)
            
            }
        }
        

    }

    const handleSideBarMouseLeave = () => {
        if (isChecked) {
            if (isChecked) {
             
                sidebarRef.current.style.setProperty('width', '75px');
                document.documentElement.style.setProperty('--side-bar-arrow-opacity', 0)
            
            }
            
           
        }

    }
  return (
    <div id='base-page' className='position-relative'>
        <div id="side-bar-container" className='' onMouseEnter={handleSideBarMouseEnter} onMouseLeave={handleSideBarMouseLeave} ref={sidebarRef}>
            <SideBar isChecked={isChecked} setIsChecked = {setIsChecked}/>
        </div>

        <div id="right-side-container">
            <div id="top-bar-container">
                top bar
            </div>
            <div id="content-container">
                this content
            </div>
        </div>

    </div>
  )
}
