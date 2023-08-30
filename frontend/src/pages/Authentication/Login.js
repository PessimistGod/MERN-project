import React from 'react'
import { Link } from 'react-router-dom'
const Login = () => {
  
  return (
    <div className="section1">
  <div className="sm:mx-auto sm:w-full sm:max-w-sm">
    <img className="companyLogo" src='./Logo.png' alt="Your Company" />
    <h2 className="authHeading">Sign in to your account</h2>
  </div>

  <div className="formDiv">
    <form className="space-y-6" action="#" method="POST">
      
      <div>
        <label htmlFor="email" className="inputTagline">Email address</label>
        <div className="mt-2">
          <input id="email" name="email" type="email" autoComplete="email" required className="inputField" />
        </div>
      </div>

      <div>
        <div className="flexBetween">
          <label htmlFor="password" className="inputTagline">Password</label>
        </div>
        <div className="mt-2">
          <input id="password" name="password" type="password" autoComplete="current-password" required className="inputField" />
        </div>
      </div>

      <div>
        <button type="submit" className="authBtn">Sign in</button>
      </div>
    </form>

    <p className="mt-10 text-center text-sm text-gray-500">
      Not a Member?
      <Link to={'./Signup'} className="SignFont">Sign Up</Link>
    </p>
  </div>
</div>
  )
}

export default Login