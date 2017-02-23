// ===============================================================================================================
/**
 *  SIGNUP DEFINITIONS
 */
// ===============================================================================================================

/**
 * @swagger
 * definitions:
 *   SignUpSuccessResponse:
 *     type: object
 *     required:
 *       - status
 *       - message
 *     properties:
 *       status:
 *         type: integer
 *       message:
 *         type: string
 */

/**
 * @swagger
 * definitions:
 *   SignUpFailure:
 *     type: object
 *     required:
 *       - status
 *       - message
 *     properties:
 *       status:
 *         type: integer
 *       message:
 *         type: string
 */

// ===============================================================================================================
/**
 *  LOGIN DEFINITIONS
 */
// ===============================================================================================================

/**
 * @swagger
 * definitions:
 *   SignUpParameters:
 *     type: object
 *     required:
 *       - email
 *       - password
 *       - confirmPassword
 *       - firstName
 *       - lastName
 *       - gucId
 *     properties:
 *      email:
 *         description: GUC Email to register with.
 *         in: body
 *         required: true
 *         type: string
 *      password:
 *         description: The Desired password.
 *         in: body
 *         required: true
 *         type: string
 *      confirmPassword:
 *         description: The password Confirmation.
 *         in: body
 *         required: true
 *         type: string
 *      firstName:
 *         description: The Student First Name.
 *         in: body
 *         required: true
 *         type: string
 *      lastName:
 *         description: The Student Last Name.
 *         in: body
 *         required: true
 *         type: string
 *      gucId:
 *         description: The Student GUC ID.
 *         in: body
 *         required: true
 *         type: string
 */


/**
 * @swagger
 * definitions:
 *   LoginParameters:
 *     type: object
 *     required:
 *       - email
 *       - password
 *     properties:
 *      email:
 *         description: Student GUC Email.
 *         in: body
 *         required: true
 *         type: string
 *      password:
 *         description: Student Password.
 *         in: body
 *         required: true
 *         type: string
 */

/**
 * @swagger
 * definitions:
 *   LoginSuccessResponse:
 *     type: object
 *     required:
 *       - status
 *       - token
 *       - message
 *     properties:
 *       status:
 *         type: integer
 *       token:
 *         type: string
 *       message:
 *         type: string
 */

/**
 * @swagger
 * definitions:
 *   LoginFailureResponse:
 *     type: object
 *     required:
 *       - status
 *       - message
 *     properties:
 *       status:
 *         type: integer
 *       message:
 *         type: string
 */

// ===============================================================================================================
/**
 *  FORGOT PASSWORD DEFINITIONS
 */
// ===============================================================================================================

/**
 * @swagger
 * definitions:
 *   ForgotPwdParameters:
 *     type: object
 *     required:
 *       - email
 *     properties:
 *       email:
 *         type: string
 */

/**
 * @swagger
 * definitions:
 *   PwdResetSuccess:
 *     type: object
 *     required:
 *       - status
 *       - message
 *     properties:
 *       status:
 *         type: integer
 *       message:
 *         type: string
 */

/**
 * @swagger
 * definitions:
 *   ResetPwdParameters:
 *     type: object
 *     required:
 *       - token
 *       - password
 *       - confirmPassword
 *     properties:
 *       token:
 *         type: string
 *       password:
 *         type: string
 *       confirmPassword:
 *         type: string
 */