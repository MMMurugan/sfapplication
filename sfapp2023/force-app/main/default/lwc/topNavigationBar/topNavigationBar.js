import { LightningElement, track } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

export default class TopNavigationBar extends NavigationMixin(LightningElement) {
    @track showServicesSubMenu = false;

    navigateToHome() {
        this.navigateToPage('');
    }

    navigateToAbout() {
        this.navigateToPage('about');
    }

    toggleServicesSubMenu() {
        this.showServicesSubMenu = !this.showServicesSubMenu;
    }

    navigateToServiceA() {
        this.navigateToPage('serviceA');
    }

    navigateToServiceB() {
        this.navigateToPage('serviceB');
    }

    navigateToContact() {
        this.navigateToPage('contact');
    }

    navigateToPage(pageName) {
        this[NavigationMixin.Navigate]({
            type: 'standard__namedPage',
            attributes: {
                pageName: pageName
            }
        });
    }
}