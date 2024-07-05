import { IsString, IsBase64 } from 'class-validator';

export class JwtConfigDto {
  @IsString()
  @IsBase64()
  secret: string;
}
