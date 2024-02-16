import { LightningElement } from 'lwc';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import NAME_FIELD from '@salesforce/schema/Account.Name';
import PHONE_FIELD from '@salesforce/schema/Account.Phone';

import { createRecord } from 'lightning/uiRecordApi';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';

export default class CreateAccount extends LightningElement {

    name='';
    phone='';
    handleChange(event){
        if(event.target.label == 'Name'){
            this.name = event.target.value;
        }
        if(event.target.label == 'Phone'){
            this.phone = event.target.value;
        }
    }

    createAccount(){
        const fields ={};

        fields[NAME_FIELD.fieldApiName] = this.name;
        fields[PHONE_FIELD.fieldApiName] = this.phone;

        const recordInput = {apiName:ACCOUNT_OBJECT.objectApiName, fields};

        createRecord(recordInput)
        .then(account =>{
            this.accounctId = account.id;
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message:'Account Created',
                    variant:'success',
                }),
            );
        })
        .catch(error =>{
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error creating Account',
                    message: error.body.message,
                    variant: 'error',
                }),
                
            );
            console.log("error", error);    
        });

    }

}