export const SHOW_NOTIFICATION = 'SHOW_NOTIFICATION';
export const CLOSE_NOTIFICATION = 'CLOSE_NOTIFICATION';
export const REMOVE_NOTIFICATION = 'REMOVE_NOTIFICATION';

export const showNotification = (notification) => {
    const key = notification.options && notification.options.key;

    return {
        type: SHOW_NOTIFICATION,
        notification: {
            ...notification,
            key: key || new Date().getTime() + Math.random(),
        },
    };
};

export const closeNotification = key => ({
    type: CLOSE_NOTIFICATION,
    dismissAll: !key,
    key,
});

export const removeNotification = key => ({
    type: REMOVE_NOTIFICATION,
    key,
});
