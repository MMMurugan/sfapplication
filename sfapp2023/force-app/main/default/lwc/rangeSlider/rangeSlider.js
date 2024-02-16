import { LightningElement, track } from "lwc";
export default class RangeSlider extends LightningElement {
  @track slide1 = 1;
  @track slide2 = 20;

  inp1Grat = false;

  /* get getVals() {
    return "$ " + this.slide1 + "k - $" + this.slide2 + "k";
  } */

/*   renderedCallback() {
    let input = this.template.querySelectorAll("input");
    let inp1 = input[0].value;
    console.log("start---" + inp1);
    this.slide1 = inp1;
    let inp2 = input[1].value;
    console.log("end--- " + inp2);
    this.slide2 = inp2;
  } */

 
  handleChangeEvent() {
    let inp1 = this.template.querySelector(".one");
    console.log("startF---" + inp1.value);
    this.slide1 = inp1.value;    
    //console.log(this.slide1);
   
    //return inp1.value
  }
  handleChangeEventE() {
    let inp2 = this.template.querySelector(".two");
    console.log("end--- " + inp2.value);
    this.slide2 = inp2.value;
    //return inp2.value
  }

  renderedCallback() {
    if(this.slide1 > this.slide2){
      let mm = this.slide1;
      this.slide1 = this.slide2;
      this.slide2 = mm;
      console.log("mmmm");
    }
  }


 
}