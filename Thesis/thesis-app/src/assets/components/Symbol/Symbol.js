import { useState } from 'react';
import Alphanumeric from '../Alphanumeric/Alphanumeric';
import Pronunciation from '../Pronunciation/Pronunciation';

import classes from './Symbol.module.css';

const path = "images/Special Symbols";
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
            : selectedOption === 'Shapes' ? <Alphanumeric {...props} path={path} char={map[props.char]} /> : selectedOption === 'Meaning/Pronunciation' ? <Pronunciation {...props} char={map[props.char]} /> : ''
    );

}

export default Symbol;