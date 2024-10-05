
export class Medicamento {
    
    constructor(
        
        public id:number,
        public medicine:string,
        public amount:number,
        public expireDate:Date,
        public description:string
    ) {
        
        this.id=id,
        this.medicine=medicine,
        this.amount=amount,
        this.expireDate=expireDate,
        this.description=description
    }
}