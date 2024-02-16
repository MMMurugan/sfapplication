import { LightningElement, api } from "lwc";

function getPicture(breed) {
  return fetch(`https://dog.ceo/api/breed/${breed}/images/random`)
        .then(responce => responce.json())
        .then(res => res.message);
}

export default class DogImage extends LightningElement {
  imageUrl;
  _breed;

  @api
  set breed(value) {
    if (this._breed !== value) {
      this._breed = value;
      
      getPicture(value).then(res => {
        this.imageUrl = res;
      });
    }
  }
  get breed() {
    return this._breed;
  }
}