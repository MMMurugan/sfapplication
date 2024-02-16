import { LightningElement, wire } from 'lwc';
import {getRecord} from 'lightning/uiRecordApi';

import NAME_FIELD from '@salesforce/schema/Contact.Name';
import TITLE_FIELD from '@salesforce/schema/Contact.Title';
import PHONE_FIELD from '@salesforce/schema/Contact.Phone';
import EMAIL_FIELD from '@salesforce/schema/Contact.Email';
export default class DisplayContactGetAdapter extends LightningElement {
    contactRecordId;


    contactRecordIdChange(event){
        this.contactRecordId = event.target.value;
    }

    @wire(getRecord, {recordId: '$contactRecordId', fields:[TITLE_FIELD, NAME_FIELD, PHONE_FIELD, EMAIL_FIELD] })
    contactRecord;


    get Title(){
        if(this.contactRecord.data){
            return this.contactRecord.data.fields.Title.value;
        }
    }
    get Name(){
        if(this.contactRecord.data){
            return this.contactRecord.data.fields.Name.value;
        }
    }
    get Phone(){
        if(this.contactRecord.data){
            return this.contactRecord.data.fields.Phone.value;
        }
    }
    get Email(){
        if(this.contactRecord.data){
            return this.contactRecord.data.fields.Email.value;
        }
    }


}