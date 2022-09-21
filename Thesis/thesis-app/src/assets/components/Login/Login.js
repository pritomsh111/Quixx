import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Modal from 'react-modal';

import classes from './Login.module.css'
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root');
function Login() {
    const { state: { result, sentence, state } } = useLocation();
    const [shown, setShown] = useState(false);
    const [password, setPassword] = useState('');
    const [checked, setChecked] = useState(true);
    return (
        <>
            <Modal
                isOpen={shown}
                onRequestClose={() => { setShown(false) }}
                style={customStyles}
                contentLabel=""
            >
                <div className={classes.modalDiv}>
                    <h3>Congratulations!</h3>
                    <button onClick={() => window.location('/')}>Retake</button>
                </div>
            </Modal>
            <div className={classes.Login}>
                <div className={classes.input}>
                    <input placeholder='Password' type={checked ? "password" : "text"} value={password} onChange={({ target }) => { setPassword(target.value) }} />
                    <div>
                        <input type="checkbox" onChange={() => setChecked(!checked)} /> Show Password
                    </div>
                    <button onClick={() => {
                        if (password === state.join('')) {
                            setShown(true);
                        }
                    }}>Submit</button>
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
        </>

    );
}

export default Login;