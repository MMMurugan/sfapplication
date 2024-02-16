import { LightningElement, track } from 'lwc';

export default class PrivateProperty extends LightningElement {

    courseName='salesforce Lightning Web component';

    courseFee ='200';

    numberOfStudents ='10';

    @track totalCourseFee='200';

    changeCourseFee(event){

        this.courseFee = event.target.value;

        //this.calculateTotal();

    }

    changeNoOfStud(event){

        this.numberOfStudents = event.target.value;

        //this.calculateTotal();

    }

    calculateTotal(){

        this.totalCourseFee = parseFloat(this.courseFee)*parseFloat(this.numberOfStudents);

       

    }

    get totalAmount(){

        if(this.totalCourseFee ==='undefined'){

            return '';

        }

        return this.totalCourseFee;

    }

}