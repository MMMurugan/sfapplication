import { LightningElement, wire } from 'lwc';
import getAccounts from '@salesforce/apex/AccountSearch.getAccounts';

const DELAY = 300;
export default class SearchAccount extends LightningElement {

    accountName='';
    accountList =[];
    @wire(getAccounts, {actName:'$accountName'})
    retriveAccounta({error, data}){
        if(data){
            this.accountList = data;
        }
        else if(error){

        }
    }

    // without delay
    handleSearch(event){
        this.accountName = event.target.value;
    }

    //with delay

    handleSearch(event){
        const searchString = event.target.value;
        window.clearTimeout(this.delayTimeout);
        this.delayTimeout = setTimeout (
            ()=>{
                this.accountName = searchString;
            }, DELAY);
    }

}