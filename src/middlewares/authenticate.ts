import PassportJWT, { StrategyOptionsWithoutRequest } from 'passport-jwt';
import passport from 'passport';
import UserModel from '../models/user.model';
import { Request } from 'express';

const Strategy = PassportJWT.Strategy;

const cookieExtractor = (req: Request) => {
  let token = null;

  if (req && req.cookies) {
    token = req.cookies['token']; // 'token' is the cookie name
  }
  return token;
};

const strategyOpts: StrategyOptionsWithoutRequest = {
  jwtFromRequest: cookieExtractor,
  secretOrKey: process.env.JWT_SECRET || '',
};

passport.use(
  new Strategy(strategyOpts, async (payload, done) => {
    try {
      const isExist = await UserModel.findOne({
        email: payload.email,
      }).lean();

      if (isExist) {
        return done(null, isExist);
      }

      return done(null, false);
    } catch (error) {
      return done(error, false);
    }
  })
);

passport.serializeUser(function (user: Express.User, done) {
  done(null, user);
});

passport.deserializeUser(function (user: Express.User, done) {
  done(null, user);
});

export { passport };
