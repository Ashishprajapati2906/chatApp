// import React, { useState } from 'react'
// import './Login.css'
// import assets from '../../assets/assets'
// import { signup, login } from '../../config/firebase'

// const Login = () => {
//     const [currState, setCurrState] = useState("Sign up")
//     const [userName, setUserName] = useState("")
//     const [email, setEmail] = useState("")
//     const [password, setPassword] = useState("")
//     const [showPassword, setShowPassword] = useState(false)

//     const onSubmitHandler = (event) => {
//         event.preventDefault()
//         if (currState === "Sign up") {
//             signup(userName, email, password)
//         }
//         else {
//             login(email, password)
//         }
//     }

//     return (
//         <div className='login'>
//             <img src={assets.logo_big} alt="" className="logo" />
//             <form onSubmit={onSubmitHandler} className='login-form'>
//                 <h2>{currState}</h2>
//                 {currState === "Sign up" ? <input onChange={(e) => setUserName(e.target.value)} value={userName} type="text" placeholder='username' className='form-input' required /> : null}
//                 <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" placeholder='Email-address' className='form-input' required />
//                 <input onClick={() => setShowPassword(!showPassword)} onChange={(e) => setPassword(e.target.value)} value={password} type={showPassword ? "text" : "password"} placeholder='password' className='form-input' required />
//                 <button type='submit'>{currState === "Sign up" ? "Create account" : "Login now"}</button>
//                 <div className="login-term">
//                     <input type="checkbox" />
//                     <p>Agree to the terms of use & privacy policy.</p>
//                 </div>
//                 <div className="login-forgot">
//                     {
//                         currState === "Sign up"
//                             ? <p className='login-toggle'>Already have an account <span onClick={() => setCurrState("Login")}>Login here</span> </p>
//                             : <p className='login-toggle'>Don't have an account <span onClick={() => setCurrState("Sign up")}>Click here</span> </p>}
//                 </div>
//             </form>
//         </div>
//     )
// }

// export default Login

import React, { useState } from 'react'
import './Login.css'
import assets from '../../assets/assets'
import { login } from '../../config/firebase'

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)

    const onSubmitHandler = (event) => {
        event.preventDefault()
        login(email, password)
    }

    return (
        <div className='login'>
            {/* <h1 style={{color:'white'}}>Welcome</h1>
            <h1 style={{
                color: '#fff',
                textShadow: '0 0 5px #0ff, 0 0 10px #0ff, 0 0 20px #0ff',
                fontSize: '2rem',
                fontWeight: 'bold'
            }}>
                Ashish Prajapati's
            </h1> */}

            <img src={assets.logo_big} alt="" className="logo" />
            <form onSubmit={onSubmitHandler} className='login-form'>
                <h2>Login</h2>
                <input
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    type="email"
                    placeholder='Email-address'
                    className='form-input'
                    required
                />
                <input
                    onClick={() => setShowPassword(!showPassword)}
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    type={showPassword ? "text" : "password"}
                    placeholder='Password'
                    className='form-input'
                    required
                />
                <button type='submit'>Login Now</button>
                <div className="login-term">
                    <input type="checkbox" />
                    <p>Agree to the terms of use & privacy policy.</p>
                </div>
            </form>
        </div>
    )
}

export default Login
