/** App-wide selector constants — avoids magic strings in page objects and steps */
export const Selectors = {
  LOGIN: {
    USERNAME: '#txt-username',
    PASSWORD: '#txt-password',
    BUTTON:   '#btn-login',
    ERROR:    '.text-danger'
  },
  APPOINTMENT: {
    FACILITY:     '#combo_facility',
    READMISSION:  'input[name="hospital_readmission"]',
    VISIT_DATE:   '#txt_visit_date',
    COMMENT:      '#txt_comment',
    BOOK_BUTTON:  'button:has-text("Book Appointment")'
  },
  CONFIRMATION: {
    HEADING:    'h2:has-text("Appointment Confirmation")',
    FACILITY:   '#facility',
    VISIT_DATE: '#visit_date',
    PROGRAM:    '#program',
    COMMENT:    '#comment'
  }
} as const;

/** Time constants in milliseconds */
export const Timeouts = {
  SHORT:      5_000,
  DEFAULT:   15_000,
  LONG:      30_000,
  NAVIGATION: 30_000
} as const;

/** App routes */
export const Routes = {
  LOGIN:       '/profile.php#login',
  APPOINTMENT: '/#appointment',
  HISTORY:     '/#history'
} as const;

/** Healthcare program option values as they appear in the DOM */
export const HealthcarePrograms = {
  MEDICAID:  'Medicaid',
  MEDICARE:  'Medicare',
  NONE:      'None'
} as const;
