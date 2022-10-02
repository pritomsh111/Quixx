import { useState } from 'react';
import Alphanumeric from '../Alphanumeric/Alphanumeric';

import classes from './Symbol.module.css';

import { Data } from '../../data/image';
import { Pronunciation } from '../../data/pronunciation';
import { Color } from '../../data/Color';

import { DiffMap, Images, Labels } from '../../utility/constants';

const path = "images/Special Symbols";
const path2 = "images/Pronunciation";
const path3 = "images/Color";

const Symbol = (props) => {
    const [selectedOption, setSelectOption] = useState();

    return (
        !selectedOption ?
            <div className={classes.Symbol}>
                <h1>Select Your Interest</h1>
                <div className={classes.first}>
                    {
                        Images.map((item, index) =>
                            <div onClick={() => setSelectOption(Labels[index])} className={classes.image} key={item} >
                                <div className={classes.img} >
                                    <img id={item} alt={item} src={`${path}/${item}`} />
                                </div>
                                <label htmlFor={item}>{Labels[index]}</label>
                            </div>
                        )
                    }
                </div>
            </div>
            : selectedOption === 'Shapes' ? <Alphanumeric {...props} Data={Data} path={path} char={DiffMap[props.char]} /> : selectedOption === 'Meaning/Pronunciation' ? <Alphanumeric {...props} Data={Pronunciation} path={path2} char={DiffMap[props.char]} /> : selectedOption === 'Color' ? <Alphanumeric {...props} Data={Color} path={path3} char={DiffMap[props.char]} /> : ''
    );

}

export default Symbol;