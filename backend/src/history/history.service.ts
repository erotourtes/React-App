import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { History } from './history.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class HistoryService {
  constructor(
    @InjectRepository(History)
    private readonly historyRepository: Repository<History>,
  ) {}

  async findAll() {
    return this.historyRepository.find({ order: { timestamp: 'DESC' } });
  }
}
