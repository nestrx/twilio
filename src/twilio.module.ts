import { DynamicModule, Global, HttpModule, Module } from '@nestjs/common';
import { TwilioService } from './twilio.service';
import { TWILIO_CONFIG_TOKEN, TwilioConfig } from './twilio.config';

@Global()
@Module({})
export class TwilioModule {
  static forRoot(config: TwilioConfig): DynamicModule {
    config.codeLength = config.codeLength || 4;
    config.locale = config.locale || 'vi';
    return {
      module: TwilioModule,
      imports: [
        HttpModule,
      ],
      providers: [
        { provide: TWILIO_CONFIG_TOKEN, useValue: config },
        TwilioService,
      ],
      exports: [
        TwilioService,
      ],
    };
  }
}
