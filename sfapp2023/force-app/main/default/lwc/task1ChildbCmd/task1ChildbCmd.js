import { LightningElement } from 'lwc';

export default class Task1ChildbCmd extends LightningElement {
    searchBy = '';

    handleSearch(event){
        this.searchBy = event.detail.value;

        var searchEvent = new CustomEvent('searchvalue', { detail:        
            {value:this.searchBy}
        });
        // Dispatches the event.
        this.dispatchEvent(searchEvent);

    }



}