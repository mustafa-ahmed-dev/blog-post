import { Injectable } from '@nestjs/common';

import { HashService } from '@/common/services/hash.service';

@Injectable()
export class AuthService {
  constructor(private readonly hashService: HashService) {}
}
