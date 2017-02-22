/**
 * @swagger
 * definitions:
 *   SignUpResponse:
 *     type: object
 *     required:
 *       - status
 *       - message
 *     properties:
 *       status:
 *         type: integer
 *       message:
 *         type: string
 *         format: password
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
 *         format: password
 */

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