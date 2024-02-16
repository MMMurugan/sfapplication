import { LightningElement } from 'lwc';

export default class BasicCalculation extends LightningElement {
firstInput;
secondInput;
totalValue;
showResult = false;

firstInputChange(e){
    this.firstInput = e.target.value;
}

secondInputChange(e){
    this.secondInput = e.target.value;
}

addition(event){
    this.totalValue = Number(this.firstInput) + Number(this.secondInput);
    this.showResult= true;
}
subtraction(event){
    this.totalValue = Number(this.firstInput) - Number(this.secondInput);
    this.showResult= true;
}
multiplication(event){
    this.totalValue = Number(this.firstInput) * Number(this.secondInput);
    this.showResult= true;
}
division(event){
    this.totalValue = Number(this.firstInput) / Number(this.secondInput);
    this.showResult= true;
}

}