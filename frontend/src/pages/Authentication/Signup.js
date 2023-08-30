import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
const Signup = () => {

  //State for managing 
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [isValidEmail, setValidEmail] = useState(false);

  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

  async function checkEmailExist(email) {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/auth/checkEmail?email=${email}`);
      const data = response.data;
      return data.message === 'Valid Email';

    } catch (error) {
      console.error('Error checking email in database:', error);
      return false;
    }
  }

  function isValidEmailFormat(email) {
    // Regular expression for basic email validation
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  }


  //Check Existing Email and Matching Password
  async function handleEmail(email) {
    try {
      if (isValidEmailFormat(email)) {
        const isValidEmail = await checkEmailExist(email);

        if (isValidEmail) {
          console.log("Email is valid and available");
          setValidEmail(true);
        } else {
          console.log("Email already exists");
          setValidEmail(false);
        }
      } else {
        console.log("Invalid email format");
        setValidEmail(false);
      }
    } catch (error) {
      console.error('Error checking email:', error);
      setValidEmail(false);
    }
  }




  return (
    <div className="section1">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img className="companyLogo" src='./Logo.png' alt="Your Company" />
        <h2 className="authHeading">Create Your Account </h2>
      </div>

      <div className="formDiv">
        <form className="space-y-6" action="#" method="POST">

          <div className='flexBetween'>
            <div>
              <label htmlFor="name" className="inputTagline">Full Name</label>
              <div className="mt-2">
                <input id="name" name="name" type="name" autoComplete="name" onChange={(e) => setName(e.target.value)} value={name} required className="inputField" />
              </div>
            </div>

            <div>
              <label htmlFor="company" className="inputTagline">Company Name</label>
              <div className="mt-2">
                <input id="company" name="company" type="company" onChange={(e) => setCompany(e.target.value)} value={company} autoComplete="company" required className="inputField" />
              </div>
            </div>

          </div>


          <div>
            <label htmlFor="email" className="inputTagline">Email address</label>
            <div className="mt-2">
              <input id="email" name="email"  onBlur={() => handleEmail(email)} onChange={(e) => setEmail(e.target.value)} value={email} type="email" autoComplete="email" required className="inputField" />
            </div>
            <span className='text-black'>
  {isValidEmail ? 'Email Available' : 'Email Already Taken'}
</span>

          </div>

          <div>
            <div className="flexBetween">
              <label htmlFor="password" className="inputTagline">Password</label>
            </div>
            <div className="mt-2">
              <input id="password" name="password" type="password" onChange={(e) => setPassword(e.target.value)} value={password} autoComplete="current-password" required className="inputField" />
            </div>
          </div>

          <div>
            <div className="flexBetween">
              <label htmlFor="confirmPass" className="inputTagline">Confirm Password</label>
            </div>
            <div className="mt-2">
              <input id="confirmPass" name="confirmPass" type="password" onChange={(e) => setConfirmPass(e.target.value)} value={confirmPass} autoComplete="current-password" required className="inputField" />
            </div>
          </div>

          <div>
            <button type="submit" className="authBtn">Sign Up</button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Already a Member?
          <Link to={'/'} className="SignFont">Sign in</Link>
        </p>
      </div>
    </div>
  )
}

export default Signup