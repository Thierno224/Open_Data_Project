const JWT = require('jsonwebtoken');
const User = require('../models/user');
const { JWT_SECRET } = require('../configuration');

signToken = user => {
  return JWT.sign({
    iss: 'CodeWorkr',
    sub: user.id,
    iat: new Date().getTime(),
    exp: new Date().setDate(new Date().getDate() + 1)
  }, JWT_SECRET);
}

module.exports = {
  signUp: async (req, res, next) => {
    const { email, password } = req.value.body;

    let foundUser = await User.findOne({ "local.email": email });
    if (foundUser) {
      return res.status(403).json({ error: 'Email is already in use'});
    }


    foundUser = await User.findOne({
      $or: [
        { "google.email": email },
        { "facebook.email": email },
      ]
    });
    if (foundUser) {

      foundUser.methods.push('local')
      foundUser.local = {
        email: email,
        password: password
      }
      await foundUser.save()

      const token = signToken(foundUser);

      res.cookie('access_token', token, {
        httpOnly: true
      });
      res.status(200).json({ success: true });
    }

    const newUser = new User({
      methods: ['local'],
      local: {
        email: email,
        password: password
      }
    });

    await newUser.save();

    const token = signToken(newUser);

    res.cookie('access_token', token, {
      httpOnly: true
    });
    res.status(200).json({ success: true });
  },

  signIn: async (req, res, next) => {
    // Generate token
    const token = signToken(req.user);
    res.cookie('access_token', token, {
      httpOnly: true
    });
    res.status(200).json({ success: true });
  },

  signOut: async (req, res, next) => {
    res.clearCookie('access_token');

    res.json({ success: true });
  },

  googleOAuth: async (req, res, next) => {

    const token = signToken(req.user);
    res.cookie('access_token', token, {
      httpOnly: true
    });
    res.status(200).json({ success: true });
  },

  linkGoogle: async (req, res, next) => {
    res.json({
      success: true,
      methods: req.user.methods,
      message: 'Successfully linked account with Google'
    });
  },

  unlinkGoogle: async (req, res, next) => {
    // Delete Google sub-object
    if (req.user.google) {
      req.user.google = undefined
    }
    // Remove 'google' from methods array
    const googleStrPos = req.user.methods.indexOf('google')
    if (googleStrPos >= 0) {
      req.user.methods.splice(googleStrPos, 1)
    }
    await req.user.save()

    // Return something?
    res.json({
      success: true,
      methods: req.user.methods,
      message: 'Successfully unlinked account from Google'
    });
  },

  facebookOAuth: async (req, res, next) => {
    // Generate token
    const token = signToken(req.user);
    res.cookie('access_token', token, {
      httpOnly: true
    });
    res.status(200).json({ success: true });
  },

  linkFacebook: async (req, res, next) => {
    res.json({
      success: true,
      methods: req.user.methods,
      message: 'Successfully linked account with Facebook'
    });
  },

  unlinkFacebook: async (req, res, next) => {
    // Delete Facebook sub-object
    if (req.user.facebook) {
      req.user.facebook = undefined
    }
    // Remove 'facebook' from methods array
    const facebookStrPos = req.user.methods.indexOf('facebook')
    if (facebookStrPos >= 0) {
      req.user.methods.splice(facebookStrPos, 1)
    }
    await req.user.save()

    // Return something?
    res.json({
      success: true,
      methods: req.user.methods,
      message: 'Successfully unlinked account from Facebook'
    });
  },

  dashboard: async (req, res, next) => {
    console.log('I managed to get here!');
    res.json({
      secret: "resource",
      methods: req.user.methods
    });
  },

  checkAuth: async (req, res, next) => {
    console.log('I managed to get here!');
    res.json({ success: true });
  }
}
