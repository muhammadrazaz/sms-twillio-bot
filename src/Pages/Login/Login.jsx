import React, { useState } from 'react'
import './Login.css'
import logo from '../../Assets/Images/logo.svg'
import axios from '../../Api/axios'
import { useAuth } from '../../Provider/AuthProvider'
import Loader from '../../Components/Loader/Loader'
export default function Login() {
    const {setToken,setUserDetail} = useAuth()
    const [loginData,setLoginData] = useState({})
    const [errors,setErrors] = useState({})
    const [passwordType,setPasswordType] = useState('password')
    const [loader,setLoader] = useState(false)


    const handlePasswordVisiable = () =>{
      
        if(passwordType === 'password'){
           
            setPasswordType('text')
        }
        else{
            setPasswordType('password')
        }
    }

    const handleLoginDataChange = (e)=>{
        const {name,value} = e.target
        setLoginData(prevState =>({
            ...prevState,
            [name]:value
        }))
    }

    const loginApiCall = (e) =>{
        e.preventDefault()
        setLoader(true)
        axios.post('/login/',loginData)
        .then(response =>{
            console.log(response)
            const data = response.data
            setToken(data.access_token)
            setUserDetail({'first_name':data.first_name,'last_name':data.last_name,email:data.email,'role':data.role})
            setLoader(false)
        }).catch(error =>{
            console.log(error)
            if(error.response.status >= 400 && error.response.status <500){
                setErrors(error.response.data)
            }
            else{
                setErrors({})
            }
            
            setLoader(false)
        })
    }
    return (
        <div id='login-page' className='d-flex align-items-center justify-content-center'>
            {loader && <Loader/>}
            
            <form onSubmit={loginApiCall}>
                <div className='text-center mb-5'>
                    <img src={logo} alt="" />
                </div>
                <p className='large-font bold-font'>Sign In</p>
                <p className='sm-font regular-font mb-3' style={{ color: '#7D7D7D' }}>Access the CRMS panel using your email and passcode.</p>

                <div className="row ">
                    <div className="col-12 mb-3">
                        <div className="form-group position-relative">
                           
                            <label htmlFor="username" className="form-label regular-font">Username</label>
                            <input type="text" name='username' className={"form-control "+(errors.username||errors.error?'is-invalid':'')} id="useraname"   onChange={handleLoginDataChange}/>
                            <span className="ti ti-user-check"></span>
                            <div className="invalid-feedback">
                                {errors.username||errors.error}
                            </div>
                        </div>
                    </div>
                    

                    <div className="col-12 mb-3">
                        <div className="form-group position-relative">
                            <label htmlFor="password" className="form-label regular-font">Password</label>
                            <input type={passwordType} name='password' className={"form-control " + (errors.password?'is-invalid':'')} id="password"   onChange={handleLoginDataChange} />
                            <span className="ti toggle-password ti-eye-off" onClick={handlePasswordVisiable}></span>
                            <div className="invalid-feedback">
                                {errors.password}
                            </div>
                        </div>
                    </div>

                </div>

                <button className='w-100 sm-font semibold-font mt-2'> Sign In</button>

            </form>
        </div>
    )
}
