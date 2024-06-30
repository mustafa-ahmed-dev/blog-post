import { Injectable } from '@nestjs/common';
import argon2 from 'argon2';

@Injectable()
export class HashService {
  async hash(password: string): Promise<string> {
    return argon2.hash(password);
  }

  async compare(text: string, hash: string): Promise<boolean> {
    return argon2.verify(hash, text);
  }
}
