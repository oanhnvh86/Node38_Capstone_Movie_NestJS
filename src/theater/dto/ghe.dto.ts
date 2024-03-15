import { ApiProperty } from '@nestjs/swagger';

export class gheDTO {
  @ApiProperty()
  chair_name: string;
  @ApiProperty()
  chair_type: string;
  @ApiProperty()
  rapphim_id: number;
}
