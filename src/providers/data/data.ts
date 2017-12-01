import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the DataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataProvider {

  public base_url:string = 'https://rakhi.crystalbiltech.com/service/api/';
 // public img_url:string = 'http://trading-env.fhz5dvv2dd.us-east-2.elasticbeanstalk.com/admin/uploads/players/';
  constructor(public http: Http) {
    console.log('Hello DataProvider Provider');
  }

}
