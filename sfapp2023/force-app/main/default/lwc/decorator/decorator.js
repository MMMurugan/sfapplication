import { LightningElement, track, api } from 'lwc';

export default class Decorator extends LightningElement {
    @track inputMessage = 'World';
    @api name = "Murugan";
    phone= "8767343747"
 
    handleChange(event) {
        console.log('event.target.value' + event.target.value);
        this.inputMessage = event.target.value;
    }

    handleClick(){
        this.name = "Taaru"
    }

    ListItems = [
        {
            id:10001,
            name:"Murugan",
            Title:"SF Developer"
        },
        {
            id:10001,
            name:"Kannan",
            Title:"UI Developer"
        },
        {
            id:10001,
            name:"Samy",
            Title:"SF Developer"
        }

    ]
}