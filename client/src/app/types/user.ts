// types/user.ts

export interface UserSignUp {
    nama: string;        // User's name
    email: string;       // User's email
    password: string;    // User's password
    noHP: string;  // User's WhatsApp number
  }
  
  export interface UserLogin {
    email: string;       // User's email for login
    password: string;    // User's password for login
  }
  
  export interface ApiResponse {
    message: string;     // Response message from the API
    token?: string;      // Optional token if login is successful
    data?: any;          // Any additional data returned from the API
  }
  