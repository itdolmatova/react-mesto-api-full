import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
    const avatarRef = React.useRef();

    React.useEffect(() => {
        avatarRef.current.value = "";
    }, [props.isOpen]);

    function handleSubmit(e) {
        e.preventDefault();

        props.onUpdateAvatar(avatarRef.current.value);
    }

    function renderForm(props) {
        return (
            <>
                <h2 className="popup__title">Обновить аватар</h2>
                <fieldset className="popup__input-container">
                    <input className="popup__input popup__input_ctrl_src" id="input-src-avatar" name="src" ref={avatarRef} placeholder="Ссылка на картинку" type="url" required />
                    <span className="popup__input-error input-src-avatar-error" />
                </fieldset>
            </>
        )
    }

    return (
        <PopupWithForm name='avatar' formName="popup__form_avatar" formClass="popup__form_avatar" handleSubmit={handleSubmit}
            isOpen={props.isOpen} onClose={props.onClose} children={renderForm} buttonText='Сохранить' />
    )
}

export default EditAvatarPopup;
