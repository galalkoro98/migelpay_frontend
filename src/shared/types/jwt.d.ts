interface JwtPayload {
    id: string;
    email: string;
    role: 'user' | 'admin';
    iat: number; // issued at
    exp: number; // expiration time
}