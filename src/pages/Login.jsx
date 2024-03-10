import React from 'react';
import GoogleButton from 'react-google-button';
import "../assets/style/login.css"

const Login = () => {
  return (
    <div className='login' >
      <span className='login-heading'>Sign in with Google</span>
      <div className='login-button'>
        <GoogleButton/>
      </div>
    </div>
  )
}

export default Login