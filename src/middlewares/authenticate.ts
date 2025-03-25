import PassportJWT, { StrategyOptionsWithoutRequest } from 'passport-jwt'
import passport from 'passport'
import UserModel from '../models/user.model'

const Strategy = PassportJWT.Strategy
const ExtractJwt = PassportJWT.ExtractJwt

const strategyOpts: StrategyOptionsWithoutRequest = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET || ''
}

passport.use(
  new Strategy(strategyOpts, async (payload, done) => {
    try {
      const isExist = await UserModel.findOne({
        email: payload.email
      }).lean()

      if (isExist) {
        return done(null, isExist)
      }

      return done(null, false)
    } catch (error) {
      return done(null, error)
    }
  })
)

export { passport }
