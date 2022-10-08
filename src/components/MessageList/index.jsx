import { useRef, useLayoutEffect } from 'react';

import { useAuth } from '../../hooks/useAuth';
import { useMessages } from '../../hooks/useMessages';
import './style.css';

import Message from '../Message';

import React from 'react';

const MessageList = ({ roomId }) => {
  const containerRef = useRef(null);
  const { user } = useAuth();
  const messages = useMessages(roomId);

  useLayoutEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  });

  return (
    <div className='message-list-container' ref={containerRef}>
      <ul className='message-list'>
        {messages.map((message) => {
          return (
            <Message
              key={message.id}
              message={message}
              isOwnMessage={message.uid === user.uid}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default MessageList;
