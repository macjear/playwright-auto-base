/** Confirmation response returned after a successful booking */
export interface AppointmentResponse {
  facility: string;
  hospitalReadmission: string;
  healthcareProgram: string;
  visitDate: string;
  comment: string;
}

/** Login response model */
export interface LoginResponse {
  token?: string;
  redirectUrl?: string;
  error?: string;
}
