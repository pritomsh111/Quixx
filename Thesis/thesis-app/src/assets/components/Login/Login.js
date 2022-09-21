import { useState } from 'react';
import { useLocation } from 'react-router-dom';

import classes from './Login.module.css'

function Login() {
    const { state: { result, sentence } } = useLocation();
    const [password, setPassword] = useState('');
    const [checked, setChecked] = useState(false);
    return (
        <div className={classes.Login}>
            <div className={classes.hint}>
                {
                    result.map((item, index) => (
                        <details key={`${item + index}`}>
                            <summary>Hint {index + 1}</summary>
                            <p><img alt={item} src={item} /></p>
                        </details>
                    ))
                }
            </div>
            <div className={classes.input}>
                <input type={checked ? "password" : "text"} value={password} onChange={({ target }) => { setPassword(target.value) }} />
                <input type="checkbox" onChange={() => setChecked(!checked)} />
            </div>
        </div>
    );
}

export default Login;