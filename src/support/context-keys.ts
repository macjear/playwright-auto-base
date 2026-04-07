/**
 * ContextKey — Type-safe keys for the Cucumber scenario context store.
 * Use via: this.setContext(ContextKey.AUTH_TOKEN, value)
 *          this.getContext<string>(ContextKey.AUTH_TOKEN)
 */
export enum ContextKey {
  AUTH_TOKEN       = 'authToken',
  CREATED_USER_ID  = 'createdUserId',
  LAST_API_RESPONSE = 'lastApiResponse',
  APPOINTMENT_REF  = 'appointmentReference',
  SELECTED_FACILITY = 'selectedFacility',
  VISIT_DATE       = 'visitDate'
}
