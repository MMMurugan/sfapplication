import { LightningElement, track } from 'lwc';

export default class ReferralType extends LightningElement {
     @track value = '';

    get options() {
        return [
            { label: 'Add New Program to an Existing Provider', value: 'option1' },
            { label: 'Add New Provider', value: 'option2' },
        ];
    }

    handleSave(){
        
    }
}