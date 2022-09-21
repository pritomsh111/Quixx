import { useState, useEffect } from 'react';
import classes from './CompletePhase.module.css';

const CompletePhase = ({ result, pushResult, store }) => {
    const [sentence, setSentence] = useState('');
    return (
        <>
            <div className={classes.CompletePhase}>
                {
                    store.map((item, index) =>
                        <div key={`${item + index}`} className={`${classes.image} ${(result[pushResult, index].charCodeAt(0) >= 65 && result[pushResult, index].charCodeAt(0) <= 90) ? classes.big : ''}`}>
                            <img alt={item} src={item} />
                        </div>
                    )
                }
            </div>
            <div className={classes.Sentence}>
                <input type="text" value={sentence} onChange={({ target }) => setSentence(target.value)} />
                <button onClick={() => { pushResult([...result, sentence]); }}>Next</button>
            </div>
        </>
    );
}

export default CompletePhase;