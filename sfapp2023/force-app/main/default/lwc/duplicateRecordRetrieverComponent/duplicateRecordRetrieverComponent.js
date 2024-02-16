import { LightningElement, track } from 'lwc';
import getUniqueRecords from '@salesforce/apex/DuplicateRecordRetriever.getUniqueRecords'

export default class DuplicateRecordRetrieverComponent extends LightningElement {

    finalRecords = [];

    connectedCallback() {
        // Make the Apex call using the fetch API (imperative method)
        this.callApexMethod();
    }

    callApexMethod() {
        getUniqueRecords()
            .then(result => {
                console.log("result", result);
                this.finalRecords = result;                
            })
            .catch(error => {
                console.error('Error calling Apex method: ' + error);
            });
    }
}