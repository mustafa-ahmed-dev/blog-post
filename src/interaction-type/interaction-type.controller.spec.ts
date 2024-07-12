import { Test, TestingModule } from '@nestjs/testing';
import { InteractionTypeController } from './interaction-type.controller';
import { InteractionTypeService } from './interaction-type.service';

describe('InteractionTypeController', () => {
  let controller: InteractionTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InteractionTypeController],
      providers: [InteractionTypeService],
    }).compile();

    controller = module.get<InteractionTypeController>(InteractionTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
