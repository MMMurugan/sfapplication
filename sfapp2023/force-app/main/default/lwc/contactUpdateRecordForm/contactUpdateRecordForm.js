import { LightningElement, api } from 'lwc';
import Contact_Email from '@salesforce/schema/Contact.Email';
import Contact_Phone from '@salesforce/schema/Contact.Phone';
import Contact_LastName from '@salesforce/schema/Contact.LastName';
import Contact_FirstName from '@salesforce/schema/Contact.FirstName';
import Contact_Account from '@salesforce/schema/Contact.AccountId';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';

export default class ContactUpdateRecordForm extends LightningElement {
    
    @api recordId;
    @api objectApiName;
    fieldList = [Contact_Email, Contact_Phone, Contact_LastName, Contact_FirstName];

    handleContactUpdate(event){
        const evt = new ShowToastEvent({
            title : 'Contact Update',
            message : 'Contact Record'+ event.detail.LastName.value +'is Successfully Updated',
            variant : 'success',
        });
        this.dispatchEvent(evt);
    }
}