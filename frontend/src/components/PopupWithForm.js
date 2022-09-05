import React from 'react';

function PopupWithForm(props) {
  return (
    <div className={`popup popup_type_${props.name} ${props.isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <form className={`popup__form ${props.formClass}`} name={props.formName} onSubmit={props.handleSubmit}>
          {props.children(props)}
          <button type="submit" className="popup__submit-button popup__button">{props.buttonText}</button>
        </form>
        <button className="popup__close-button " onClick={props.onClose} />
      </div>
    </div>
  )
}

export default PopupWithForm;