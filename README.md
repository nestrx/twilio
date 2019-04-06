# TWILIO
The Twilio module api Users and OTP for [NestJS framework](https://nestjs.com/).

## Installation

npm: 
```bash
npm i @nestrx/twilio
```
yan
```bash
yan add @nestrx/twilio
```

## Configure


app.module.ts
```ts
...
@Module({
	...
	imports: [
		...
		HttpModule,
		TwilioModule.forRoot({
			token: 'your_app_token',
		}),
		...
	],
	...
})
...
```

## Usage

your.service.ts

```ts
...
@Injectable()
export class YourService {
  constructor(private twilio: TwilioService) {
  }
...
```

