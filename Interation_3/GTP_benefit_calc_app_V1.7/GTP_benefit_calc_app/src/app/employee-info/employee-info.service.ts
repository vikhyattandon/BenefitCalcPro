import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions  } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import { Employee }  from '../shared/employee';
import { Dependent }  from '../shared/dependent';
import { EmployerContribution }  from '../shared/employer-contribution';
import { BenefitPlan }  from '../shared/benefit-plan';
import { BaseService }  from '../shared/base.service';

@Injectable()
export class EmployeeInfoService extends BaseService {
      getEmployeeById (id: Number):  Observable<Array<Employee>> {
        
        let path = this.getRestURL() + '/rest/employees/' + id;  // URL to web API
        let employee = this.getHttp().get(path, {headers: this.getHeaders()})
                        .map(this.extractData).catch(this.handleError);
        return employee;
      }

      getEmployeeByLogin (login: String):  Observable<Array<Employee>> {
        
        let path = this.getRestURL() + '/rest/employees/getEmployeeByLogin?login=' + login;  // URL to web API
        let employee = this.getHttp().get(path, {headers: this.getHeaders()})
                        .map(this.extractData).catch(this.handleError);
        return employee;
      }

      saveDependent (dependent: Dependent): Observable<String> {
        
        let path = this.getRestURL() + '/rest/dependents';  // URL to web API

        let bodyString = JSON.stringify(dependent); // Stringify payload
        let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options       = new RequestOptions({ headers: headers }); // Create a request option
        console.log(JSON.stringify(dependent));

        return this.getHttp().post(path, bodyString, options)
                  .map(res => res.json())
                  .catch(this.handleError);
      }

      deleteDependent(dependent: Dependent): Observable<String>  {
        let path = this.getRestURL() + '/rest/dependents/' + dependent.id;  // URL to web API
        console.log('deleteDependent() called: ' + path);
        return this.getHttp().delete(path)
                        .map(this.extractData).catch(this.handleError);    
      }

      saveEmployee (employee: Employee) {
        
        let path = this.getRestURL() + '/rest/employees';  // URL to web API

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
}