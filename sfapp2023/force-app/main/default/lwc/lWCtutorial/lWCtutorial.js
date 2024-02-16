import { LightningElement } from 'lwc';
import slider from "@salesforce/resourceUrl/sliderCarousel";

export default class LWCtutorial extends LightningElement {
    sliderCarousel = slider + "/sliderCarousel/slider.html";
}