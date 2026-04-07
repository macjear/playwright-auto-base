/** Request model for creating a booking (maps to the CURA appointment form) */
export interface AppointmentRequest {
  facility: string;
  hospitalReadmission: boolean;
  healthcareProgram: string;
  visitDate: string;
  comment?: string;
}

/** Generic API error response */
export interface ApiErrorResponse {
  message: string;
  code?: string;
  details?: string[];
}

/** Login request model */
export interface LoginRequest {
  username: string;
  password: string;
}
