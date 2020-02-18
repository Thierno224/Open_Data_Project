const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const LocalStrategy = require('passport-local').Strategy;
const GooglePlusTokenStrategy = require('passport-google-plus-token');
const FacebookTokenStrategy = require('passport-facebook-token');
const config = require('./configuration');
const User = require('./models/user');

const cookieExtractor = req => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies['access_token'];
  }
  return token;
}

// JSON WEB TOKENS STRATEGY
passport.use(new JwtStrategy({
  jwtFromRequest: cookieExtractor,
  secretOrKey: config.JWT_SECRET,
  passReqToCallback: true
}, async (req, payload, done) => {
  try {

    const user = await User.findById(payload.sub);


    if (!user) {
      return done(null, false);
    }

    req.user = user;
    done(null, user);
  } catch(error) {
    done(error, false);
  }
}));

// Google OAuth Strategy
passport.use('googleToken', new GooglePlusTokenStrategy({
 //clientID: config.oauth.google.clientID,
  clientID: '128391228929-e36f2ss7ha7pbufrlcvpdvv95efmbfv8.apps.googleusercontent.com',
  //clientSecret: config.oauth.google.clientSecret,
  clientSecret: 'iywKgC2l0lJlueDvk1VLVzqY',
  passReqToCallback: true,
}, async (req, accessToken, refreshToken, profile, done) => {
  try {

    console.log('profile', profile);
    console.log('accessToken', accessToken);
    console.log('refreshToken', refreshToken);

    if (req.user) {

      req.user.methods.push('google')
      req.user.google = {
        id: profile.id,
        email: profile.emails[0].value
      }
      await req.user.save()
      return done(null, req.user);
    } else {

      let existingUser = await User.findOne({ "google.id": profile.id });
      if (existingUser) {
        return done(null, existingUser);
      }


      existingUser = await User.findOne({ "local.email": profile.emails[0].value })
      if (existingUser) {

        existingUser.methods.push('google')
        existingUser.google = {
          id: profile.id,
          email: profile.emails[0].value
        }
        await existingUser.save()
        return done(null, existingUser);
      }

      const newUser = new User({
        methods: ['google'],
        google: {
          id: profile.id,
          email: profile.emails[0].value
        }
      });

      await newUser.save();
      done(null, newUser);
    }
  } catch(error) {
    done(error, false, error.message);
  }
}));

passport.use('facebookToken', new FacebookTokenStrategy({
  clientID: config.oauth.facebook.clientID,
  clientSecret: config.oauth.facebook.clientSecret,
  passReqToCallback: true
}, async (req, accessToken, refreshToken, profile, done) => {
  try {
    console.log('profile', profile);
    console.log('accessToken', accessToken);
    console.log('refreshToken', refreshToken);

    if (req.user) {

      req.user.methods.push('facebook')
      req.user.facebook = {
        id: profile.id,
        email: profile.emails[0].value
      }
      await req.user.save();
      return done(null, req.user);
    } else {

      let existingUser = await User.findOne({ "facebook.id": profile.id });
      if (existingUser) {
        return done(null, existingUser);
      }

      existingUser = await User.findOne({ "local.email": profile.emails[0].value })
      if (existingUser) {

        existingUser.methods.push('facebook')
        existingUser.facebook = {
          id: profile.id,
          email: profile.emails[0].value
        }
        await existingUser.save()
        return done(null, existingUser);
      }

      const newUser = new User({
        methods: ['facebook'],
        facebook: {
          id: profile.id,
          email: profile.emails[0].value
        }
      });

      await newUser.save();
      done(null, newUser);
    }
  } catch(error) {
    done(error, false, error.message);
  }
}));

// LOCAL STRATEGY
passport.use(new LocalStrategy({
  usernameField: 'email'
}, async (email, password, done) => {
  try {

    const user = await User.findOne({ "local.email": email });


    if (!user) {
      return done(null, false);
    }

    const isMatch = await user.isValidPassword(password);

    if (!isMatch) {
      return done(null, false);
    }

    done(null, user);
  } catch(error) {
    done(error, false);
  }
}));
