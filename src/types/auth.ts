import { JwtPayload } from "jsonwebtoken";

export interface CustomJwtPayload extends JwtPayload {
  role_id: number; // Ajuste conforme as propriedades do seu token
  // Adicione outras propriedades específicas do seu payload, se necessário
}
