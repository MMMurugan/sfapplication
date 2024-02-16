import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

export default class GoogleFLMenu extends NavigationMixin (LightningElement) {


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
                name: 'AboutGoogleImage__c'
            },
         
        });
    }

    goTOGoogleCloud(event) {
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: 'AboutGoogleCloud__c'
            },
         
        });
    }


}