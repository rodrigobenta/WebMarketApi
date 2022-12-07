import { IsNumber, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class CreateProductDto {

    @IsOptional()
    id_product: number;

    @IsString()
    @MinLength(6)
    @MaxLength(20)
    name: string;

    @IsNumber()
    price: number;

    @IsNumber()
    @IsOptional()
    quantity: number;

}
