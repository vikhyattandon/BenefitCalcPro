import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions  } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import { Employee }  from '../shared/employee';
import { BaseService }  from '../shared/base.service';

@Injectable()
export class EmployeeRegisterService extends BaseService {
      saveEmployee (employee: Employee) {
        
        let path = 'http://localhost:8080/rest/employees';  // URL to web API

        let bodyString = JSON.stringify(employee); // Stringify payload
        let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options       = new RequestOptions({ headers: headers }); // Create a request option
        console.log(JSON.stringify(employee));

        this.getHttp().post(path, bodyString, options)
                  .map(res => res.json())
                  .catch(this.handleError)
                  .subscribe();  
        return;  
      }
/*
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
   
      } */
}