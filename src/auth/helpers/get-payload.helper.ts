import { plainToInstance, instanceToPlain } from 'class-transformer';
import { JwtPayload } from '../classes/jwt-payload';

export function getPayload(data: JwtPayload) {
  const _payload = plainToInstance(JwtPayload, data, {
    excludeExtraneousValues: true,
  });
  const payload = instanceToPlain(_payload) as JwtPayload;

  return payload;
}
