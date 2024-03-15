import { ApiProperty } from '@nestjs/swagger';

export class raphimDTO {
  @ApiProperty()
  rapphim_name: string;
  @ApiProperty()
  cumrap_id: number;
}
