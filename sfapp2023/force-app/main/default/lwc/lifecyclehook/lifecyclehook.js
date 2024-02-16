/* eslint-disable no-console */
import { LightningElement, api } from 'lwc';
import firsttemplate from './lifecyclehook.html';
import secontemplate from './lifecyclehook2.html';

export default class Lifecyclehook extends LightningElement {
// eslint-disable-next-line no-undef
@api templateno = 'temp1';

    constructor(){
        super();
        console.log('constructor called');
    }

    connectedCallback(){
        console.log('connectedCallback called');
    }

    disconnectedCallback(){
        console.log('disconnectedCallback called');
    }
    changetemplate(){
        console.log('inside the change template');
        if(this.templateno === 'temp1'){
            this.templateno = 'temp2'
        }
        else {
            this.templateno = 'temp1'
        }
    }

    render(){
        console.log('render  called');
        if(this.templateno === 'temp1'){
            return firsttemplate;
        }
        // eslint-disable-next-line no-else-return
        else {
            return secontemplate
        } 
    }

}