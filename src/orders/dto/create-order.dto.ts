import { IsBoolean, IsNumber, IsOptional } from "class-validator";

export class CreateOrderDto {

    @IsNumber()
    total: number;

    @IsBoolean()
    isPending: boolean;

}
