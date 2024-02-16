import { LightningElement, track } from 'lwc';

export default class DataBinding extends LightningElement {
    @track greeting = "Murugan"

    handleEvent(event){
        this.greeting = event.target.value;
    }
}