import React from 'react';
import { CurrentUserContext } from '../context/CurrentUserContext';
import PopupWithForm from './PopupWithForm';

function EditProfilePopup(props) {

    // Подписка на контекст
    const currentUser = React.useContext(CurrentUserContext);
    const [name, setName] = React.useState("");
    const [description, setDescription] = React.useState("");

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [props.isOpen]);

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateUser({
            name: name,
            about: description,
        });
    }

    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeDescription(e) {
        setDescription(e.target.value);
    }

    function renderForm(props) {
        return (
            <>
                <h2 className="popup__title">Редактировать профиль</h2>
                <fieldset className="popup__input-container">
                    <input className="popup__input popup__input_ctrl_name" id="input-name" type="text" name="name" value={name} onChange={handleChangeName} placeholder="Имя" minLength={2} maxLength={40} required />
                    <span className="popup__input-error input-name-error" />
                    <input className="popup__input popup__input_ctrl_job" id="input-job" type="text" name="job" value={description} onChange={handleChangeDescription} placeholder="О себе" minLength={2} maxLength={200} required />
                    <span className="popup__input-error input-job-error" />
                </fieldset>
            </>
        )
    };

    return (
        <PopupWithForm name='profile' formName="popup__form_profile" formClass="" handleSubmit={handleSubmit}
            isOpen={props.isOpen} onClose={props.onClose} children={renderForm} buttonText='Сохранить' />
    )
}

export default EditProfilePopup;