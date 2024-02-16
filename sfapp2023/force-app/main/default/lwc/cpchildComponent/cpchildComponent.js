import { LightningElement } from 'lwc';

export default class CpchildComponent extends LightningElement {
    searchKey;
    handleChange(event){
        this.searchKey = event.target.value;
    
        // create custom event
        const searchEvent = new CustomEvent("getsearvalue",
        {
            detail: this.searchKey
        });
        this.dispatchEvent(searchEvent);
    }
 
}