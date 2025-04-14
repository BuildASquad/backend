import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth2';
import { User } from '@db'; // your User model

passport.use(new GoogleStrategy({
  clientId:process.env.CLIENT_ID,
        clientSecret:process.env.CLIENT_SECRET,
        callbackURL:"/auth/google/callback",
        scope:["profile","email"]
}, async (accessToken, refreshToken, profile, done) => {
  try {
    const existingUser = await User.findOne({ email: profile.emails?.[0].value });

    if (existingUser) {
      return done(null, existingUser);
    }

    const newUser = await User.create({
      email: profile.emails?.[0].value,
      first_name: profile.name?.givenName,
      last_name: profile.name?.familyName,
      photo: profile.photos?.[0].value,
    });
    
    return done(null, newUser);
  } catch (err) {
    return done(err);
  }
}));

passport.serializeUser((user: any, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id: string, done) => {
  const user = await User.findById(id);
  done(null, user);
});
