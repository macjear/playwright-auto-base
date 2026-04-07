export interface EnvironmentConfig {
  baseUrl: string;
  apiUrl: string;
}

const environments: Record<string, EnvironmentConfig> = {
  local: {
    baseUrl: 'https://katalon-demo-cura.herokuapp.com',
    apiUrl:  'https://katalon-demo-cura.herokuapp.com'
  },
  staging: {
    baseUrl: process.env.STAGING_BASE_URL ?? 'https://katalon-demo-cura.herokuapp.com',
    apiUrl:  process.env.STAGING_API_URL  ?? 'https://katalon-demo-cura.herokuapp.com'
  },
  production: {
    baseUrl: process.env.PROD_BASE_URL ?? 'https://katalon-demo-cura.herokuapp.com',
    apiUrl:  process.env.PROD_API_URL  ?? 'https://katalon-demo-cura.herokuapp.com'
  }
};

const env = process.env.ENV ?? 'local';

if (!environments[env]) {
  throw new Error(`Unknown environment: "${env}". Valid values are: ${Object.keys(environments).join(', ')}`);
}

export const config: EnvironmentConfig = environments[env];
