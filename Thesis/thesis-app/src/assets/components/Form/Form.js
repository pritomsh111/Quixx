import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { randPassGenerator } from '../../utility/randomPassGenerator';

import axios from 'axios';

import classes from './Form.module.css';

const Form = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [slider, setSlider] = useState(8);
    const [userExist, setUserExist] = useState("");
    const history = useNavigate();

    useEffect(() => {
        localStorage.clear();
    }, []);

    const login = async () => {
        let user;
        if (name && email) {
            try {
                user = await axios.get(`${process.env.REACT_APP_URL}/login?name=${name}&email=${email}`);
            }
            catch (e) {
            }
        }
        return user;
    }

    const redirectAfterLogin = async () => {
        const user = await login();
        if (user) {
            const { data: { images, password, _id, trainingTime } } = user;
            let sentence = images.slice(-1);
            localStorage.setItem("id", _id);
            history('/login', { state: { result: images.slice(0, -2), sentence, state: password, trainingTime: trainingTime } });
        }
        else {
            setUserExist(`User Not Found!`);
        }
    }

    return (
        <div className={classes.Form}>
            <div className={classes.FormChild}>
                <h1>Registration Form</h1>
                <div className={classes.Inputs}>
                    <div className={classes.nameInputs}>
                        <input type="text" placeholder='Name'
                            value={name} onChange={({ target }) => { setName(target.value); setUserExist(""); }} />
                        <span>{userExist}</span>
                    </div>
                    <div className={classes.emailInputs}>
                        <input type="email" placeholder='Email'
                            value={email} onChange={({ target }) => { setEmail(target.value); setUserExist(""); }} />
                    </div>
                    <div className={classes.slider}>
                        <label htmlFor='slider'>Password Size: {slider}</label>
                        <input id="slider" type='range' value={slider} onChange={({ target }) => { setSlider(target.value) }} min={4} max={14} />
                    </div>
                </div>

                <div className={classes.submit}>
                    <button type="submit" onClick={async () => {
                        let data = await login();
                        if (!data && name && email) {
                            const password = randPassGenerator(slider);
                            const data = await axios.post(`${process.env.REACT_APP_URL}/registration`, { name, email, password });
                            localStorage.setItem("id", data.data._id);
                            return history('/passwordShow', { state: password });
                        }
                        else {
                            setUserExist("User Exists! Try Login")
                        }
                    }}
                    >Registration</button>
                    <button type="submit" onClick={redirectAfterLogin}>Login</button>
                </div>
            </div>
        </div >
    );
}

export default Form;