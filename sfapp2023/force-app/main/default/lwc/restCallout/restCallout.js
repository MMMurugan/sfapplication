import { LightningElement } from 'lwc';

export default class RestCallout extends LightningElement {

    randamJoke;

    connectedCallback(){
        console.log("hiiiiii");
        const endurl = "https://icanhazdadjoke.com";
        fetch(endurl, {
            method : "GET", 
            headers : {
                Accept : "application/json"
            }
        })
        .then(response => {
            if(response.ok){
                return response.json();
            }
        })
        .then(responseJSON =>{
            this.randamJoke = responseJSON.joke;
        });
    }
}