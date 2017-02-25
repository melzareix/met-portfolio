import axios from 'axios';

const BASE_API = 'api/v1/auth';
const LOGIN_ROUTE = BASE_API + '/login';

export default {
    user: {
        authenticated: false
    },

    login(context, formData, cb){
        axios
            .post(LOGIN_ROUTE, formData)
            .then((res) => {
                localStorage.setItem('jwt_token', res.data.token);
                this.user.authenticated = true;
                if (cb) {
                    cb();
                }
            })
            .catch((err) => {
                context.formErrors = err.response.data.message;
            });

    },

    signup(context, formData, cb){
        axios
            .post(LOGIN_ROUTE, formData)
            .then((res) => {
                localStorage.setItem('jwt_token', res.data.token);
                this.user.authenticated = true;
                if (cb) {
                    cb();
                }
            })
            .catch((err) => {
                context.formErrors = err.response.data.message;
            });
    },

    logout(){
        localStorage.removeItem('jwt_token');
    }
}