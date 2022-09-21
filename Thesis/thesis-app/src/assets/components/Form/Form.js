import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { randPassGenerator } from '../../utility/randomPassGenerator';
import classes from './Form.module.css';

const Form = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [slider, setSlider] = useState(8);
    const history = useNavigate();

    return (
        <div className={classes.Form}>
            <div className={classes.FormChild}>
                <h1>Registration Form</h1>
                <div className={classes.Inputs}>
                    <input type="text" placeholder='Name'
                        value={name} onChange={({ target }) => { setName(target.value) }} />
                    <input type="email" placeholder='Email' pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2, 4}$"
                        value={email} onChange={({ target }) => { setEmail(target.value) }} />
                    <div className={classes.slider}>
                        <label htmlFor='slider'>Password Size: {slider}</label>
                        <input id="slider" type='range' value={slider} onChange={({ target }) => { setSlider(target.value) }} min={8} max={12} />
                    </div>
                </div>
                <button type="submit" onClick={() => {
                    return name && email ? history('/passwordShow', { state: randPassGenerator(slider) }) : '';
                }}>Submit</button>
            </div>
        </div >
    );
}

export default Form;