import { LightningElement } from 'lwc';
import { loadStyle } from 'lightning/platformResourceLoader';
import myResource from '@salesforce/resourceUrl/styleSheet';

export default class ScreenHeightFlowHome extends LightningElement {
    renderedCallback() {
        Promise.all([
            loadStyle(this, myResource + '/style.css')              
        ])
  }
}