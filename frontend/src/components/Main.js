import React from 'react';
import { CurrentUserContext } from '../context/CurrentUserContext.js';
//import api from '../utils/Api.js';
import Card from './Card';

function Main(props) {
   
    const currentUser = React.useContext(CurrentUserContext);

    return (
        <main>
            <section className="profile">
                <div className="profile__information">
                    <div className="profile__avatar" style={{ backgroundImage: 'url(' + currentUser.avatar + ')' }} />
                    <div className="profile__avatar-editButton" onClick={props.onEditAvatar} />
                    <div className="profile__info">
                        <h1 className="profile__title">{currentUser.name}</h1>
                        <button className="profile__edit-button" onClick={props.onEditProfile} />
                        <p className="profile__subtitle">{currentUser.about}</p>
                    </div>
                </div>
                <button className="profile__add-button" onClick={props.onAddPlace} />
            </section>
            <section className="places">
                <ul className="places__list">
                    {props.cards.map((card) =>
                        <Card key={card._id} onCardClick={props.onCardClick} onCardLike={props.onCardLike} onCardDelete={props.onCardDelete} card={card} />
                    )}

                </ul>
            </section>
        </main>
    )
}

export default Main;