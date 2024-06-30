import { OmitType, PartialType } from '@nestjs/mapped-types';

import { CreateUserDto } from './create-user.dto';

export class UpdateUserEmailDto extends OmitType(CreateUserDto, [
  'firstName',
  'middleName',
  'lastName',
  'dateOfBirth',
  'password',
  'role',
  'username',
]) {}
