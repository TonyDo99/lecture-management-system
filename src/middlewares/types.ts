// Define a custom interface for the authenticated user
export interface IAuthenticatedUser {
  id: string;
  email: string;
  role: string; // Add other fields if needed
}

export interface IAuthRequest extends Request {
  user: IAuthenticatedUser;
}
