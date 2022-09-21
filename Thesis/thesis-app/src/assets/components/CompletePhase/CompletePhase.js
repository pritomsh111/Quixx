import { useState, useEffect } from 'react';
import classes from './CompletePhase.module.css';

const CompletePhase = ({ state, store }) => {

    return store.map((item, index) => {
        return (
            <div className={classes.CompletePhase}>
                <img className={classes.big} alt={item} key={`${item + index}`} src={item} />
            </div>
        )
    });
}

export default CompletePhase;