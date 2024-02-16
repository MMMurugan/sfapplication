import { LightningElement } from 'lwc';

export default class WorkOrderItemAllCmps extends LightningElement {
    activeTab = '1';
    parentinfo;
     // Active tab functions 
     handleActive(event) {
        this.activeTab = event.target.value;        
       }

       getParentValue(event){
        this.parentinfo = event.detail.name;
        console.log("tabinfo", this.parentinfo);
       }

}