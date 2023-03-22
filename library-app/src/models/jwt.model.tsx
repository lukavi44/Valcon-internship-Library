export const emailKey = 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'
export const roleKey = 'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'

export enum UserRole {
    Admin = 'Admin',
    User = 'User',
    Librarian = 'Librarian'
}
export interface Jwt {
    [emailKey]: string
    jti: string
    [roleKey]: UserRole
    exp: number
    iss: string
    aud: string
}