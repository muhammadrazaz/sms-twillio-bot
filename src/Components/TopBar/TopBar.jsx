import React from 'react'
import './TopBar.css'
import avatarImg from '../../Assets/Images/avatar.jpg'
export default function TopBar() {
  return (
    <div className='w-100 h-100 d-flex align-items-center justify-content-end px-4'>


        <button id='' className='topbar-btn p-0'>
        <i class="ti ti-bell">
            {/* <div>13</div> */}
        </i>
        </button>
        
        <button id='profile-btn' className='topbar-btn p-0'>
            <img className='w-100 h-100' src={avatarImg} alt="" />
        </button>

        
    </div>
  )
}
