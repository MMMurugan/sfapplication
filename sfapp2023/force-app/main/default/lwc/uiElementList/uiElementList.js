import { LightningElement } from 'lwc';

export default class UiElementList extends LightningElement {

    handleClick(event) {
        // Get a reference to the element
        const element = event.target;

        // Add a new class to the element
        element.classList.add('additional-class');
    }
}