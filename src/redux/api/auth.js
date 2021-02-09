import Amplify, {Auth} from "aws-amplify";
import awsconfig from "../../aws-exports";

Amplify.configure(awsconfig);
Auth.configure(awsconfig);

export function userRegister({ email, password }) {
    return Auth.signUp({
        username: email,
        password: password
    });
}

export function emailConfirm({ userName, confirmationCode }) {
    return Auth.confirmSignUp(userName, confirmationCode)
}