import React, { useContext, useEffect, useRef, useState } from 'react'
import './TopBar.css'
import avatarImg from '../../Assets/Images/avatar.jpg'
import { RightBarContext } from '../../Context/RightBarContext'
import RightBarForm from '../../Components/RightBarForm/RightBarForm'
import {useAuth} from '../../Provider/AuthProvider'
export default function TopBar() {

  const [isNotification, setIsNotification] = useState(false)
  const [isProfile, setIsProfile] = useState(false)
  const { setRightBarCheckBox, setRightBarChildren, setRightBarTitle } = useContext(RightBarContext)
  const [editProfileData, setEditProfileData] = useState({})
  const notificationRef = useRef(null);
  const notificationBtnRef = useRef(null)
  const profileRef = useRef(null);
  const profileBtnRef = useRef(null)
  const {setToken,setUserDetail} = useAuth()


  const handleEditProfileChange = (e) => {
    const { name, value } = e.target

    setEditProfileData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  useEffect(() => {
    const handleClickOutside = (event) => {

      if (notificationRef.current && !notificationRef.current.contains(event.target) && notificationBtnRef.current && !notificationBtnRef.current.contains(event.target)) {
        setIsNotification(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target) && profileBtnRef.current && !profileBtnRef.current.contains(event.target)) {
        setIsProfile(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [notificationRef, profileRef]);

  const profileForm = (data, handleChangeData) => {

    return <div className="profile-form-grid">
      <div className="form-group">
        <label for="first_name" className="form-label regular-font">First Name<span className="text-danger">*</span></label>
        <input type="text" name='first_name' className="form-control" id="first_name" value={data['first_name']} onChange={handleChangeData} required />
        <div className="valid-feedback">

        </div>
      </div>

      <div className="form-group">
        <label for="last_name" className="form-label regular-font">Last Name<span className="text-danger">*</span></label>
        <input type="text" name='last_name' className="form-control" id="first_name" value={data['last_name']} onChange={handleChangeData} required />
        <div className="valid-feedback">

        </div>
      </div>
      <div className="form-group">
        <label for="email" className="form-label regular-font">Email<span className="text-danger">*</span></label>
        <input type="text" name='email' className="form-control" id="email" value={data['email']} onChange={handleChangeData} required />
        <div className="valid-feedback">

        </div>
      </div>

      <div className="form-group">
        <label for="passowrd" className="form-label regular-font">New Passowrd</label>
        <input type="text" name='passowrd' className="form-control" id="passowrd" value={data['passowrd']} onChange={handleChangeData} required />
        <div className="valid-feedback">

        </div>
      </div>

      <div className="form-group">
        <label for="passowrd" className="form-label regular-font">Confirm Passowrd</label>
        <input type="text" name='passowrd' className="form-control" id="passowrd" value={data['passowrd']} onChange={handleChangeData} required />
        <div className="valid-feedback">

        </div>
      </div>





    </div>
  }

  const editProfileForm = () => {
    // setEditProfileData({})

    const form = <RightBarForm>
      {profileForm(editProfileData, handleEditProfileChange)}
    </RightBarForm>
    setRightBarTitle("Edit Profile Data")
    setRightBarCheckBox(true)
    setRightBarChildren(form)
    setIsProfile(false)
  }


  const logout = () =>{
    setToken()
    setUserDetail()
  }
  return (
    <div className='w-100 h-100 d-flex align-items-center justify-content-end px-4 pos'>


      <button id='notification-btn' className='topbar-btn p-0' onClick={() => { setIsNotification(!isNotification) }}  ref={notificationBtnRef}>
        <i className="ti ti-bell">
        </i>
        <span id='notification-counter'>
          <p>13</p>
        </span>
        {/* <div className="notification-container">

        </div> */}
      </button>
      {
        isNotification && <div className="notification-container" ref={notificationRef}>
          <p className='noti-text'>Notifications</p>
          <div className='notification-div'>


            <div className="notification">
              <p className="title semibold-font sm-font">
                this title
              </p>
              <p className='description regular-font sm-font'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Animi eveniet nisi atque, iure amet consequuntur doloribus odio quam aliquam autem doloremque laboriosam, omnis corporis maiores assumenda incidunt ducimus sit fuga saepe quibusdam aperiam </p>
              <p className='date-time regular-font x-sm-font'>date-time</p>
            </div>

            <div className="notification">
              <p className="title semibold-font sm-font">
                this title
              </p>
              <p className='description regular-font sm-font'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Animi eveniet nisi atque, iure amet consequuntur doloribus odio quam aliquam autem doloremque laboriosam, omnis corporis maiores assumenda incidunt ducimus sit fuga saepe quibusdam aperiam </p>
              <p className='date-time regular-font x-sm-font'>date-time</p>
            </div>
            <div className="notification">
              <p className="title semibold-font sm-font">
                this title
              </p>
              <p className='description regular-font sm-font'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Animi eveniet nisi atque, iure amet consequuntur doloribus odio quam aliquam autem doloremque laboriosam, omnis corporis maiores assumenda incidunt ducimus sit fuga saepe quibusdam aperiam </p>
              <p className='date-time regular-font x-sm-font'>date-time</p>
            </div>

          </div>
        </div>
      }


      <button id='profile-btn' className='topbar-btn p-0' onClick={()=>{setIsProfile(!isProfile)}}  ref={profileBtnRef}>
        <img className='w-100 h-100' src={avatarImg} alt="" />
      </button>

      {
        isProfile && <div className="profile-div" ref={profileRef}>
          <button className={'sm-font noto-sans-font  text-start w-100 my-1 '} style={{ fontWeight: 500 }} onClick={editProfileForm}>
            <i className="ti ti-user-pin me-2"></i>
            My Profile
          </button>
          <button className={'sm-font noto-sans-font  text-start w-100 my-1 '} style={{ fontWeight: 500 }} onClick={logout}>
            <i className="ti ti-lock me-2"></i>
            Logout
          </button>



        </div>
      }





    </div>
  )
}
