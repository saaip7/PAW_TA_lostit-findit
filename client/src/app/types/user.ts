// types/user.ts
export interface ApiResponse {
    message: string;     // Response message from the API
    token?: string;      // Optional token if login is successful
    data?: any;          // Any additional data returned from the API
}
  