import React from 'react';
import imageError from '../images/infoTooltipImageError.svg';
import imageSuccess from '../images/infoTooltipImageOK.svg';

function InfoTooltip(props) {
   const image = props.message.imageType === "error" ? imageError : imageSuccess;

    return (
        <div className={`popup ${props.isOpen ? "popup_opened" : ""}`}>
            <figure className="popup__tooltip-container">
                <img className="popup__tooltip-image" src={image} alt="icon" />
                <figcaption className="popup__tooltip-caption"> 
                    {props.message.text} 
                </figcaption>
                <button className="popup__close-button" onClick={props.onClose} />
            </figure>
        </div>
    );
}

export default InfoTooltip;