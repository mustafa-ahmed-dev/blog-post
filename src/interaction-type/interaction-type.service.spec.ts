import { Test, TestingModule } from '@nestjs/testing';
import { InteractionTypeService } from './interaction-type.service';

describe('InteractionTypeService', () => {
  let service: InteractionTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InteractionTypeService],
    }).compile();

    service = module.get<InteractionTypeService>(InteractionTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
