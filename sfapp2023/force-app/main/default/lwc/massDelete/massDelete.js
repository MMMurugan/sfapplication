import { LightningElement, wire } from 'lwc';
import getContactList from '@salesforce/apex/MassDeleteContacts.getContactList';
import deleteContacts from '@salesforce/apex/MassDeleteContacts.deleteContacts';
import {refeshApex} from '@salesforce/apex';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';

export default class MassDelete extends LightningElement {

    @wire(getContactList) contactList;
    selectContactList = [];

    columns = [
        {label:'First Name', fieldName:'FirstName', type:'text'},
        {label:'Last Name', fieldName:'LastName', type:'text'}
    ];

    selectRows(event){
        const selectedRows = event.detail.selectedRows;
        this.selectContactList = [];

        for(let i=0; i< selectedRows.length; i++){
            this.selectContactList.push(selectedRows[i].Id);
        }
        console.log("mmmmmm", this.selectContactList);
        
    }

    deleteSelectedRecords(){
        deleteContacts({selcontactList:this.selectContactList})
        .then(result=>{
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message:'Selected Contacts are Deleted',
                    variant:'success',
                }),
            );
            this.template.querySelector('lightning-datatable').selectedRows = [];
            return refeshApex(this.contactList);
        })
        .catch(error =>{

        })
    }

}