import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import classes from './PasswordShow.module.css';

const PasswordShow = () => {
    let [isPasswordSeen, setIsPasswordSeen] = useState(true);
    let { state } = useLocation();
    let history = useNavigate();
    useEffect(() => {
        setTimeout(() => { setIsPasswordSeen(false) }, 5000);
        setTimeout(() => { history('/training', { state: state, replace: true }) }, 8000);
    });
    return (
        <div className={isPasswordSeen ? classes.PasswordShow : classes.PasswordHide}>
            <h2>Your Password:</h2>
            <h1>{state}</h1>
        </div>
    );
}
export default PasswordShow;
