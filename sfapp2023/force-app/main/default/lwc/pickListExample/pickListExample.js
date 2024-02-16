import { LightningElement, wire } from 'lwc';
import { getPicklistValues, getObjectInfo} from 'lightning/uiObjectInfoApi';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import TYPE_FIELD from '@salesforce/schema/Account.Type';
import CONTACT_OBJECT from '@salesforce/schema/Contact';
import LeadSource from '@salesforce/schema/Contact.Email';
export default class PickListExample extends LightningElement {

    selectedValue;
    objectApiName;
    objectInfo;
    get options(){
        return [
                { label: 'New', value : 'new' },
                { label: 'In Progress', value : 'inProgress' },
                { label: 'Completed', value : 'completed' }
            ];
    } 

    handleChange(event){
         this.selectedValue = event.target.value
    }

    /***** get picklist value from fields ********/
   
    @wire(getObjectInfo, { objectApiName: CONTACT_OBJECT })
    contactInfo;

    @wire(getPicklistValues,
        {
            recordTypeId: '$contactInfo.data.defaultRecordTypeId',
            fieldApiName: LeadSource
        }
    )
    leadSourceValues;

    connectedCallback(){
        console.log("mmmm", this.leadSourceValues);
    }

}