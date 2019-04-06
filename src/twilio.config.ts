export interface TwilioConfig {
  token: string;
  link?: boolean,
  locale?: string,
  codeLength?: number
}

export const TWILIO_CONFIG_TOKEN = 'twilio_config';
