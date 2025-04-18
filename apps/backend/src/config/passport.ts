import passport from 'passport';
import { User } from '@db';
import { Strategy as GoogleStrategy} from 'passport-google-oauth2';
import { Strategy as GitHubStrategy} from 'passport-github2';

export const setupGoogleStrategy = () => {
  passport.use(
    new GoogleStrategy({
      clientID: process.env.CLIENT_ID!,
      clientSecret: process.env.CLIENT_SECRET!,
      callbackURL: '/auth/google/callback',
      scope: ['profile', 'email']
    },
    async (accessToken: any, refreshToken: any, profile: any, done: any) => {
      try {
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
          user = new User({
            googleId: profile.id,
            first_name: profile.given_name,
            last_name: profile.family_name,
            email: profile.emails[0].value,
            photo: profile.photos[0].value
          });
          await user.save();
        }
        console.log(user)
        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    })
  );

  passport.serializeUser((user: any, done) => {
    done(null, user);
  });

  passport.deserializeUser((user: any, done) => {
    done(null, user);
  });
};

export const setupGitHubStrategy = () => {
  passport.use(
    new GitHubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID!,
        clientSecret: process.env.GITHUB_CLIENT_SECRET!,
        callbackURL: "/auth/github/callback",
        scope: ['profile', 'email']
      },
      async (accessToken: any, refreshToken: any, profile: any, done: any) => {
        console.log(profile)
        try 
        {
          let user = await User.findOne({ githubId: profile.id });
          const displayName = profile.displayName;
          const [first_name, last_name = ""] = displayName?.split(" ") || [];
          if (!user) 
          {
            user = new User({
            githubId : profile.id,
            first_name: first_name,
            last_name: last_name,
            email : profile.emails?.[0]?.value,
            photo : profile.photos?.[0]?.value
            });
            await user.save();
          }
          // console.log(user)
          return done(null, user);
        } 
        catch (error) {
          return done(error, null);
        }
      }
    )
  );

  passport.serializeUser((user: any, done) => {
    done(null, user);
  });

  passport.deserializeUser((user: any, done) => {
    done(null, user);
  });
}


