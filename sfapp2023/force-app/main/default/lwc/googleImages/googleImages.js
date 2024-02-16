import { LightningElement } from 'lwc';
import { loadStyle } from 'lightning/platformResourceLoader';
// import myResource from '@salesforce/resourceUrl/css';
import images from '@salesforce/resourceUrl/image';
import { NavigationMixin } from 'lightning/navigation';

export default class GoogleImages extends NavigationMixin (LightningElement) {

    googleLogo = images + '/Image/google_logo.png';
    // renderedCallback() {

    //       Promise.all([ 
    //           loadStyle(this, myResource + '/stylesheet.css')              
    //       ])
    //           .then(() => {
    //             console.log("styles loaded");  
    //           })
    //           .catch(error => {
    //             console.log("styles not loaded");  
    //           });
  
    //   }

      goTOGoogleHome(event) {
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: 'Home'
            },
         
        });
    }

    goTOGoogleImages(event) {
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: 'googleImage__c'
            },
         
        });
    }

    goTOGoogleCloud(event) {
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: 'googleCloud__c'
            },
         
        });
    }
    goTOGoogleImages1(event) {
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: 'googleCloud__c'
            },
         
        });
    }

}