const { validationResult } = require("express-validator");

/**
 * Validates express validations passed in the request.
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const forgetValidationErrors = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorsArray = errors.array();
        let errorMessages = {};
        errorsArray.forEach((error) => {
            errorMessages[error.param] = error.msg;
        });
        console.log("check email error", errorsArray.param)
        return res
            .render('login/forget', {
                errors: errorMessages
            });
    }

    next();
};
module.exports = {
    forgetValidationErrors
};
