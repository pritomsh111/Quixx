import { useState } from 'react';
import Alphanumeric from '../Alphanumeric/Alphanumeric';

import { Data } from '../../data/image';
import { Pronunciation } from '../../data/pronunciation';
import { Color } from '../../data/Color';

import classes from './Symbol.module.css';

const path = "images/Special Symbols";
const path2 = "images/Pronunciation";
const path3 = "images/Color";

const map = {
    "?": "question mark",
    "&": "ampersand",
    "*": "asterisk",
    "@": "at the rate",
    "^": "caret",
    "$": "dollar",
    "!": "exclamatory",
    "#": "hash",
    "-": "hyphen",
    "%": "percent"
}
const Symbol = (props) => {
    const [selectedOption, setSelectOption] = useState();

    const images = ["Symbols.png", "Meaning-Pronunciation.png", "Colors.png"];
    const labels = ["Shapes", "Meaning/Pronunciation", "Color"];

    return (
        !selectedOption ?
            <div className={classes.Symbol}>
                <h1>Select Your Interest</h1>
                <div className={classes.first}>
                    {
                        images.map((item, index) =>
                            <div onClick={() => setSelectOption(labels[index])} className={classes.image} key={item} >
                                <div className={classes.img} >
                                    <img id={item} alt={item} src={`${path}/${item}`} />
                                </div>
                                <label htmlFor={item}>{labels[index]}</label>
                            </div>
                        )
                    }
                </div>
            </div>
            : selectedOption === 'Shapes' ? <Alphanumeric {...props} Data={Data} path={path} char={map[props.char]} /> : selectedOption === 'Meaning/Pronunciation' ? <Alphanumeric {...props} Data={Pronunciation} path={path2} char={map[props.char]} /> : selectedOption === 'Color' ? <Alphanumeric {...props} Data={Color} path={path3} char={map[props.char]} /> : ''
    );

}

export default Symbol;