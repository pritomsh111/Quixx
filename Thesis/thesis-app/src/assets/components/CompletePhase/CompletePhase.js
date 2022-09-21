import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './CompletePhase.module.css';

const CompletePhase = ({ result }) => {
    const [sentence, setSentence] = useState('');
    let history = useNavigate();
    return (
        <>
            <div className={classes.CompletePhase}>
                {
                    result.map((item, index) =>
                        <div key={`${item + index}`} className={`${classes.image} ${(result[index].charCodeAt(0) >= 65 && result[index].charCodeAt(0) <= 90) ? classes.big : ''}`}>
                            <img alt={item} src={item} />
                        </div>
                    )
                }
            </div>
            <div className={classes.Sentence}>
                <input type="text" value={sentence} onChange={({ target }) => setSentence(target.value)} />
                <button onClick={() => { history('/login', { state: { result, sentence } }); }}>Next</button>
            </div>
        </>
    );
}

export default CompletePhase;