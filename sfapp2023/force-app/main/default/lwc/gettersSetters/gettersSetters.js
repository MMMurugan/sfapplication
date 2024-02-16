import { LightningElement } from 'lwc';

export default class GettersSetters extends LightningElement {
name = "Cat";
updatedage = 1;
newage = 0


get age(){
    return this.updatedage;
}

set age(value){
    this.updatedage = value;
}

handleChange(e){
    this.newage = e.target.value;
}

updateAge(){
this.age = this.newage;
}

}