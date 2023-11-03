export interface JwtPayload {
  email: string;
  // Ajoutez d'autres champs si nécessaire, par exemple:
  // iat?: number; // Timestamp de la date d'émission
  // exp?: number; // Timestamp de la date d'expiration
  // sub?: string;  // Sujet (généralement l'ID utilisateur)
  // ... autres champs standard ou personnalisés du JWT
}
