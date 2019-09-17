import React from 'react';

const NotificationAdd = ({ message }) => {
    const notificationStyle = {
        color: 'green',
        background: 'grey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }

    if (message === null) {
      return null
    }
  
    return (
      <div style={notificationStyle}>
        {message}
      </div>
    )
  }

export default NotificationAdd