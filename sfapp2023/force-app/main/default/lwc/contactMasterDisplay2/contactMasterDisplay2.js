import { LightningElement,wire } from 'lwc';
import fetchAllContacts from '@salesforce/apex/ContactManager.fetchAllContacts';
import getAllaccount from '@salesforce/apex/ContactManager.getAllaccount';

import { NavigationMixin } from 'lightning/navigation';
export default class ContactMasterDisplay2 extends LightningElement {
    selectedAccount;
    accountOptions=[];
    // get all account list
    @wire(getAllaccount)
    accountOption({error, data}){
        if(data){
            this.error = undefined;
            for(i=0; i< data.length; i++){
                this.accountOption = [...this.accountOption, {value:data[i].Id, label:data[i].Name}];
            }
        }
        else if(error){
            this.data = undefined;
        }

    }

    @wire(fetchAllContacts)
    contacts;   
    contactId; 
    NavigateToDetails(event){
        this.contactId = event.target.value;
        this[NavigationMixin.Navigate]({
            type:'standard__recordPage',
            attributes:{
                recordId:this.contactId,
                objectApiName:'Contact',
                actionName:'view'
            }           
 
        });
    }      
}