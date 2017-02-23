const Strings = {
    // General
    INVALID_ROUTE: 'Invalid Route, Please check API Documentation /api/v1/docs for valid routes.',

    // Signup Errors
    INCOMPLETE_INFORMATION: 'Please fill out all the required information.',
    NON_GUC_MAIL: 'Please enter a Valid GUC mail.',
    PASSWORD_MISMATCH: 'Password and password confirmation mismatch.',
    INVALID_PASSWORD: 'The password must be at least 8 characters and includes at least a digit.',
    INVALID_GUC_ID: 'Please enter a Valid GUC ID.',
    USER_ALREADY_EXISTS: 'Email already exists.',

    // Signup Success
    SIGNUP_SUCCESS: 'Signed Up Successfully.',

    // Login Errors
    INVALID_CREDIENTIALS: 'Invalid Username/Password.',
    MISSING_CREDIENTIALS: 'Please Enter both the username and password.',

    // Login Success
    LOGIN_SUCCESS: 'Logged In Successfully.'
};

module.exports = Strings;