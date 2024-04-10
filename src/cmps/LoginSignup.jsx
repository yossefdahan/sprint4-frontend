import { useState, useEffect } from 'react'
import { userService } from '../services/user.service'
import { ImgUploader } from './ImgUploader'
import { LoginForm } from './LoginForm'
import { login, signup } from '../store/user.actions'

export function LoginSignup({ onClose }) {
    // const [credentials, setCredentials] = useState({ username: '', password: '', fullname: '' })
    const [isSignup, setIsSignUp] = useState(false)


    // function clearState() {
    //     setCredentials({ username: '', password: '', fullname: '', imgUrl: '' })
    //     setIsSignup(false)
    // }

    // function handleChange(ev) {
    //     const field = ev.target.name
    //     const value = ev.target.value
    //     setCredentials({ ...credentials, [field]: value })
    // }

    // function onLogin(ev = null) {
    //     if (ev) ev.preventDefault()
    //     if (!credentials.username) return
    //     props.onLogin(credentials)
    //     clearState()
    // }
    function onLogin(credentials) {
        isSignup ? _signup(credentials) : _login(credentials)
    }

    function _login(credentials) {
        login(credentials)
            .then(() => { showSuccessMsg('Logged in successfully') })
            .catch((err) => { showErrorMsg('Oops try again') })
    }

    function _signup(credentials) {
        signup(credentials)
            .then(() => { showSuccessMsg('Signed in successfully') })
            .catch((err) => { showErrorMsg('Oops try again') })
    }

    // function onSignup(ev = null) {
    //     if (ev) ev.preventDefault()
    //     if (!credentials.username || !credentials.password || !credentials.fullname) return
    //     props.onSignup(credentials)
    //     clearState()
    // }

    // function toggleSignup() {
    //     setIsSignup(!isSignup)
    // }

    function onUploaded(imgUrl) {
        setCredentials({ ...credentials, imgUrl })
    }

    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="login-signup-modal" onClick={e => e.stopPropagation()}>
                <LoginForm
                    onLogin={onLogin}
                    isSignup={isSignup}
                    onClose={onClose}
                    onUploaded={onUploaded}
                />
                {/* <button>Login!</button> */}
                <div className="toggle-btns">
                    <div className="btns">
                        <a href="#" onClick={() => setIsSignUp(!isSignup)}>
                            {isSignup ?
                                'Already a member? Login' :
                                'New user? Signup here'
                            }
                        </a >
                    </div>
                </div>

                {/* <p>
                    <button className="btn-link" onClick={toggleSignup}>{!isSignup ? 'Signup' : 'Login'}</button>
                </p> */}
                {/* <form className="login-form" onSubmit={onLogin}> */}
                {/* <select */}
                {/* name="username" */}
                {/* value={credentials.username} */}
                {/* onChange={handleChange} */}
                {/* > */}
                {/* <option value="">Select User</option>
                        {users.map(user => <option key={user._id} value={user.username}>{user.fullname}</option>)}
                    </select> */}
                {/* <input
                        type="text"
                        name="username"
                        value={username}
                        placeholder="Username"
                        onChange={handleChange}
                        required
                        autoFocus
                    />
                    <input
                        type="password"
                        name="password"
                        value={password}
                        placeholder="Password"
                        onChange={handleChange}
                        required
                    /> */}

                {/* </form>} */}
                {/* <div className="signup-section">
                    {isSignup && <form className="signup-form" onSubmit={onSignup}>
                        <input
                            type="text"
                            name="fullname"
                            value={credentials.fullname}
                            placeholder="Fullname"
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="text"
                            name="username"
                            value={credentials.username}
                            placeholder="Username"
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="password"
                            name="password"
                            value={credentials.password}
                            placeholder="Password"
                            onChange={handleChange}
                            required
                        />
                        <ImgUploader onUploaded={onUploaded} />
                        <button >Signup!</button>
                    </form>} */}
            </div>
        </div>
        // </div>
    )
}