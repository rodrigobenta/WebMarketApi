import { IsArray, IsNumber } from "class-validator";


export class CreateCartDto {

    @IsNumber()
    id_product: number

    @IsNumber()
    quantity: number;

}
