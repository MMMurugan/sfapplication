import { LightningElement, api, track } from 'lwc';
import generatePDFContent from '@salesforce/apex/ReportGeneratorController.generatePDFContent';

export default class Task1ParentCmd extends LightningElement {
    searchValue='';

    handleSearchValue(event){
        this.searchValue = event.detail.value;
        console.log(this.searchValue);
    }
  
    recordId = '0012w00001e0iklAAA'; // If you need to pass a recordId or any other data to the PDF

    get currentDate() {
        return new Date().toLocaleDateString();
    }

    // openPDFInNewTab() {
    //     // Construct the URL of the Visualforce page with query parameters if needed
    //     const vfPageUrl = `/apex/MyPdfPage?id=${this.recordId}`;

    //     // Open the Visualforce page as a PDF in a new window
    //     window.open(vfPageUrl, '_blank');
    // }



    @track currentDate = new Date().toLocaleDateString();
    @track contacts = [];

    async connectedCallback() {
        // Load the contact data when the component is initialized
        await this.loadContactData();
    }

    async loadContactData() {
        try {
            // Call the Apex method to retrieve the contact data
            const response = await fetch('/apex/DataRetrievalClass');
            const data = await response.json();
            this.contacts = data;
        } catch (error) {
            console.error('Error fetching contact data: ', error);
        }
    }

    openPDFInNewTab() {
        // Construct the URL of the Visualforce page to generate the PDF
        const vfPageUrl = '/apex/MyPdfPage';

        // Open the Visualforce page as a PDF in a new window
        window.open(vfPageUrl, '_blank');
    }


    // map loop

    @track studentsMap = new Map();

    // Constructor to initialize the Map with student data
    constructor() {
        super();
        this.studentsMap.set('student1', { name: 'John Doe', age: 20, comments: 'email comments' });
        this.studentsMap.set('student2', { name: 'Jane Smith', age: 22 });
        this.studentsMap.set('student3', { name: 'Michael Johnson', age: 21 });
        this.studentsMap.set('student4', { name: 'Emily Brown', age: 19 });
    }

    // Getter function to convert Map to array of objects
    get studentArray() {
        return Array.from(this.studentsMap.values());
    }

}