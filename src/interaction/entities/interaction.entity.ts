import { Expose } from 'class-transformer';

export class Interaction {
  @Expose()
  blogId!: number;

  @Expose()
  interactionTypeId!: number;
}
