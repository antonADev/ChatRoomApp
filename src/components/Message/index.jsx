import React from 'react';
import './styles.css';

const Message = ({ message, isOwnMessage }) => {
  const { displayName, text } = message;

  return (
    <li className={['message', isOwnMessage && 'own-message'].join(' ')}>
      <h4 className='sender'>{isOwnMessage ? 'You' : displayName}</h4>
      <div>{text}</div>
    </li>
  );
};

export default Message;
