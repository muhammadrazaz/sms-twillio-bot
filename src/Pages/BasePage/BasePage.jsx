import React, { useState } from 'react'
import './BasePage.css'
import SideBar from '../../Components/SideBar/SideBar'
import TopBar from '../../Components/TopBar/TopBar';
import RightBar from '../../Components/RightBar/RightBar';

export default function BasePage({ children }) {


    const [isChecked, setIsChecked] = useState(false);
    const sidebarRef = useState(null)
    const handleSideBarMouseEnter = () => {
        if (sidebarRef.current) {

            if (isChecked) {

                sidebarRef.current.style.setProperty('width', '245px');
                document.documentElement.style.setProperty('--side-bar-arrow-opacity', 1)
                const optionTexts = document.getElementsByClassName('option-text');
                for (let i = 0; i < optionTexts.length; i++) {
                    optionTexts[i].style.opacity = '1';
                }

            }
        }


    }

    const handleSideBarMouseLeave = () => {
        if (isChecked) {
            if (isChecked) {

                sidebarRef.current.style.setProperty('width', '70px');
                document.documentElement.style.setProperty('--side-bar-arrow-opacity', 0)
                const optionTexts = document.getElementsByClassName('option-text');
                for (let i = 0; i < optionTexts.length; i++) {
                    optionTexts[i].style.opacity = '0';
                }

            }


        }

    }
    return (
        <div id='base-page' className='position-relative'>
            <div id="side-bar-container" className='' onMouseEnter={handleSideBarMouseEnter} onMouseLeave={handleSideBarMouseLeave} ref={sidebarRef}>
                <SideBar isChecked={isChecked} setIsChecked={setIsChecked} />
            </div>

            <div id="right-side-container">
                <div id="top-bar-container">
                    <TopBar />
                </div>
                <div id="content-container" className='p-4'>
                    {children}

                </div>
            </div>
            {/* <RightBar/> */}
        </div>
    )
}
