import { LightningElement } from 'lwc';
import createAccount from "@salesforce/apex/AccountCreationController.createAccounts";
import ACCOUNT_NAME from '@salesforce/schema/Account.Name';
import ACCOUNT_TYPE from '@salesforce/schema/Account.Type';
import ACCOUNT_PHONE from '@salesforce/schema/Account.Phone';

import {ShowToastEvent} from 'lightning/platformShowToastEvent';

export default class AccountCreattion_Apex extends LightningElement {

    accountId;
    error;
    accountRecord ={
        Name : ACCOUNT_NAME,
        Type : ACCOUNT_TYPE,
        Phone : ACCOUNT_PHONE
    };

    handleNameChange(event){
        this.accountRecord.Name = event.target.value;
    }
    handleTypeChange(event){
        this.accountRecord.Type = event.target.value;
    }
    handlePhoneChange(event){
        this.accountRecord.Phone = event.target.value;
    }

    handleSave(){
        createAccount({accountRecObj:this.accountRecord})
        .then(result =>{
            this.accountRecord = {};
            this.accountId = result.Id;
            console.log("result" , JSON.stringify(result) + this.accountId);
            const toastEvent = new ShowToastEvent({
                title: 'Account Created',
                message:' Account record has been created successfully !',
                variant:'success'
            });
            this.dispatchEvent(toastEvent);
        })
        .catch(error =>{
            this.error = error.message;
        })
    }

}