const Strings = {
    // General
    INVALID_ROUTE: 'Invalid Route, Please check API Documentation for valid routes.',

    // Signup Errors
    INCOMPLETE_INFORMATION: 'Please fill out all the required information.',
    NON_GUC_MAIL: 'Please enter a Valid GUC mail.',
    PASSWORD_MISMATCH: 'Password and password confirmation mismatch.',
    INVALID_PASSWORD: 'The password must be at least 8 characters and includes at least a digit.',
    INVALID_GUC_ID: 'Please enter a Valid GUC ID.',
    USER_ALREADY_EXISTS: 'User already exists.',

    // Signup Success
    SIGNUP_SUCCESS: 'Signed Up Successfully.',

    // Login Errors
    INVALID_CREDIENTIALS: 'Invalid Username/Password.',
    MISSING_CREDIENTIALS: 'Please Enter both the username and password.',

    // Login Success
    LOGIN_SUCCESS: 'Logged In Successfully.',

    // Password Reset Errors
    CHECK_YOU_EMAIL: 'You should recieve an email to reset your password, if the email exists.',
    INVALID_RESET_TOKEN: 'Invalid reset token.',

    // Password Reset Success
    PASSWORD_RESET_SUCCESS: 'Password Changed Successfully.',

    // Add Work Erros
    EMPTY_TITLE: 'The title field is required.',
    EMPTY_WORK: 'You must upload an image of your work, add a demo or repo.',
    NO_PORTFOLIO: 'You need to create a portfolio first.',

    WORK_ADDED: 'Item Added!',
};

module.exports = Strings;