import { IsEmail, IsOptional, IsString, Matches, MaxLength, MinLength } from "class-validator";


export class CreateUserDTO {

    @IsOptional()
    id_user: number;

    @MinLength(1)
    @IsString()
    fullName: string;

    @IsEmail()
    email: string;

    @IsString()
    @MinLength(6)
    @MaxLength(20)
    @Matches(
        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
            message: 'The password must have a Uppercase, lowercase letter and a number'
        })
    password: string;

    @IsOptional()
    roles: string[]

    @IsOptional()
    isActive: boolean;

}
