import { Injectable }     from '@angular/core';
import { Http, Response, Headers   } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import { EmployerContribution }  from './employer-contribution';
import { BenefitPlan }  from './benefit-plan';
import { PlanCost }  from './plan-cost';

@Injectable()
export class BaseService {
      constructor (private http: Http) {        
      }

      getRestURL() {
        return 'http://192.168.99.100:8080';
      }

      getHttp() {
        return this.http;
      }

      getAllBenefitPlanList():  Observable<Array<BenefitPlan>> {
        
        let path = this.getRestURL() + '/rest/benefitPlans';  // URL to web API
        let benefitPlans = this.http.get(path, {headers: this.getHeaders()})
                        .map(this.extractData).catch(this.handleError);
        return benefitPlans;
      }

      getAllPlanCostList():  Observable<Array<PlanCost>> {
        
        let path = this.getRestURL() + '/rest/planCosts';  // URL to web API
        let benefitPlans = this.http.get(path, {headers: this.getHeaders()})
                        .map(this.extractData).catch(this.handleError);
        return benefitPlans;
      }

      getAllEmployerContributions():  Observable<Array<EmployerContribution>> {
        
        let path = this.getRestURL() + '/rest/employerContributions';  // URL to web API
        let employerContributions = this.http.get(path, {headers: this.getHeaders()})
                        .map(this.extractData).catch(this.handleError);
        return employerContributions;
      }

      getMaxReportNumber():  Observable<number> {
        
        let path = this.getRestURL() + '/rest/benefitReports/getMaxReportNumber';
        console.log('path: ' + path);   
                                   
        let maxReportNumber = this.getHttp().get(path, {headers: this.getHeaders()})
                        .map(this.extractData).catch(this.handleError);
        return maxReportNumber;
      }
      
      extractData(res: Response) {
        let body = res.json();  
        console.log('extractData() called');
        return body || { };
      }
      
      handleError (error: Response | any) {
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

      getHeaders(){
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        return headers;
      }
}