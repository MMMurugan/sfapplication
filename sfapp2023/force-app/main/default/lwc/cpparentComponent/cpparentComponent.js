import { LightningElement } from 'lwc';

export default class CpparentComponent extends LightningElement {
    searchValue;

    handleSearchValue(event){
        this.searchValue = event.detail;
    }


}