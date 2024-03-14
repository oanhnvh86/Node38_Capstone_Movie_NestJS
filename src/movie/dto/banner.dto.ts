import { ApiProperty } from "@nestjs/swagger"

export class bannerDTO {
    @ApiProperty()
    movie_id:number
    @ApiProperty()
    image: string
}