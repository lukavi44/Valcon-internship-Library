import { Jwt, roleKey, UserRole } from '../models/jwt.model';
// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode';
import { getAccessToken } from './manageLocalStorage';

export const currentUserAdmin = () => {
    const token = getAccessToken() || ''
    const decoded: Jwt | '' = token && jwt_decode(token);
    if (decoded === '') return false
    return decoded[roleKey] === UserRole.Admin  
}
export const currentUserLibrarian = () => {
    const token = getAccessToken() || ''
    const decoded: Jwt | '' = token && jwt_decode(token);
    if(decoded === '') return false
    return decoded[roleKey] === UserRole.Librarian  
}
export const currentUserUser = () => {
    const token = getAccessToken() || ''
    const decoded: Jwt | '' = token && jwt_decode(token);
    if(decoded === '') return false
    return decoded[roleKey] === UserRole.User  
}
