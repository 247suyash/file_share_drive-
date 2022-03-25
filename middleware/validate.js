const { validationResult } = require("express-validator");

const handleValidationErrors = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorsArray = errors.array();
    let errorMessages = {};
    errorsArray.forEach((error) => {
      errorMessages[error.param] = error.msg;
    });
    return res
      .status(422)
      .render( 'signup/signup',
      {
          errors: errorMessages
     });
  }

  next();
};
const signinhandleValidationErrors = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorsArray = errors.array();
    let errorMessages = {};
    errorsArray.forEach((error) => {
      errorMessages[error.param] = error.msg;
    });
    return res
      .status(422)
      .render( 'login/login',
      {
          errors: errorMessages
     });
  }

  next();
};


module.exports = {
  handleValidationErrors,
  signinhandleValidationErrors
};
