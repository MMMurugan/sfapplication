import { LightningElement } from 'lwc';
import ACCOUNT_NAME from '@salesforce/schema/Account.Name';
import ACCOUNT_TYPE from '@salesforce/schema/Account.Type';
import ACCOUNT_INDUSTRY from '@salesforce/schema/Account.Industry';

import {ShowToastEvent} from 'lightning/platformShowToastEvent';

export default class AccountCreateRecordForm extends LightningElement {

    objectApiName= "Account";

    fieldList = [ACCOUNT_NAME, ACCOUNT_TYPE, ACCOUNT_INDUSTRY];

    handleAccountCreate(event){

        const evt = new ShowToastEvent({
            title : 'Success',
            message : 'Account Created',
            variant : 'success',
        });
        this.dispatchEvent(evt);
    }
}