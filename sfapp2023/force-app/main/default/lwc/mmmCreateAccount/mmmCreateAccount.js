import { LightningElement, wire, api } from 'lwc';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import NAME_FIELD from '@salesforce/schema/Account.Name';
import PHONE_FIELD from '@salesforce/schema/Account.Phone';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import {createRecord} from 'lightning/uiRecordApi';
import { NavigationMixin } from "lightning/navigation";
import displayAccounts from "@salesforce/apex/AccountController.displayAccounts";
import updateAccRecords from "@salesforce/apex/AccountController.updateRecords";
import { refreshApex } from "@salesforce/apex";

export default class MmmCreateAccount extends LightningElement {

    name = '';
    phone = '';

    accountId;
    @api errerMessage;
    // get account list from apex
    @wire(displayAccounts) account;

    updateAccount(event){
        this.accountId = event.target.value;
        updateAccRecords({
            accId: this.accountId
        })
        .then(()=>{
            return refreshApex(this.account)
        })
        .catch((error)=>{
            this.errerMessage = error;
            console.log("unable to update the record"+ JSON.stringify(this.errerMessage));

        })

    }


    handleChange(event){
        if(event.target.label == 'Name'){
            this.name = event.target.value;
        }
        if(event.target.label == 'Phone'){
            this.phone = event.target.value;
        }
    }
    createAccount(){
        let fields = {};
        fields[NAME_FIELD.fieldApiName] = this.name;
        fields[PHONE_FIELD.fieldApiName] = this.phone;
        const recordInput = {apiName : ACCOUNT_OBJECT.objectApiName, fields};

        createRecord(recordInput)
        .then(result=>{
            console.log("create record", result);
            this.accountId  = result.id;
                this.dispatchEvent(
                    new ShowToastEvent({
                        title : 'Success',
                        message : 'Account Created',
                        variant : 'success',
                    }),
                );

                //*********** navigating to the record details page */
                // this[NavigationMixin.Navigate]({
                //     type: 'standard__recordPage',
                //     attributes : {
                //         recordId : result.id,
                //         objectApiName : 'Account',
                //         actionName : 'View'
                //     }
                // });
                this[NavigationMixin.Navigate]({
                    type: 'standard__recordPage',
                    attributes: {
                        recordId: result.id,
                        objectApiName: 'Account', // objectApiName is optional
                        actionName: 'edit'
                    }
                });
        })
        .catch(error =>{
            this.dispatchEvent(
                new ShowToastEvent({
                    title : 'Error Creating Record',
                    message : error.body.message,
                    variant : 'error',
                }),
            );
        })

    }
}