import React from 'react';
import styles from '../styles/Message.module.css';

function Message(props) {
  if(props.messageType == 'message') {
    return ( 
    <div className={styles.messageWrapper}>
      <div className={`${styles.message}  ${props.isOwn ? styles.ownMessage : styles.otherMessage}`}>
        <p>{props.username}</p>
        <p>{props.messageText}</p>
      </div>
    </div>
    );
  } else {
    return (
      <div className={styles.connectionMessage}>
        <span>{props.username} joined the chat</span>
      </div>
    )
  }
};

export default Message;
