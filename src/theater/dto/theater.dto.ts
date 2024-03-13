import { ApiProperty } from "@nestjs/swagger"

export class theaterDTO {
    @ApiProperty()
    theater_name: string
    @ApiProperty()
    logo: string
}