import { useState } from 'react';
import { Data } from '../../data/pronunciation';

import classes from './Pronunciation.module.css';

const Pronunciation = ({ char, changeIndex, result, pushResult }) => {
    const [active, setActive] = useState();
    const [pronunciation, setPronunciation] = useState('');
    const [btn, setBtn] = useState('Confirm');

    const blurNow = () => {
        if (btn === 'Next') {
            changeIndex(prev => prev + 1);
            pushResult([...result, pronunciation]);
            setBtn('Confirm');
            setActive();
        }
        else {
            setBtn('Next');
        }
    }

    return (
        <>
            <h2 className={classes.heading}>Training For: {char}</h2>
            <div className={classes.Pronunciation}>
                {
                    Data[char].map((item, index) =>
                        <div className={classes.image} key={item}>
                            <p className={btn === 'Confirm' ? active === index ? classes.active : '' : active !== index ? classes.blur : ''} onClick={() => { setActive(index); setPronunciation(item); }}> </p>
                        </div>
                    )
                }
                <button onClick={blurNow}>{btn}</button>
            </div>
        </>
    );

}

export default Pronunciation;