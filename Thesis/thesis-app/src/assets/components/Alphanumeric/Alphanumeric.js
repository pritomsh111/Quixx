import { useState, useEffect, useCallback } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Popup from './../Popup/Popup';

import classes from './Alphanumeric.module.css';

import { randPassGenerator } from './../../utility/randomPassGenerator';
import { map } from '../../utility/constants';

const Alphanumeric = ({ passChar, setPassChar, mainChar, indexNumber, Data, char, changeIndex, result, pushResult, path = "images/A-Za-z0-9", capital }) => {
    const [active, setActive] = useState();
    const [image, setImage] = useState('');
    const [btn, setBtn] = useState('Confirm');
    const [random, setRandom] = useState();
    const [pressedKey, setPressedKey] = useState('');

    const [modal, setModal] = useState(false);
    const [segmentInput, setSegmentInput] = useState('');
    const [modalText, setModalText] = useState('');
    useEffect(() => {
        let dummy = randPassGenerator(10);
        dummy.splice(Math.floor(Math.random() * 10), 0, `"${map[char] ? map[char] : capital ? char.toUpperCase() : char}"`);
        setRandom(dummy);
        setImage('');
    }, [char, capital]);

    // const windowKeyPress = useCallback(({ key }) => {
    //     setPressedKey(key);
    //     setBtn('Key Pressed!');
    // }, []);

    // useEffect(() => {
    //     document.addEventListener('keyup', ({ key }) => {
    //         setPressedKey(key);
    //         setBtn('Key Pressed!');
    //     });
    //     return () => {
    //         document.removeEventListener('keyup', ({ key }) => {
    //             setPressedKey(key);
    //             setBtn('Key Pressed!');
    //         });
    //     };
    // }, []);

    const helper = () => {
        changeIndex(prev => prev + 1);
        pushResult([...result, `${path}/${char}/${image}`]);
        setBtn('Confirm');
        setImage('');
        setActive();
        window.scrollTo(0, 0);
        setModalText('');
    }

    const cancelHelper = () => {
        changeIndex(prev => prev - 2);
        pushResult(prev => {
            console.log(prev.slice(0, -2));
            return prev.length ? prev.slice(0, -2) : [];
        });
        setModal(false);
        setBtn('Confirm');
        setImage('');
        setActive();
        window.scrollTo(0, 0);
        setModalText('');
    }

    const keyHandler = ({ key }) => {
        setPressedKey(key);
        setBtn('Key Pressed!');
    }
    const eventKeyStart = () => {
        document.addEventListener('keyup', keyHandler);
    }
    const eventKeyEnd = () => {
        document.removeEventListener('keyup', keyHandler);
    }

    const blurNow = () => {
        if (btn !== 'Press Key') {
            if (image) {
                setBtn('Press Key');
                eventKeyStart();
            }
            else {
                setBtn("Please Select Image");
                eventKeyEnd();
            }
        }
        else if (btn === 'Press Key') {
            if ((capital && char.toUpperCase() === pressedKey) || (!capital && char === pressedKey)) {
                setPassChar(prev => prev + mainChar);
                if (indexNumber % 3 === 2) {
                    setModal(true);
                }
                else {
                    helper();
                }
            }
        }
    }

    const checkPassword = () => {
        if (segmentInput !== passChar) {
            setModalText("Wrong! Taking You 3 Steps Back!");
            setTimeout(() => { cancelHelper(); }, 2000);
        }
        else {
            setModalText("Congratulations! Moving Forward!");
            setTimeout(() => { helper(); }, 2000);
        }
        setTimeout(() => {
            setModal(false);
            setSegmentInput('');
            setPassChar('');
        }, 2000);
    }

    return (modal ?
        <Popup setPassChar={setPassChar} shown={modal} setShown={setModal}>
            {
                !modalText ?
                    <div className={classes.segmentInput}>
                        <label htmlFor="segment">Write 3 Previously Learned Characters</label>
                        <input autoFocus autoComplete="off" id="segment" type="text" value={segmentInput} onChange={({ target }) => { setSegmentInput(target.value) }} placeholder="Example: $7c"></input>
                        <button type="submit" onClick={checkPassword}>Submit</button>
                    </div>
                    : <h2>{modalText}</h2>
            }
        </Popup>
        : <>
            <ToastContainer />
            <h2 className={classes.heading} style={{ paddingTop: "1rem" }}>Training For: {random}</h2>
            <div className={classes.Alphanumeric}>
                {
                    Data[char].map((item, index) =>
                        <div className={classes.image} key={`${item + item}`}>
                            <img alt={item.slice(0, item.length - 4)} className={(btn === 'Confirm' || btn === 'Please Select Image') ? (active === index && capital) ? classes.capital : active === index ? classes.active : "" : active !== index ? classes.blur : ''} onClick={() => { setActive(index); setImage(item); setBtn("Confirm"); }} src={`${path}/${char}/${item}`} />
                        </div>
                    )
                }
                <button onClick={blurNow}>{btn}</button>
            </div>
        </>
    );
}

export default Alphanumeric;