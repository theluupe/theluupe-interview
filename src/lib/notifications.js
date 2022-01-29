import React from 'react';
import { store } from 'react-notifications-component';
import isFunction from 'lodash/isFunction';

const defaultNotification = {
  type: 'danger',
  title: 'Oh no!',
  message: `An unknown error has occurred. We’ve sent this issue to our tech team and we’ll investigate what is going on. Don’t worry, we saved your progress up to this step.`,
  insert: 'bottom',
  container: 'bottom-center',
  width: 748,
  animationIn: ['animated', 'fadeInUp'],
  animationOut: ['animated', 'fadeOutDown'],
  dismiss: {
    duration: 5000,
    pauseOnHover: true,
  },
};

function Notification({ id, type, title, message, onClose, onDetailsClick }) {
  return (
    <div className={`alert alert-${type}`} style={{ width: '100%' }} role="alert">
      <div className="alert-text">
        <strong>{title}</strong> <span>{message}</span>
      </div>
      <div className="d-flex align-items-center">
        {isFunction(onDetailsClick) && (
          <button type="button" onClick={() => onDetailsClick(id)} className="btn btn-alert text-nowrap">
            View Details
          </button>
        )}
        <button
          type="button"
          onClick={() => {
            if (isFunction(onClose)) {
              onClose(id);
            }
            store.removeNotification(id);
          }}
          className="btn btn-alert text-nowrap"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export function addNotification(props) {
  // Only run on client
  if (typeof window !== 'undefined') {
    const notif = { ...defaultNotification, ...props };
    store.addNotification({
      ...notif,
      content: ({ id }) => (
        <Notification
          id={id}
          type={notif.type}
          title={notif.title}
          message={notif.message}
          onClose={notif.onClose}
          onDetailsClick={notif.onDetailsClick}
        />
      ),
    });
  }
}
