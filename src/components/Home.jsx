import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { auth } from '../store/slices/userName.slice';

const Home = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [userNameInp, setUserNameInp] = useState('')

    const logIn = () => {
        dispatch(auth(userNameInp))
        navigate('/pokedex')
    }

    return (
        <div className='home-container'>
            <h2>Welcome, please Log In to continue</h2>
            <div className='log-in'>
                <input type='text' 
                    value={userNameInp}
                    onChange={ e => setUserNameInp(e.target.value)}
                    placeholder='Username'
                />
                <button onClick={logIn}>Log In</button>
            </div>
        </div>
    );
};

export default Home;