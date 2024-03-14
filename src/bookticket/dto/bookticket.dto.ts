import { ApiProperty } from "@nestjs/swagger"

export class bookticketDTO {
    @ApiProperty()
    user_id: number
    @ApiProperty()
    shedule_id: number
    @ApiProperty()
    chair_id: number
}