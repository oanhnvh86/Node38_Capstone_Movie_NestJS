import { ApiProperty } from '@nestjs/swagger';
import { Decimal } from '@prisma/client/runtime/library';

export class scheduleDTO {
  @ApiProperty()
  theater_id: number;
  @ApiProperty()
  movie_id: number;
  @ApiProperty()
  showtime_date: Date;
  @ApiProperty()
  price: number;
}
