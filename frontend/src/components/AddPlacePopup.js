import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {
    const [name, setName] = React.useState("");
    const [link, setLink] = React.useState("");
    React.useEffect(() => {
        setName('');
        setLink('');
    }, [props.isOpen]);

    function handleSubmit(e) {
        e.preventDefault();
        props.onAddPlace({
            name: name,
            link: link
        });
    }

    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeLink(e) {
        setLink(e.target.value);
    }

    function renderForm(props) {
        return (
            <>
                <h2 className="popup__title">Новое место</h2>
                <fieldset className="popup__input-container">
                    <input className="popup__input popup__input_ctrl_name" id="input-place-name" type="text" name="name" value={name} onChange={handleChangeName} placeholder="Название" minLength={2} maxLength={30} required />
                    <span className="popup__input-error input-place-name-error" />
                    <input className="popup__input popup__input_ctrl_src" id="input-src" name="src" value={link} onChange={handleChangeLink} placeholder="Ссылка на картинку" type="url" required />
                    <span className="popup__input-error input-src-error" />
                </fieldset>
            </>
        )
    }

    return (
        <PopupWithForm name='addPlace' formName="popup__form_card" formClass="popup__form_add-place" handleSubmit={handleSubmit}
            isOpen={props.isOpen} onClose={props.onClose} children={renderForm} buttonText='Создать' />
    )
}

export default AddPlacePopup