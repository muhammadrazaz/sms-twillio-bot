import React, { useState } from 'react'
import './SideBar.css'
import logo from '../../Assets/Images/logo.svg'
import { NavLink } from 'react-router-dom';
export default function SideBar(props) {



    const handleCheckboxChange = (e) => {
        props.setIsChecked(e.target.checked)


        if (e.target.checked) {
            document.documentElement.style.setProperty('--sidebar-width', '75px');
            document.documentElement.style.setProperty('--side-bar-arrow-opacity', 0)
            document.documentElement.style.setProperty('--side-bar-arrow-degree', '180deg')
        } else {
            document.documentElement.style.setProperty('--sidebar-width', '245px');
            document.documentElement.style.setProperty('--side-bar-arrow-opacity', 1)
            document.documentElement.style.setProperty('--side-bar-arrow-degree', '0deg')
        }
    };


    return (
        <div id='side-bar'>
            <div id='logo-container' className="d-flex align-items-center justify-content-between w-100">
                <div>
                    <img src={logo} alt="" />
                </div>
                <div id='toggle-side-bar-div'>
                    <input type="checkbox" name="" id='toggle-side-bar' className='d-none' onChange={handleCheckboxChange} />
                    <label id='toggle-side-bar-label' htmlFor="toggle-side-bar" className='m-0'>

                        <i class="ti ti-arrow-bar-to-left"></i>

                    </label>
                </div>

            </div>
            <div className='mt-3'>
                <div className="side-bar-option p-1">


                    <span className='p-1'>
                        <i className="ti ti-layout-2"></i>
                    </span>

                </div>
            </div>
        </div>
    )
}
