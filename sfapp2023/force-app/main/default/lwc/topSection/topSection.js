import { LightningElement } from 'lwc';
import { loadStyle } from 'lightning/platformResourceLoader';
import myResource from '@salesforce/resourceUrl/css';
import images from '@salesforce/resourceUrl/image';

export default class TopSection extends LightningElement {

    googleLogo = images + '/Image/google_logo.png';
    renderedCallback() {

          Promise.all([ 
              loadStyle(this, myResource + '/stylesheet.css')              
          ])
              .then(() => {
                console.log("styles loaded");  
              })
              .catch(error => {
                console.log("styles not loaded");  
              });
  
      }



}