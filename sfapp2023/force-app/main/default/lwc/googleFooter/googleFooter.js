import { LightningElement, track } from 'lwc';
import images from '@salesforce/resourceUrl/image';

export default class GoogleFooter extends LightningElement {
    googleLogo = images + '/Image/google_logo.png';


        topFunction() {
            // Scroll to the top of the page
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    

        @track showScrollButton = false;

        connectedCallback() {
            // Add a scroll event listener
            window.addEventListener('scroll', this.handleScroll.bind(this));
        }
    
        handleScroll() {
            // Check if the user has scrolled down 20 pixels or more
            this.showScrollButton =
                window.scrollY > 300 || document.documentElement.scrollTop > 300;
        }
}