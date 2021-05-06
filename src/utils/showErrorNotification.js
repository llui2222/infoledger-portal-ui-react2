import {showNotification} from "../redux/actions/notifications";
import { store } from "../redux";

export default function showErrorNotification(error) {
    store.dispatch(
        showNotification({
            message: error.message,
            options: {
                key: new Date().getTime() + Math.random(),
                variant: 'error'
            },
        })
    )
}