import { LightningElement, wire, track } from 'lwc';

//Toast Message
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

//Importing Field
import NARRATIVE from '@salesforce/schema/Case.Description';

//Importing Apex Methods
import saveCaseRecord from '@salesforce/apex/narrativedetailsController.saveCaseRecord';


export default class NarrativeDetails extends LightningElement {
    @track error;
    @track result;

    // this object have record information
    casrecord = {
        Description: NARRATIVE

    }
    handlechange(event) {
        this.casrecord.Description = event.target.value;

    }

    //Save Functionality
    handleSave() {
        saveCaseRecord({ objcase: this.casrecord })
            .then(result => {
                this.casrecord = {};
                this.dispatchEvent(new ShowToastEvent({
                    title: 'Success!!',
                    message: ' Created Successfully!!',
                    variant: 'success'
                }), );
            })
            .catch(error => {
                //alert('test');
                this.error = error.message;
            });
    }
}