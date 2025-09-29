// config/passport.js

import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
// import User from '../models/User.js'; // Make sure to import your User model

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET, // Use the secret from your .env file
};

export default (passport) => {
  passport.use(
    new JwtStrategy(opts, async (jwt_payload, done) => {
      try {
        // The jwt_payload contains the decoded token data (e.g., user ID)
        // const user = await User.findById(jwt_payload.id);

        // if (user) {
        //   // If user is found, return the user object
        //   return done(null, user);
        // }
        // // If no user is found
        // return done(null, false);
        
        // For now, let's use a mock check until your User model is ready
        if (jwt_payload.id) {
            return done(null, { id: jwt_payload.id }); // Mock user object
        } else {
            return done(null, false);
        }

      } catch (err) {
        console.error(err);
        return done(err, false);
      }
    })
  );
};