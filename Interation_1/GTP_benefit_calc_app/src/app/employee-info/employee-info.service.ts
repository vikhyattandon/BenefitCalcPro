import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions  } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import { Employee }  from '../shared/employee';
import { Dependent }  from '../shared/dependent';
import { EmployerContribution }  from '../shared/employer-contribution';
import { BenefitPlan }  from '../shared/benefit-plan';

@Injectable()
export class EmployeeInfoService {
      constructor (private http: Http) {        
      }
      
      getEmployee (id: Number):  Observable<Array<Employee>> {
        
        let path = 'http://localhost:8080/rest/employees/' + id;  // URL to web API
        let employee = this.http.get(path, {headers: this.getHeaders()})
                        .map(this.extractData).catch(this.handleError);
        return employee;
      }

      saveDependent (dependent: Dependent): Observable<String> {
        
        let path = 'http://localhost:8080/rest/dependents';  // URL to web API

        let bodyString = JSON.stringify(dependent); // Stringify payload
        let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options       = new RequestOptions({ headers: headers }); // Create a request option
        console.log(JSON.stringify(dependent));

        return this.http.post(path, bodyString, options)
                  .map(res => res.json())
                  .catch(this.handleError);
      }

      deleteDependent(dependent: Dependent): Observable<String>  {
        let path = 'http://localhost:8080/rest/dependents/' + dependent.id;  // URL to web API
        console.log('deleteDependent() called: ' + path);
        return this.http.delete(path)
                        .map(this.extractData).catch(this.handleError);    
      }

      saveEmployee (employee: Employee) {
        
        let path = 'http://localhost:8080/rest/employees';  // URL to web API

        let bodyString = JSON.stringify(employee); // Stringify payload
        let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options       = new RequestOptions({ headers: headers }); // Create a request option
        console.log(JSON.stringify(employee));

        this.http.post(path, bodyString, options)
                  .map(res => res.json())
                  .catch(this.handleError)
                  .subscribe();  
        return;  
      }

      private extractData(res: Response) {
        let body = res.json();  
        console.log('log1' + body);
        return body || { };
      }
      
      private handleError (error: Response | any) {
        // In a real world app, we might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
          const body = error.json() || '';
          const err = body.error || JSON.stringify(body);
          errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
          console.log('TEST1:' + error.status);
        } else {
          errMsg = error.message ? error.message : error.toString();
          console.log('TEST2');
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