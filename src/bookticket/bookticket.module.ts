import { Module } from '@nestjs/common';
import { BookticketService } from './bookticket.service';
import { BookticketController } from './bookticket.controller';

@Module({
  controllers: [BookticketController],
  providers: [BookticketService],
})
export class BookticketModule {}
