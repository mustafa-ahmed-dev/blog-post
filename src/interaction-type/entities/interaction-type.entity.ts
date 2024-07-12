import { Expose } from 'class-transformer';

export class InteractionType {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  interaction: string;
}
