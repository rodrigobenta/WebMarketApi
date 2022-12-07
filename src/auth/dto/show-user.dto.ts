import { IsEmail, IsOptional, IsString, MinLength } from "class-validator";

export class ShowUserDTO {
    @MinLength(1)
    @IsString()
    fullName: string;

    @IsEmail()
    email: string;

    @IsOptional()
    roles: string[]
}