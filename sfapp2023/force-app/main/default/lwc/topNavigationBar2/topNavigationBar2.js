import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

export default class TopNavigationBar2 extends NavigationMixin(LightningElement) {

 
    connectedCallback() {
        // let htmlcssArrow = document.querySelector(".htmlcss-arrow");
        // htmlcssArrow.onclick = function() {
        // navLinks.classList.toggle("show1");
        // }
        // let moreArrow = document.querySelector(".more-arrow");
        // moreArrow.onclick = function() {
        // navLinks.classList.toggle("show2");
        // }
        // let jsArrow = document.querySelector(".js-arrow");
        // jsArrow.onclick = function() {
        // navLinks.classList.toggle("show3");
        // }

    }

    goTOAboutus(event) {
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: 'about_Us__c'
            },
          
        });
    }
}