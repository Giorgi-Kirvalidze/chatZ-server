import {ExtractJwt, Strategy} from 'passport-jwt';
import {PassportStrategy} from '@nestjs/passport';
import {Injectable} from '@nestjs/common';
import {jwtConstants} from './constants';
import {Request as RequestType} from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([(request: RequestType) => {
        let data = request?.cookies["auth-cookie"];
        if (!data) {
          return null;
        }
        return data.token
      }]),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: any) {
    return {userId: payload.sub, username: payload.username};
  }
}
