import { LightningElement, wire } from 'lwc';
import getAccounts from '@salesforce/apex/Accountcls.getAccountList';

export default class Dragger_Component extends LightningElement {

    @wire(getAccounts) accounts;

    handleDragStart(event){
        event.dataTranfer.setData('account_Id', event.target.dataset.item);
    }

}