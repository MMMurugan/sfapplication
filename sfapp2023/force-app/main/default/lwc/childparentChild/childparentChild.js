import { LightningElement } from 'lwc';

export default class ChildparentChild extends LightningElement {
    searchKey;

    myobj={name: 'murugan', age : 36, sex : 'male'}

    handleChange(event){
        this.searchKey = event.target.value;
       // myobj.searchkey = this.searchKey;

        //create event
        const searchEvent = new CustomEvent("getsearchvalue", 
        {
            detail :
            {
                searchKey : this.searchKey,               
            } 
        });
        this.dispatchEvent(searchEvent);
    }

    handleClick(){
        const objEvent = new CustomEvent("getcheildvalue",
        {
            detail:
            {
                localobj : this.myobj
            }
        });
        this.dispatchEvent(objEvent);
    }
}