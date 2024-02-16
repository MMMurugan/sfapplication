import { LightningElement } from 'lwc';
const tripcolumns = [
    { label: 'Date', fieldName: 'Date' ,type:'date',hideDefaultActions: 'true' },
    { label: 'From', fieldName: 'From', type: '',hideDefaultActions: 'true' },
    { label: 'To', fieldName: 'To', type: '',hideDefaultActions: 'true' },
    { label: 'Total Miles', fieldName: 'TotalMiles', type: 'time',hideDefaultActions: 'true' },
    {
        label: 'Amount',fieldName: 'Amount',type: 'currency',
        typeAttributes: { currencyCode: 'INR', step: '0.001' },hideDefaultActions: 'true',
        cellAttributes: { alignment: 'left' } 
    }
   
  ];
  const perdiemcolumns = [
    { label: 'Date', fieldName: 'Date',type:'date' ,hideDefaultActions: 'true' },
    { label: 'Day', fieldName: 'Day', type: '',hideDefaultActions: 'true' },
    { label: 'Start Time', fieldName: 'StartTime', type: 'time',hideDefaultActions: 'true' },
    { label: 'End Time', fieldName: 'EndTime', type: 'time',hideDefaultActions: 'true' },
    {
        label: 'Amount',fieldName: 'Amount',type: 'currency',
        typeAttributes: { currencyCode: 'USD', step: '0.001' },hideDefaultActions: 'true',
        cellAttributes: { alignment: 'left' }  
    }
   
  ];
  const receiptscolumns = [
    { label: 'Date', fieldName: 'Date',type:'date' ,hideDefaultActions: 'true' },
    { label: 'Type', fieldName: 'Type', type: '',hideDefaultActions: 'true' },
    {
        label: 'Amount',fieldName: 'Amount',type: 'currency',
        typeAttributes: { currencyCode: 'USD', step: '0.001' },hideDefaultActions: 'true' ,
        cellAttributes: { alignment: 'left' } 
    }
   
  ];
  
  const tripdata = [
    {
        id: 'a',
        Date:'2020-05-20',
        From:'302 ,Meridian St,indianaposis,In 46204',
        To:'402 W,Washington St,indianaposis,In 46204',
        TotalMiles:'200KM',
        Amount:'20000'
    },
    {
        id: 'b',
        Date:'2021-05-20',
        From:'402 W,Washington St,indianaposis,In 46204',
        To:'222 s,3rd st,terre haute,IN 470298',
        TotalMiles:'250KM',
        Amount:'25000'
    }]
    const perdiemdata = [
        {
            id: 'a',
            Date:'2020-05-20',
            Day:'Monday',
            StartTime:'4AM',
            EndTime:'5PM',
            Amount:'20000'
        },
        {
            id: 'b',
            Date:'2021-05-20',
            Day:'Monday',
            StartTime:'5AM',
            EndTime:'5PM',
            Amount:'25000'
        }]
        const receiptsdata = [
            {
                id: 'a',
                Date:'2020-05-20',
                Type:'A Type',
                Amount:'20000'
            },
            {
                id: 'b',
                Date:'2021-05-20',
                Type:'B Type',
                Amount:'25000'
            }]
export default class Traval extends LightningElement {
    tripdata = tripdata;
    tripcolumns=tripcolumns;
    perdiemcolumns=perdiemcolumns;
    perdiemdata=perdiemdata;
    receiptscolumns=receiptscolumns;
    receiptsdata=receiptsdata;
    handleChange(event) {
        this.value = event.detail.value;
    }

    handlePDF(){
    	window.print();
	}
}