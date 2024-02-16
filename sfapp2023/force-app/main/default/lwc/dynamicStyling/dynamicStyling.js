import { LightningElement } from 'lwc';

export default class DynamicStyling extends LightningElement {

    customclass = 'mmm';
    bodyClass=false;
 
    addClass(){
        this.template.querySelector('[data-id = "myDiv"]').classList.add('style1')
        this.bodyClass = true

        //create event
        const classEvent = new CustomEvent("getclassvalue", 
        {
            detail :
            {
                searchKey : this.bodyClass,
                
            } 
        });
        this.dispatchEvent(classEvent);
    }
    removeClass(){
        this.template.querySelector('[data-id = "myDiv"]').classList.remove('style1')
    }
}