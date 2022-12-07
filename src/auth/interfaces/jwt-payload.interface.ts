export interface JwtPayload {
    id_user: number;
    
    email: string;

    roles: string[];

    //añadimos todas las propiedades 
    //que queremos.
}