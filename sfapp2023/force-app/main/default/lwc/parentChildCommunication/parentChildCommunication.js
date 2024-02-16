import { LightningElement, api } from 'lwc';
export default class ParentChildCommunication extends LightningElement {

    @api mmvalue;

    connectedCallback(){
        console.log("parent info", JSON.stringify(this.mmvalue));
    }

}