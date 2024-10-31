import React, { useContext, useEffect, useRef, useState } from 'react'
import './TopBar.css'
import avatarImg from '../../Assets/Images/avatar.jpg'
import RightBar from '../RightBar/RightBar'
import RightBarForm from '../../Components/RightBarForm/RightBarForm'
import { useAuth } from '../../Provider/AuthProvider'
import axios from '../../Api/axios'
import { useApi } from '../../Provider/ApiProvider'
import { useRightBar } from '../../Provider/RightBarProvider'
import { useNavigate } from 'react-router-dom'


export default function TopBar(props) {


  const { increaseApiCounter, decreaseApiCounter } = useApi()
  const { setRightBarCheckbox } = useRightBar()
  const { setToken, setUserDetail, userDetail } = useAuth()
  const [isEditFormShow, setIsEditFormShow] = useState(false)
  const [isNotification, setIsNotification] = useState(false)
  const [notifications, setNotifications] = useState([])
  const [notificationCount, setNotificationCount] = useState(0)
  const [isProfile, setIsProfile] = useState(false)
  const [editProfileData, setEditProfileData] = useState(userDetail)
  const [errors, setErrors] = useState({})
  const notificationRef = useRef(null);
  const notificationBtnRef = useRef(null)
  const profileRef = useRef(null);
  const profileBtnRef = useRef(null)

  const navigate = useNavigate()



  useEffect(() => {
    getNotificationApi()
  }, [])

  useEffect(() => {
    const handleClickOutside = (event) => {

      if (notificationRef.current && !notificationRef.current.contains(event.target) && notificationBtnRef.current && !notificationBtnRef.current.contains(event.target)) {
        setIsNotification(false);
        // markNotificationReadApi()
        getNotificationApi()
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

  function formatDate(utcDateString) {
    // Parse the UTC date string
    const utcDate = new Date(utcDateString);

    // Format the date for the user's local timezone with AM/PM
    return new Intl.DateTimeFormat('default', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: 'numeric',
      minute: '2-digit',
      // second: '2-digit',
      hour12: true,  // Use 12-hour format with AM/PM
      // timeZoneName: 'short'
    }).format(utcDate);
  }


  const handleEditProfileChange = (e) => {
    const { name, value } = e.target

    setEditProfileData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleMenuClick = () =>{
    props.setIsChecked(true)
  }

  const editProfileForm = () => {
    setIsEditFormShow(true)
    setRightBarCheckbox(true)
  }

  const getNotificationApi = () => {
    axios.get('notifications/')
      .then(response => {
        console.log(response)
        setNotifications(response.data.notifications)
        setNotificationCount(response.data.unread_notification)
      }).catch(error => {
        console.log(error)
      })
  }

  const markNotificationReadApi = () => {
    axios.post('notifications/')
      .then(response => {
        console.log(response)

      }).catch(error => {
        console.log(error)
      })
  }


  const editProfileApi = (e) => {
    e.preventDefault()
    increaseApiCounter()
    console.log(editProfileData, '==================')
    axios.put('update-profile/', editProfileData)
      .then(response => {
        console.log(response)
        setErrors({})
        setRightBarCheckbox(false)
        setUserDetail({ 'first_name': response.data.first_name, 'last_name': response.data.last_name, email: response.data.email, 'role': response.data.role })
        decreaseApiCounter()
      }).catch(error => {
        if (error.response.status === 400) {
          setErrors(error.response.data)
        }
        else {
          setErrors({})
        }
        decreaseApiCounter()
      })

  }




  const logout = () => {
    setToken()
    setUserDetail()
    // setTimeout(()=>{

    navigate('/')
    // },[500])
  }
  return (
    <div className='w-100 h-100 d-flex align-items-center justify-content-between px-4 pos'>

      <div>
            <i className='ti ti-menu-2 menu' style={{fontSize:'30px'}} onClick={handleMenuClick}></i>
      </div>

      <div>
        <button id='notification-btn' className='topbar-btn p-0' onClick={() => { setIsNotification(!isNotification) }} ref={notificationBtnRef}>
          <i className="ti ti-bell">
          </i>
          <span id='notification-counter'>
            <p>{notificationCount}</p>
          </span>
        </button>
        {
          isNotification && <div className="notification-container" ref={notificationRef}>
            <p className='noti-text'>Notifications</p>
            <div className='notification-div'>


              {notifications.map((data, index) => {
                return <div className="notification" key={index}>
                  <p className="title semibold-font sm-font">
                    {data.is_read === 'False' && <span className='unread'></span>}

                    {data.title}
                  </p>
                  <p className='description regular-font sm-font'>{data.description} </p>
                  <p className='date-time regular-font x-sm-font'>{formatDate(data.created_at)}</p>
                </div>
              })}






            </div>
          </div>
        }


        <button id='profile-btn' className='topbar-btn p-0' onClick={() => { setIsProfile(!isProfile) }} ref={profileBtnRef}>
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





      {isEditFormShow && <RightBar setIsFormShow={setIsEditFormShow} rightBarTitle="Edit Profile" children={<UserProfileForm data={editProfileData} handleChangeData={handleEditProfileChange} onSubmit={editProfileApi} errors={errors} />} />}
    </div>
  )
}


export const UserProfileForm = (props) => {

  const profile = <div className="profile-form-grid">
    <div className="form-group">
      <label for="first_name" className="form-label regular-font">First Name<span className="text-danger">*</span></label>
      <input type="text" name='first_name' className={"form-control " + (props.errors.first_name ? 'is-invalid' : '')} id="first_name" value={props.data['first_name']} onChange={props.handleChangeData} required />
      <div className="invalid-feedback">
        {props.errors.first_name}
      </div>
    </div>

    <div className="form-group">
      <label for="last_name" className="form-label regular-font">Last Name<span className="text-danger">*</span></label>
      <input type="text" name='last_name' className={"form-control " + (props.errors.last_name ? 'is-invalid' : '')} id="first_name" value={props.data['last_name']} onChange={props.handleChangeData} required />
      <div className="invalid-feedback">
        {props.errors.last_name}
      </div>
    </div>
    <div className="form-group">
      <label for="email" className="form-label regular-font">Email<span className="text-danger">*</span></label>
      <input type="email" name='email' className={"form-control " + (props.errors.email ? 'is-invalid' : '')} id="email" value={props.data['email']} onChange={props.handleChangeData} required />
      <div className="invalid-feedback">
        {props.errors.email}
      </div>
    </div>

    <div className="form-group">
      <label for="password" className="form-label regular-font">New Password</label>
      <input type="password" name='password' className={"form-control " + (props.errors.password ? 'is-invalid' : '')} id="password" value={props.data['password']} onChange={props.handleChangeData} />
      <div className="invalid-feedback">
        {props.errors.password}
      </div>
    </div>

    <div className="form-group">
      <label for="password_confirm" className="form-label regular-font">Confirm Password</label>
      <input type="password" name='password_confirm' className={"form-control " + (props.errors.password_confirm ? 'is-invalid' : '')} id="password_confirm" value={props.data['password_confirm']} onChange={props.handleChangeData} />
      <div className="invalid-feedback">
        {props.errors.password_confirm}
      </div>
    </div>





  </div>

  return (

    <RightBarForm setIsRightBar={props.setIsRightBar} onSubmit={props.onSubmit} children={profile} />
  )

}
