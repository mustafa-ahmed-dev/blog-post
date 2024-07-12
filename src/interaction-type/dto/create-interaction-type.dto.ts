import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateInteractionTypeDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 25)
  name!: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 50)
  interaction!: string;
}
