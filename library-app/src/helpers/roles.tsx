import { Jwt, roleKey, UserRole } from '../models/jwt.model';
// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode';

export const currentUserAdmin = (token: string) => {
    const decoded: Jwt | '' = token && jwt_decode(token);
    if (decoded === '') return false
    console.log(decoded[roleKey]);
    
    return decoded[roleKey] === UserRole.Admin  
}
export const currentUserLibrarian = (token: string) => {
    const decoded: Jwt | '' = token && jwt_decode(token);
    if(decoded === '') return false
    return decoded[roleKey] === UserRole.Librarian  
}
export const currentUserUser = (token: string) => {
    const decoded: Jwt | '' = token && jwt_decode(token);
    if(decoded === '') return false
    return decoded[roleKey] === UserRole.User  
}
