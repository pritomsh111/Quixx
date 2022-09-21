import { useState } from 'react';
import { Data } from '../../data/image';

import classes from './Alphanumeric.module.css';

const Alphanumeric = ({ char, changeIndex, result, pushResult, path = "images/A-Za-z0-9" }) => {
    const [active, setActive] = useState();
    const [image, setImage] = useState('');
    const [btn, setBtn] = useState('Confirm');

    const blurNow = () => {
        if (btn === 'Next') {
            changeIndex(prev => prev + 1);
            pushResult([...result, `${path}/${char}/${image}`]);
            setBtn('Confirm');
            setActive();
        }
        else {
            setBtn('Next');
        }
    }

    return (
        <div className={classes.Alphanumeric}>
            {
                Data[char].map((item, index) =>
                    <div className={classes.image} key={item}>
                        <img alt={item.slice(0, item.length - 4)} className={btn === 'Confirm' ? active === index ? classes.active : '' : active !== index ? classes.blur : ''} onClick={() => { setActive(index); setImage(item); }} src={`${path}/${char}/${item}`} />
                    </div>
                )
            }
            <button onClick={blurNow}>{btn}</button>
        </div>
    );

}

export default Alphanumeric;