import { useState } from 'react';

import classes from './Alphanumeric.module.css';

const Alphanumeric = ({ Data, char, changeIndex, result, pushResult, path = "images/A-Za-z0-9" }) => {
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
        <>
            <h2 className={classes.heading} style={{ paddingTop: "1rem" }}>Training For: "{char}"</h2>
            <div className={classes.Alphanumeric}>
                {
                    Data[char].map((item, index) =>
                        <div className={classes.image} key={`${item + item}`}>
                            <img alt={item.slice(0, item.length - 4)} className={btn === 'Confirm' ? active === index ? classes.active : '' : active !== index ? classes.blur : ''} onClick={() => { setActive(index); setImage(item); }} src={`${path}/${char}/${item}`} />
                        </div>
                    )
                }
                <button onClick={blurNow}>{btn}</button>
            </div>
        </>
    );

}

export default Alphanumeric;