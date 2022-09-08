import React, { useState } from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';
import PopupWithForm from './PopupWithForm';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import api from '../utils/Api';
import * as auth from '../utils/Auth';
import { CurrentUserContext } from '../context/CurrentUserContext';

function App() {

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);

  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [infoTooltipMessage, setInfoTooltipMessage] = useState({});

  const [selectedCard, setSelectedCard] = useState({ link: "", open: false });
  const [currentUser, setCurrentUser] = useState({ name: "", about: "", avatar: "" });
  const [cards, setCards] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});
  const history = useHistory();

  React.useEffect(() => {
    api.getUserInfo().then(user => {
      setCurrentUser(user);
    }).catch(err => console.log(err));
  }, [])

  React.useEffect(() => {
    api.getCards().then(cards => {
      setCards(cards);
    }).catch(err => console.log(err));
  }, [])

  React.useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      auth.getUser().then((res) => {
        setIsLoggedIn(true);
        setUserData(res);
        history.push('/cards');
      }).catch(err => console.log(err));
    }
  }, [])

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  };

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  };

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  };

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }

  function handleDeleteCardConfirm() {
    setIsConfirmPopupOpen(true);
  }

  function closeAllPopups() {
    if (isEditAvatarPopupOpen) setIsEditAvatarPopupOpen(false);
    if (isAddPlacePopupOpen) setIsAddPlacePopupOpen(false);
    if (isEditProfilePopupOpen) setIsEditProfilePopupOpen(false);
    if (isConfirmPopupOpen) setIsConfirmPopupOpen(false);
    if (isImagePopupOpen) setIsImagePopupOpen(false);
    if (isInfoTooltipOpen) setIsInfoTooltipOpen(false);
  }

  function handleUpdateUser(obj) {
    api.postUserInfo(obj).then((user) => {
      setCurrentUser(user);
      closeAllPopups();
    }).catch(err => console.log(err));
  }

  function handleUpdateAvatar(src) {
    api.editAvatar(src).then((user) => {
      setCurrentUser(user);
      closeAllPopups();
    }).catch(err => console.log(err));
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(like => like._id === currentUser._id);

    const promise = isLiked ? api.deleteLike(card._id) : api.setLike(card._id);

    promise.then((newCard) => {
      setCards(prevCards => prevCards.map((c) => c._id === card._id ? newCard : c));
    }).catch((err) => console.log(err));
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id).then(() => {
      setCards(prevCards => prevCards.filter((c) => c._id !== card._id))
    }).catch((err) => { console.log(err) });
  }

  function handleAddPlaceSubmit(newCard) {
    api.postCard(newCard.name, newCard.link).then((card) => {
      setCards(prevCards => [card, ...prevCards]);
      closeAllPopups();
    }).catch((err) => { console.log(err) });
  }

  function handleLogin(password, email) {
    auth.login(password, email)
      .then((res) => {
        localStorage.setItem('token', res.token);
        setIsLoggedIn(true);
        history.push('/cards');
      }).catch((err) => {
        setInfoTooltipMessage({ text: "Что-то пошло не так! Попробуйте еще раз.", imageType: "error" });
        setIsInfoTooltipOpen(true);
      })
  }

  function handleRegister(password, email) {
    auth.register(password, email)
      .then((res) => {
        setInfoTooltipMessage({ text: "Вы успешно зарегистрировались!", imageType: "ok" });
        setIsInfoTooltipOpen(true);
        history.push('/sign-in');
      }).catch((err) => {
        setInfoTooltipMessage({ text: "Что-то пошло не так! Попробуйте еще раз.", imageType: "error" });
        setIsInfoTooltipOpen(true);
      })
  }

  function confirm(props) {
    return (
      <h2 className="popup__title">Вы уверены?</h2>
    )
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header userData={userData} />
        <div className="page__content">

          <Switch>
            <Route exact path="/">
              {isLoggedIn ? <Redirect to="/cards" /> : <Redirect to="/sign-in" />}
            </Route>
            <ProtectedRoute
              path="/cards"
              loggedIn={isLoggedIn}
              component={Main}
              onEditAvatar={handleEditAvatarClick} onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick} onCardClick={handleCardClick} onDeleteCard={handleDeleteCardConfirm}
              cards={cards} onCardLike={handleCardLike} onCardDelete={handleCardDelete}
            />
            <Route path="/sign-in">
              <Login handleLogin={handleLogin} />
            </Route>
            <Route path="/sign-up">
              <Register handleRegister={handleRegister} />
            </Route>
          </Switch>
          <Footer />


        </div>

        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />
        <PopupWithForm name='confirm' formName="popup__form_confirm" formClass="popup__form_confirm"
          isOpen={isConfirmPopupOpen} onClose={closeAllPopups} children={confirm} submitButton="Да" />
        <ImagePopup name='image' card={selectedCard} isOpen={isImagePopupOpen} onClose={closeAllPopups} />
        <InfoTooltip isOpen={isInfoTooltipOpen} onClose={closeAllPopups} message={infoTooltipMessage} />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
