import React, { useEffect, useState } from 'react'
import './SideBar.css'
import logo from '../../Assets/Images/logo.svg'
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../Provider/AuthProvider';
export default function SideBar(props) {
    const { userDetail } = useAuth()

    useEffect(()=>{
        const rightContainer = document.getElementById('right-side-container')
        
        if (window.innerWidth > 768) {
        }else{
            rightContainer.style.width = '100%'
            rightContainer.style.left = 0
            const sideBarContainer = document.getElementById('side-bar-container') 
            if(props.isChecked){
                sideBarContainer.style.left = '0px'
            }
            else{
                sideBarContainer.style.left= "-245px"
            }
           
            
            
            // if(props.isChecked){
            //     sidBarContainer = document.getElementById('side-bar-container')
            //     sidBarContainer.style.left = '350px'
            // }
        }
    },[props.isChecked])


    const handleCheckboxChange = (e) => {
        props.setIsChecked(e.target.checked)
        console.log('oooooooooooooooooooo')

        if (window.innerWidth > 768) {
            console.log("The width is greater than 768px");
            if (e.target.checked) {
                document.documentElement.style.setProperty('--sidebar-width', '70px');
                document.documentElement.style.setProperty('--side-bar-arrow-opacity', 0)
                document.documentElement.style.setProperty('--side-bar-arrow-degree', '180deg')
                const optionTexts = document.getElementsByClassName('option-text');
                for (let i = 0; i < optionTexts.length; i++) {
                    optionTexts[i].style.opacity = '0';
                    // setTimeout(()=>{
                        optionTexts[i].style.width = '0px'
                        optionTexts[i].style.marginLeft = '0px'
                    // },[1000])
                }
            } else {
                document.documentElement.style.setProperty('--sidebar-width', '245px');
                document.documentElement.style.setProperty('--side-bar-arrow-opacity', 1)
                document.documentElement.style.setProperty('--side-bar-arrow-degree', '0deg')
                const optionTexts = document.getElementsByClassName('option-text');
                for (let i = 0; i < optionTexts.length; i++) {
                
                        optionTexts[i].style.opacity = '1';
                    
                }
            }
          } else {
            console.log('=====================')
          }


       
    };


    return (
        <div id='side-bar'>
            <div id='logo-container' className="d-flex align-items-center justify-content-between w-100">
                <div>
                    <img src={logo} alt="" />
                </div>
                <div id='toggle-side-bar-div'>
                    <input type="checkbox" name="" id='toggle-side-bar' className='d-none' onChange={handleCheckboxChange} checked={props.isChecked} />
                    <label id='toggle-side-bar-label' htmlFor="toggle-side-bar" className='m-0'>

                        <i className="ti ti-arrow-bar-to-left"></i>

                    </label>
                </div>

            </div>
            <div className='mt-3'>

                <NavLink to='/' className="side-bar-option p-2 my-2  d-flex align-items-center">
                    <span className='p-1 option-icon'>
                        <i className="ti ti-layout-2 "></i>
                    </span>
                    <span className='option-text sm-font noto-sans-font regular-font'>
                        Dashboard
                    </span>
                </NavLink>
                <NavLink to='/leads' className="side-bar-option p-2 my-2  d-flex align-items-center">
                    <span className='p-1 option-icon'>
                        <i className="ti ti-chart-arcs "></i>
                    </span>
                    <span className='option-text sm-font noto-sans-font regular-font'>
                        In Town
                    </span>
                </NavLink>
                <NavLink to='/shippings' className="side-bar-option p-2 my-2  d-flex align-items-center">
                    <span className='p-1 option-icon'>
                        <i className="ti ti-shopping-bag-check "></i>
                    </span>
                    <span className='option-text sm-font noto-sans-font regular-font'>
                        Shippings
                    </span>
                </NavLink>

                {
                    userDetail && userDetail.role === 'admin' && <NavLink to='/agents' className="side-bar-option p-2 my-2  d-flex align-items-center">
                        <span className='p-1 option-icon'>
                            <i className="ti ti-tournament "></i>
                        </span>
                        <span className='option-text sm-font noto-sans-font regular-font'>
                            Agents
                        </span>
                    </NavLink>
                }



                <NavLink to='/tasks' className="side-bar-option p-2 my-2  d-flex align-items-center">
                    <span className='p-1 option-icon'>
                        <i className="ti ti-list-check "></i>
                    </span>
                    <span className='option-text sm-font noto-sans-font regular-font'>
                        Tasks
                    </span>
                </NavLink>


            </div>
        </div>
    )
}
