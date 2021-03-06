export interface Dependent {
    id:number, 
    firstName:string, 
    lastName:string,
    birthday:Date,
    type:string,
    employeeId:number,
    medicalPlanFlag:boolean,
    dentalPlanFlag:boolean,
    visionPlanFlag:boolean,
    createTs:number,
    createTsStr:string                
}