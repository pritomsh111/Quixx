import React, { useState, useEffect } from 'react';

import Modal from 'react-modal';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

Modal.setAppElement('#root');
const Popup = (props) => {
    return (
        <Modal
            isOpen={props.shown}
            onRequestClose={() => { props.setShown(false) }}
            style={customStyles}
            contentLabel="Information"
        >
            {props.children}
        </Modal>
    )
}

export default Popup;