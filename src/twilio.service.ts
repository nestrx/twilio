import { HttpService, Inject, Injectable } from '@nestjs/common';
import { catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import * as query from 'querystring';
import { TwilioConfig, TWILIO_CONFIG_TOKEN } from './twilio.config';

@Injectable()
export class TwilioService {
  endpoint = 'https://api.authy.com/protected/json/';
  constructor(@Inject(TWILIO_CONFIG_TOKEN) private config: TwilioConfig,
              private http: HttpService) {
  }

  add(email: string, cellphone: string | number, countryCode: string | number) {
    let user = { email: email, cellphone: cellphone, country_code: countryCode };
    return this.post(this.url('users/new'), { user: user, send_install_link_via_sms: this.config.link });
  }

  remove(authyId: number | string) {
    return this.post(this.url(`users/${authyId}/remove`));
  }

  status(authyId: number | string) {
    return this.get(this.url(`users/${authyId}/status`));
  }

  request(authyId: number | string, via: 'sms' | 'call' = 'sms') {
    return this.get(this.url(`${via}/${authyId}`));
  }

  verify(authyId: number, token: number) {
    return this.get(this.url(`verify/${token}/${authyId}`));
  }

  protected url(uri, params?: any): any {
    return `${this.endpoint}${uri}` + (params ? '?' + query.stringify(params) : '');
  }

  protected get(url: string): Observable<any> {
    return this.http.get(url, {
      headers: {
        'X-Authy-Api-Key': this.config.token,
        'Content-Type': 'application/json',
      },
    }).pipe(map(res => res.data), catchError((err) => of(err.response.data)));
  }

  protected post(url: string, data?: any) {
    return this.http.post(url, data, {
      headers: {
        'X-Authy-Api-Key': this.config.token,
        'Content-Type': 'application/json',
      },
    }).pipe(map(res => res.data), catchError((err) => of(err.response.data)));
  }
}
