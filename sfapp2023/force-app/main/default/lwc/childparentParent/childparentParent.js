import { LightningElement, track } from 'lwc';

export default class ChildparentParent extends LightningElement {

   @track searchValue;
   mmobject;
    handleSearchValue(event){
        console.log(event.detail.searchKey);
        this.searchValue = event.detail.searchKey;
    }
    
    handleClick(event){
        console.log('00000000000000', JSON.stringify(event.detail));

    }
}