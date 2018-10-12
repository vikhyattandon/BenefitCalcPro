export interface BenefitPlan {
    id:number, 
    type:string, 
    provider:string,
    name:string,
    minAge:number,
    maxAge:number,  
    cost:number                
}