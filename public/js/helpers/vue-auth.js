import axios from 'axios';

const BASE_API = 'api/v1/auth';
const LOGIN_ROUTE = BASE_API + '/login';
const RESET_ROUTE = BASE_API + '/reset';
const FORGOT_ROUTE = BASE_API + '/forgot';
const SIGNUP_ROUTE = BASE_API + '/signup';

export default {
    user: {
        authenticated: false,
        displayName: function () {
            return localStorage.getItem('user_email').split('@')[0];
        },
        userID: function () {
            return localStorage.getItem('user_id');
        }
    },
    forgot(formData, cb) {
        axios
            .post(FORGOT_ROUTE, formData)
            .then((res) => {
                if (cb) {
                    cb(null, res.data);
                }
            })
            .catch((err) => {
                if (cb) {
                    cb(err.response.data, null);
                }
            });
    },
    reset(formData, cb) {
        axios
            .post(RESET_ROUTE, formData)
            .then((res) => {
                if (cb) {
                    cb(null, res.data);
                }
            })
            .catch((err) => {
                if (cb) {
                    cb(err.response.data, null);
                }
            });
    },
    login(formData, cb) {
        axios
            .post(LOGIN_ROUTE, formData)
            .then((res) => {
                localStorage.setItem('jwt_token', res.data.token);
                localStorage.setItem('user_id', res.data.id);
                localStorage.setItem('user_email', res.data.email);
                this.user.authenticated = true;
                if (cb) {
                    cb(null, res.data);
                }
            })
            .catch((err) => {
                if (cb) {
                    cb(err.response.data, null);
                }
            });

    },

    signup(formData, cb) {
        axios
            .post(SIGNUP_ROUTE, formData)
            .then((res) => {
                if (cb) {
                    cb(null, res.data);
                }
            })
            .catch((err) => {
                if (cb) {
                    cb(err.response.data, null);
                }
            });
    },

    logout() {
        localStorage.removeItem('jwt_token');
        localStorage.removeItem('user_id');
        localStorage.removeItem('user_email');
    },

    checkAuth() {
        this.user.authenticated = !!localStorage.getItem('jwt_token');
    },
    getAuthHeader() {
        return 'JWT ' + localStorage.getItem('jwt_token');
    }
};