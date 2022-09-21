import { useState } from 'react';
import { useLocation } from 'react-router-dom';

import classes from './Login.module.css'

function Login() {
    const { state: { result, sentence, state } } = useLocation();
    const [password, setPassword] = useState('');
    const [checked, setChecked] = useState(true);
    return (
        <div className={classes.Login}>
            <div className={classes.input}>
                <input placeholder='Password' type={checked ? "password" : "text"} value={password} onChange={({ target }) => { setPassword(target.value) }} />
                <div>
                    <input type="checkbox" onChange={() => setChecked(!checked)} /> Show Password
                </div>
                <button onClick={() => {
                    if (password === state.join('')) {
                    }
                }}>Sumbit</button>
            </div>
            <div className={classes.hint}>
                {
                    result.map((item, index) => (
                        <details key={`${item + index}`}>
                            <summary>Hint {index + 1}</summary>
                            <p><img alt={item} src={item} /></p>
                        </details>
                    ))
                }
                <details>
                    <summary>Hint {result.length + 1}</summary>
                    <p style={{ padding: '1rem' }}><strong>{sentence}</strong></p>
                </details>
            </div>
        </div>
    );
}

export default Login;