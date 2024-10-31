import React, { useEffect, useState } from 'react'
import './BasePage.css'
import SideBar from '../../Components/SideBar/SideBar'
import TopBar from '../../Components/TopBar/TopBar';
import { useApi } from '../../Provider/ApiProvider';
import Loader from '../../Components/Loader/Loader';
export default function BasePage({ children }) {

    const {apiCounter} = useApi()
    const [isChecked, setIsChecked] = useState(false);
    const [loader,setLoader] = useState(false)
    const sidebarRef = useState(null)


    useEffect(()=>{
        if(apiCounter>0){
            setLoader(true)
        }
        else{
            setLoader(false)
        }
    },[apiCounter])
    const handleSideBarMouseEnter = () => {
        if (sidebarRef.current) {

            if (isChecked) {

                sidebarRef.current.style.setProperty('width', '245px');
                document.documentElement.style.setProperty('--side-bar-arrow-opacity', 1)
                const optionTexts = document.getElementsByClassName('option-text');
                for (let i = 0; i < optionTexts.length; i++) {
                    // optionTexts[i].style.display = 'inline'
                    // setTimeout(()=>{
                        optionTexts[i].style.opacity = '1';
                        optionTexts[i].style.marginLeft = '10px';
                        
                    // },[1])
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
                    optionTexts[i].style.width = '0px'
                    optionTexts[i].style.marginLeft = '0px'
                    // setTimeout(()=>{
                    //     optionTexts[i].style.display = 'none'
                    // },[800])
                }

            }


        }

    }
    return (
        <div id='base-page' className='position-relative'>
            {loader && <Loader/>}
            <div id="side-bar-container" className='' onMouseEnter={handleSideBarMouseEnter} onMouseLeave={handleSideBarMouseLeave} ref={sidebarRef}>
                <SideBar isChecked={isChecked} setIsChecked={setIsChecked} />
            </div>

            <div id="right-side-container">
                <div id="top-bar-container">
                    <TopBar setIsChecked={setIsChecked}/>
                </div>
                <div id="content-container" className='p-4'>
                    {children}

                </div>
            </div>
            {/* <RightBar/> */}
        </div>
    )
}
