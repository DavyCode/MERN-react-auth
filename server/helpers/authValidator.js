'use strict'

module.exports = function (validator) {
  return {
    /**
 * Validate the login form
 *
 * @param {object} payload - the HTTP body message
 * @returns {object} The result of validation. Object contains a boolean validation result,
 *                   errors tips, and a global message for the whole form.
 */
    // validateLoginForm(payload){
    //   const errors = {};
    //   let isFormValid = true;
    //   let message = '';

    //   if (!payload || typeof payload.email !== 'string' || payload.email.trim().length === 0) {
    //     isFormValid = false;
    //     errors.email = 'Please provide a valid email address.';
    //   }
    
    //   if (!payload || typeof payload.password !== 'string' || payload.password.trim().length === 0) {
    //     isFormValid = false;
    //     errors.password = 'Please provide a valid password.';
    //   }
    
    //   if (!isFormValid) {
    //     message = 'Check the form for errors.';
    //   }
    
    //   return {
    //     success: isFormValid,
    //     message,
    //     errors
    //   };
    // },
    /**
   * Validate the sign up form
   *
   * @param {object} payload - the HTTP body message
   * @returns {object} The result of validation. Object contains a boolean validation result,
   *                   errors tips, and a global message for the whole form.
   */
    validateSignupForm(payload){
      const errors = {};
      let isFormValid = true;
      let message = '';

      if (!payload || typeof payload.email !== 'string' || !validator.isEmail(payload.email)) {
        isFormValid = false;
        errors.email = 'Please provide a correct email address.';
      }

      if (!payload || typeof payload.password !== 'string' || payload.password.trim().length < 8) {
        isFormValid = false;
        errors.password = 'Password must have at least 8 characters.';
      }

      if (!payload || typeof payload.username !== 'string' || payload.username.trim().length === 0) {
        isFormValid = false;
        errors.name = 'Please provide a valid username.';
      }

      if (!isFormValid) {
        errors.message = 'Check the form for errors.';
      }

      return {
        success: isFormValid,
        errors
      };
    }

  }
}
