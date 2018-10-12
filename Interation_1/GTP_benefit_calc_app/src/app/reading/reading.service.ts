import { Injectable }     from '@angular/core';
import { Http, Response, Headers   } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import { DeviceReadingItem }  from '../shared';

@Injectable()
export class ReadingService {
      constructor (private http: Http) {}
      
      getDeviceReadings (macAddress: string, infoType: String): Observable<DeviceReadingItem> {
        
        let heroesUrl = 'http://localhost:8080/rest/pm25readings/getLastReadingByMacAndInfoType?macAddress=' 
                          + macAddress + '&infoType=' + infoType;  // URL to web API
        let deviceReadings = this.http.get(heroesUrl, {headers: this.getHeaders()})
                        .map(this.extractData).catch(this.handleError);
        return deviceReadings;
      }
      
      private extractData(res: Response) {
        let body = res.json();  
        console.log('log1');
        console.log(body);
        return body || { };
      }
      
      private handleError (error: Response | any) {
        // In a real world app, we might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
          const body = error.json() || '';
          const err = body.error || JSON.stringify(body);
          errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
          errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
   
      }

      private getHeaders(){
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        return headers;
      }
}