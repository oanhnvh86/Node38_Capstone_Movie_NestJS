import { ApiProperty } from '@nestjs/swagger';

export class registerDTO {
  @ApiProperty()
  full_name: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
  @ApiProperty()
  phone: string;
  @ApiProperty()
  type: string;
}
