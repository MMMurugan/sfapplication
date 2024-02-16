import { LightningElement, track } from 'lwc';
import fetchDataHelper from './fetchDataHelper';
import myResource from '@salesforce/resourceUrl/styleSheet';

const columns = [
    { label: 'Label', fieldName: 'name' },
    { label: 'Website', fieldName: 'website', type: 'url' },
    { label: 'Phone', fieldName: 'phone', type: 'phone' },
    { label: 'Balance', fieldName: 'amount', type: 'currency' },
    { label: 'CloseAt', fieldName: 'closeAt', type: 'date' },
];

export default class BasicDatatable extends LightningElement {

    renderedCallback() {
          Promise.all([  
              loadStyle(this, myResource + '/styleSheet.css')
              
          ])
              .then(() => {
                  this.dispatchEvent(
                      new ShowToastEvent({
                          title: 'Success',
                          message: 'your style is Loaded',
                          variant: 'success',
                      }),
                  );
  
              })
              .catch(error => {
                  this.dispatchEvent(
                      new ShowToastEvent({
                          title: 'Error Loading Third-Party Libraries',
                          message: error.message,
                          variant: 'error',
                      }),
                  );
              });
  
      }


    @track data = [];
    @track columns = columns;

    // eslint-disable-next-line @lwc/lwc/no-async-await
    async connectedCallback() {
        const data = await fetchDataHelper({ amountOfRecords: 100 });
        this.data = data;
    }
}