import { ApiProperty } from '@nestjs/swagger';

export class cumrapDTO {
  @ApiProperty()
  cumrap_name: string;
  @ApiProperty()
  address: string;
  @ApiProperty()
  theater_id: number;
}
