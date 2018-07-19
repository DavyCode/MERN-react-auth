'use strict'

module.exports = function (passport, User, tokenForUser, checkAuth, authValidator) {

  const requireLoginAuth = passport.authenticate('local', { session: false });

  return {
    /****************
     * Routing
    ******************************/
    SetRouting (router) {
      router.get('/', checkAuth.requireAuth, this.indexPage);

      router.post('/login', requireLoginAuth, this.login);
      router.post('/register', this.register);
    },
    indexPage: function (req, res) {
      console.log(req.user)
      res.send({ hello: 'hi'})
    },
    /****************
     * User Login
    ******************************/
    async login (req, res, next) {
      // User has already had their email and password auth'd
      // We just need to give them a token
      const token = await tokenForUser.tokenForUser(req.user)
      return res.status(200).json({ token });
    },
    /****************
     * User Register
    ******************************/
    async register (req, res, next) {
      //validate user input
      const validationResult = await authValidator.validateSignupForm(req.body);

      if (!validationResult.success) {
        return res.status(400).json({
          success: false,
          error: validationResult.errors
        });
      }

      const { email, password, username } = req.body;

      await User.findOne({ email: email }, async (err, existingUser) => {
        if(err) { 
          return next(err); 

          // return res.status(400).json({
          //   success: false,
          //   error: err
          // });
        }

        // If a user with email does exist, return an error
        if (existingUser) {
          const error = new Error('User with the given email already exist');
          error.name = 'CredentialDeplicationError';

          return res.status(422).json({
            success: false,
            error: { 
              ...error,
              message: error.message
            }
          }); 
        }

        const user = new User({ email, password, username, fullname: username });

        await user.save(async (err) => {
          if(err){ return next(err); }

          // Repond to request indicating the user was created
          return res.status(200).json({
            userData: { email: email },
            success: true,
          });
        })
      })
    }

  };
};