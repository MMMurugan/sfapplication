import { LightningElement } from 'lwc';
import {createRecord} from 'lightning/uiRecordApi';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import NAME_FIELD from '@salesforce/schema/Account.Name';
import PHONE_FIELD from '@salesforce/schema/Account.Phone';
import INDUSTRY_FIELD from '@salesforce/schema/Account.Industry';
import EMPLOYEE_FIELD from '@salesforce/schema/Account.NumberOfEmployees';

import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class CreateAccountUsingCreateAdapter extends LightningElement {
EMPLOYEE_FIELD
    error;
    accountId;
    accountRecord = {
        Name : NAME_FIELD,
        Phone: PHONE_FIELD,
        Industry: INDUSTRY_FIELD,
        NoofEmp: EMPLOYEE_FIELD
    };

    handleOnChange(event){
        if(event.target.name == 'accName' ){
            this.accountRecord.Name = event.target.value;
        }
        else if(event.target.name == 'accPhone'){
            this.accountRecord.Phone = event.target.value;
        }
        else if(event.target.name == 'accIndustry'){
            this.accountRecord.Industry = event.target.value;
        }
        else if(event.target.name == 'accNoofEmp'){
            this.accountRecord.NoofEmp = event.target.value;
        }
    }

    // create account 
    createAccount(event){
        const fields ={};
        fields[NAME_FIELD.fieldApiName] = this.accountRecord.Name;
        fields[PHONE_FIELD.fieldApiName] = this.accountRecord.Phone;
        fields[INDUSTRY_FIELD.fieldApiName] = this.accountRecord.Industry;
        fields[EMPLOYEE_FIELD.fieldApiName] = this.accountRecord.NoofEmp;

        const recordInput = {apiName:ACCOUNT_OBJECT.objectApiName, fields}
        
        createRecord(recordInput)
        .then(result =>{
            this.accountId = result.id;

            const evt =  new ShowToastEvent(
                {
                    title: 'Success',
                    message: 'Account Created',                        
                    variant: 'success',
                }
            );
            this.dispatchEvent(evt);

        })
        .catch(error=>{
           
                const evt =new ShowToastEvent(
                    {
                        title: 'Erroe',
                        message: 'Account Not Created',
                        variant: 'error',
                    }
                )
                this.dispatchEvent(evt);
        })

    }


}