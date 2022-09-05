import React from 'react';
import { CurrentUserContext } from '../context/CurrentUserContext.js';

function Card(props) {
    const card=props.card;
    const currentUser = React.useContext(CurrentUserContext);
    const isOwn = card.owner._id === currentUser._id;
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    const cardLikeButtonClassName = `place__like  ${isLiked ? "place__like_active" : ""}`; 

    function onCardClick(){
        props.onCardClick(props.card);
    }

    function handleLikeClick(){
        props.onCardLike(props.card);
    }

    function handleDeleteClick(){
        props.onCardDelete(props.card);
    }

    return (
        <li className="place">
            <img className="place__photo" src={card.link} alt={card.name} onClick={onCardClick} />
            <h2 className="place__title">{card.name}</h2>
            <button className={cardLikeButtonClassName} onClick={handleLikeClick} />
            <p className="place__likesCounter">{card.likes.length}</p>
            {isOwn && <button className="place__delete-button" onClick={handleDeleteClick} />}
        </li>
    );
}

export default Card;