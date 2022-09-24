import { useState, useEffect } from 'react';

import classes from './Alphanumeric.module.css';
import { randPassGenerator } from './../../utility/randomPassGenerator';

const map = {
    "question mark": "?",
    "ampersand": "&",
    "asterisk": "*",
    "at the rate": "@",
    "caret": "^",
    "dollar": "$",
    "exclamatory": "!",
    "hash": "#",
    "hyphen": "-",
    "percent": "%"
}
const Alphanumeric = ({ Data, char, changeIndex, result, pushResult, path = "images/A-Za-z0-9" }) => {
    const [active, setActive] = useState();
    const [image, setImage] = useState('');
    const [btn, setBtn] = useState('Confirm');
    const [random, setRandom] = useState();

    useEffect(() => {
        let dummy = randPassGenerator(10);
        dummy.splice(Math.floor(Math.random() * 10), 0, `"${map[char] ? map[char] : char}"`)
        setRandom(dummy);
        setImage('');
    }, [char]);

    const blurNow = () => {
        if (btn === 'Next') {
            changeIndex(prev => prev + 1);
            pushResult([...result, `${path}/${char}/${image}`]);
            setBtn('Confirm');
            setImage('');
            setActive();
            window.scrollTo(0, 0);
        }
        else {
            if (image) {
                setBtn('Next');
            }
            else {
                setBtn("Please Select Image");
            }
        }
    }

    return (
        <>
            <h2 className={classes.heading} style={{ paddingTop: "1rem" }}>Training For: {random}</h2>
            <div className={classes.Alphanumeric}>
                {
                    Data[char].map((item, index) =>
                        <div className={classes.image} key={`${item + item}`}>
                            <img alt={item.slice(0, item.length - 4)} className={btn === 'Confirm' || btn === 'Please Select Image' ? active === index ? classes.active : '' : active !== index ? classes.blur : ''} onClick={() => { setActive(index); setImage(item); setBtn("Confirm"); }} src={`${path}/${char}/${item}`} />
                        </div>
                    )
                }
                <button onClick={blurNow}>{btn}</button>
            </div>
        </>
    );

}

export default Alphanumeric;