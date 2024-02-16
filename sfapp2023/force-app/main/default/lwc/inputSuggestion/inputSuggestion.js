import { LightningElement, track } from 'lwc';

export default class InputSuggestion extends LightningElement {
    @track showSuggestionBox = false;
    @track inputValue = '';
    @track suggestions = ['Apple', 'Banana', 'Cherry', 'Date', 'Grape']; // Replace with your suggestions

    connectedCallback() {
        document.addEventListener('click', this.handleDocumentClick);
    }

    disconnectedCallback() {
        document.removeEventListener('click', this.handleDocumentClick);
    }

    handleDocumentClick(event) {
        const container = this.template.querySelector('.container');
        if (container && !container.contains(event.target)) {
            this.showSuggestionBox = false;
        }
    }

    handleInputChange(event) {
        this.inputValue = event.target.value;
        this.showSuggestionBox = this.inputValue.length > 0;
    }

    handleContainerClick(event) {
        // Stop click propagation to prevent it from triggering handleDocumentClick immediately
        event.stopPropagation();
    }

    handleSuggestionClick(event) {
        this.inputValue = event.target.innerText;
        this.showSuggestionBox = false;
    }
}