import { LightningElement,api } from 'lwc';
 
export default class LifecycleHookExample extends LightningElement {
     message ='Welcome';
    constructor(){
        super();
        this.message = this.message + ' to Component lifecycle';
        console.log('Executing Constructor');
    }
    connectedCallback(){
        console.log('Executing connected callback');
    }
    disconnectedCallback(){
        console.log('Executing disconnected connected callback'); 
    }
    renderedCallback(){
        console.log('Executing rendered call back');
    }
    /*errorCallback(error,stack){
        console.log('Executing error callback'+error);
    }*/
}