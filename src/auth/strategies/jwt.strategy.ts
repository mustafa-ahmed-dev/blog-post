import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';

import { JwtPayload } from '../classes/jwt-payload';

import { AppConfigService } from '@/common/config/config.service';
import { getPayload } from '../helpers/get-payload.helper';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly appConfigService: AppConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: appConfigService.jwtConfig.secret,
    } as StrategyOptions);
  }

  validate(payload: JwtPayload) {
    return getPayload(payload);
  }
}
