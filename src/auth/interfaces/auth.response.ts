import type { User } from "@/interfaces/user.interface";


// This works for Login, Register and CheckStatus
export interface AuthResponse {
  user:  User;
  token: string;
}


