import React from 'react';

function ImagePopup(props) {

    return (
        <div className={`popup popup_image ${props.isOpen ? "popup_opened" : ""}`}>
            <figure className="popup__image-container">
                <img className="popup__image-photo" src={props.card.link} alt={props.card.name} />
                <figcaption>{props.card.name}
                    <button className="popup__close-button" onClick={props.onClose} />
                </figcaption>
            </figure>
        </div>
    );
}

export default ImagePopup;