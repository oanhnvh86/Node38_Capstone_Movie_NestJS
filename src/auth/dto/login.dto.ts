import { ApiProperty } from "@nestjs/swagger"

export class loginDTO {
    @ApiProperty()
    email: string
    @ApiProperty()
    password: string
}