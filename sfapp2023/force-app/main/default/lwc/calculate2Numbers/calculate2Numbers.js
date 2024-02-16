import { LightningElement } from 'lwc';
import getSumResult from '@salesforce/apex/CalculateNumbers.getSumResult';

export default class Calculate2Numbers extends LightningElement {

    firstNumber;
    secondNumber;
    sum;
    error;

    handleClick(){
        getSumResult({fNumber:this.firstNumber, sNumber:this.secondNumber})
        .then(result =>{
            this.sum = result;
        })
        .catch(error =>{
            this.error = error;
        })
    }

    handleChange(event){
        if(event.target.name === "fstNumber"){
            this.firstNumber = event.target.value;
        }
        else if(event.target.name === "scdNumber"){
            this.secondNumber = event.target.value;
        }
    }
}