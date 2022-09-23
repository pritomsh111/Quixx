import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { randPassGenerator } from '../../utility/randomPassGenerator';

import axios from 'axios';

import classes from './Form.module.css';

const Form = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [slider, setSlider] = useState(8);
    const history = useNavigate();

    const login = async () => {
        let user;
        if (name && email) {
            try {
                user = await axios.get(`${process.env.REACT_APP_URL}/login?name=${name}&email=${email}`);
            }
            catch (e) {
                console.log(e);
            }
        }
        return user;
    }

    return (
        <div className={classes.Form}>
            <div className={classes.FormChild}>
                <h1>Registration Form</h1>
                <div className={classes.Inputs}>
                    <input type="text" placeholder='Name'
                        value={name} onChange={({ target }) => { setName(target.value) }} />
                    <input type="email" placeholder='Email'
                        value={email} onChange={({ target }) => { setEmail(target.value) }} />
                    <div className={classes.slider}>
                        <label htmlFor='slider'>Password Size: {slider}</label>
                        <input id="slider" type='range' value={slider} onChange={({ target }) => { setSlider(target.value) }} min={4} max={14} />
                    </div>
                </div>

                <div className={classes.submit}>
                    <button type="submit" onClick={async () => {
                        let exists = await login();
                        console.log(exists + "dsad");
                        !exists ? await axios.post(`${process.env.REACT_APP_URL}/registration`, { name, email }) : console.log("ache");

                        // return name && email ? history('/passwordShow', {state: randPassGenerator(slider) }) : '';
                    }}>Registration</button>
                    <button type="submit" onClick={login}>Login</button>
                </div>
            </div>
        </div >
    );
}

export default Form;