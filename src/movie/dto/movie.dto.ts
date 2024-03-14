import { ApiProperty } from "@nestjs/swagger"

export class movieDTO {
    @ApiProperty()
    movie_name: string
    @ApiProperty()
    trailer:string
    @ApiProperty()
    image:string
    @ApiProperty()
    description:string
    @ApiProperty()
    premiere_date: Date
    @ApiProperty()
    rate: number 
    @ApiProperty()
    is_hot: boolean
    @ApiProperty()
    is_showing_date: boolean
    @ApiProperty()
    is_upcoming_date : boolean
}