import { IsBoolean, IsNumber, IsOptional } from "class-validator";
import { User } from "src/auth/entities/user.entity";
import { Product } from "src/products/entities/product.entity";

export class CreateOrderDto {

    items: Product[];

    user: User;

    @IsNumber()
    total: number;

    @IsBoolean()
    isPending: boolean;

}
