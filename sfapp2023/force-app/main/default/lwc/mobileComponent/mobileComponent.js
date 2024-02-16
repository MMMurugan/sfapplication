import { LightningElement } from 'lwc';
import insidersMobileTemplate from './insidersMobileTemplate.html';
import insidersWebTemplate from './insidersWebTemplate.html';

export default class MobileComponent extends LightningElement {
    render() {
        return window.screen.width < 768 ? insidersMobileTemplate : insidersWebTemplate;
    }

    // connectedCallback() {
    //     return window.screen.width < 768 ? insidersMobileTemplate : insidersWebTemplate;
    // }

    renderedCallback() {
        console.log("m00000000mmmmm0", window.screen.width)
        // return window.screen.width < 768 ? insidersMobileTemplate : insidersWebTemplate;
        // if(window.screen.width <= '767'){
        //     this.insidersMobileTemplate = false;
        //     this.insidersMobileTemplate = false;
        // }
        // else if(window.screen.width > '767'){
        //     this.insidersMobileTemplate = true;
        //     this.insidersMobileTemplate = false;
        // }
    }
}