import { LightningElement } from 'lwc';
 
export default class EnrollAllCourse extends LightningElement {
    allCourseDetailInfo=[
        {courseName:'Lightning Web Component',courseDuration:'30 Days',courseFee:'10,000', courseRating:'*****'},
        {courseName:'AUra Component',courseDuration:'25 Days',courseFee:'9,000', courseRating:'*****'},
        {courseName:'Apex development',courseDuration:'30 Days',courseFee:'7,000', courseRating:'*****'},
        {courseName:'Design pattern',courseDuration:'20 Days',courseFee:'15,000', courseRating:'*****'},
        {courseName:'Integration',courseDuration:'30 Days',courseFee:'12,000', courseRating:'*****'}
 
    ];
}