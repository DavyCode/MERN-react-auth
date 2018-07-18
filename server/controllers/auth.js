'use strict'

module.exports = function (passport, User, tokenForUser, checkAuth) {

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
        res.send({ token }); 
    },
    /****************
     * User Register
    ******************************/
    async register (req, res, next) {
      const { email, password } = req.body;

      if(!email || !password) {
        return res.status(422).send({ error: 'Email and password required'})
      }

      await User.findOne({ email: email }, async (err, existingUser) => {
        if(err) { return next(err); }

        // If a user with email does exist, return an error
        if (existingUser) { return res.status(422).send({ error: 'Email is in use' }); }

        const user = new User({ email, password });

        await user.save(async (err) => {
          if(err){ return next(err); }

          // const token = await this.tokenForUser(user)
          // Repond to request indicating the user was created
          const token = await tokenForUser.tokenForUser(user)
          
          res.json({ token });
        })
      })
    }

  };
};