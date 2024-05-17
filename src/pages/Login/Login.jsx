import React, { useState } from 'react'
import './login.css'
import logo from '../../assets/logo.png'
import { auth, login, signup } from '../../firebase'
import netflix_spinner from '../../assets/netflix_spinner.gif'


const Login = () => {

  const [singState,setSignState] = useState("Sign In")
  const [name,setName] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [loading,setLoading] = useState(false)

  const user_auth = async(event) =>{

    event.preventDefault()

    setLoading(true)
    
    if(singState === "Sign In"){

      await login(email,password);

    }else
    {
      await signup(name,email,password)
    }

    setLoading(false)
  }

  


  return (
    loading? <div className="login-spinner">
      <img src={netflix_spinner} alt="" />
    </div>
:
    <div className='login'>
      <img src={logo} className='login-logo' alt="" />
      <div className="login-form">
        <h1>{singState}</h1>
        <form action="">

          {singState==="Sign Up" ?   <input type="text" value={name} onChange={(e)=>{setName(e.target.value)}} placeholder='Your Nmae' /> : <></>}
        
          <input value={email} onChange={(e)=>{setEmail(e.target.value)}} type="text" placeholder='Email' />
          <input value={password} onChange={(e)=>{setPassword(e.target.value)}} type="text" placeholder='Password' />
          <button onClick={user_auth} type='submit'>{singState}</button>
          <div className="form-help">
            <div className="remember">
              <input type="checkbox"  />
              <label htmlFor="">Remember Me</label>
            </div>
            <p>Need Help ?</p>
          </div>
        </form>
        <div className="form-switch">
          {singState==="Sign In" ?  <p>New to Netflix ? <span onClick={()=>{setSignState("Sign Up")}}>Sign Up Now</span> </p> : <p>Already Have account ? <span onClick={()=>{setSignState("Sign In")}}>Sign in Now</span></p>}
        </div>
      </div>
    </div>
  )
}

export default Login
