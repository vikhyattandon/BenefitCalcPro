export class TodoItem {
  constructor(public text: string, public completed: boolean) {
  }
}

export class Quote  {
  constructor(public text: string) {
  }
}

export class DeviceReadingItem {
    constructor(public id:number, 
                public macAddress:string, 
                public infoType:string,
                public longitude:number,
                public latitude:number,
                public value:number,
                public createTs:number,
                public createTsStr:string) {}
}