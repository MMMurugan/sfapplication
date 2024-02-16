import { LightningElement } from "lwc";

const BREEDS = [
    "affenpinscher", "african", "airedale", "akita", "appenzeller", "australian", 
    "basenji", "beagle", "bluetick", "borzoi", "bouvier", "boxer", "brabancon", 
    "briard", "buhund", "bulldog", "bullterrier", "cairn", "cattledog", "chihuahua", 
    "chow", "clumber", "cockapoo", "collie", "coonhound", "corgi", "cotondetulear", 
    "dachshund", "dalmatian", "dane", "deerhound", "dhole", "dingo", "doberman", "elkhound", 
    "entlebucher", "eskimo", "finnish", "frise", "germanshepherd", "greyhound", "groenendael", 
    "havanese", "hound", "husky", "keeshond", "kelpie", "komondor", "kuvasz", "labrador", 
    "leonberg", "lhasa", "malamute", "malinois", "maltese", "mastiff", "mexicanhairless", "mix", 
    "mountain", "newfoundland", "otterhound", "ovcharka", "papillon", "pekinese", "pembroke", 
    "pinscher", "pitbull", "pointer", "pomeranian", "poodle", "pug", "puggle", "pyrenees", 
    "redbone", "retriever", "ridgeback", "rottweiler", "saluki", "samoyed", "schipperke", 
    "schnauzer", "setter", "sheepdog", "shiba", "shihtzu", "spaniel", "springer", "stbernard", 
    "terrier", "vizsla", "waterdog", "weimaraner", "whippet", "wolfhound"
];

export default class Task2ParentChild extends LightningElement {
  selectedBreed = 'pug';

  get selectionOptions() {
    return BREEDS.map(breed => {
      return {
        selected: this.selectedBreed === breed,
        name: breed,
        label: breed.charAt(0).toUpperCase() + breed.slice(1)
      }
    })
  }

  onselect(evt) {
    this.selectedBreed = evt.target.value;
    console.log(this.selectedBreed);
  }
}