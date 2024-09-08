import React from 'react';
import styles from '../styles/Chat.module.css';
import Message from './Message';

function Chat(props) {

    function handleKeyDown(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            props.sendMessage();
        };
    };

  return (
    <div className={styles.chat}>
        <div className={styles.info}>
            <button onClick={props.exit} className={styles.exitBtn}>
                <svg width="25px" height="25px" viewBox="0 0 1024 1024" fill="#FFFFFF" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M669.6 849.6c8.8 8 22.4 7.2 30.4-1.6s7.2-22.4-1.6-30.4l-309.6-280c-8-7.2-8-17.6 0-24.8l309.6-270.4c8.8-8 9.6-21.6 2.4-30.4-8-8.8-21.6-9.6-30.4-2.4L360.8 480.8c-27.2 24-28 64-0.8 88.8l309.6 280z" fill="" /></svg>
            </button>
            <span className={styles.chatTitle}>
                Chat name
            </span>
        </div>
        <div className={styles.messages}>
            {props.messages.map((message, index) => {
                return (
                <Message 
                    messageType={message.event}
                    messageText={message.message}
                    username={message.username}
                    isOwn={message.username === props.currentUser}
                    key={index}
                />
            )
            })}
        </div>
        <div className={styles.messageBox}>
            <input
                value={props.value}
                onChange={props.onChange}
                placeholder="Message..." 
                type="text" 
                className={styles.messageInput}
                onKeyDown={handleKeyDown}
            />
            <button 
                onClick={props.sendMessage} 
                className={styles.sendButton}
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 664 663">
                    <path fill="none" d="M646.293 331.888L17.7538 17.6187L155.245 331.888M646.293 331.888L17.753 646.157L155.245 331.888M646.293 331.888L318.735 330.228L155.245 331.888"></path>
                    <path strokeLinejoin="round" strokeLinecap="round" strokeWidth="33.67" stroke="#6c6c6c" d="M646.293 331.888L17.7538 17.6187L155.245 331.888M646.293 331.888L17.753 646.157L155.245 331.888M646.293 331.888L318.735 330.228L155.245 331.888"></path>
                </svg>
            </button>
        </div>
    </div>
  );
};

export default Chat;
