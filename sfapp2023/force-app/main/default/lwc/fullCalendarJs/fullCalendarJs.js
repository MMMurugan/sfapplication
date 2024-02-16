import { LightningElement } from 'lwc';
import { loadScript,loadStyle} from 'lightning/platformResourceLoader';
// import FullCalendar from '@salesforce/resourceUrl/FullCalendar';
import FullCalendarJS from '@salesforce/resourceUrl/FullCalendar4';

export default class FullCalendarJs extends LightningElement {

  renderedCallback() {
    Promise.all([
      // First step: load FullCalendar core 
      loadStyle(this, FullCalendarJS + '/core/main.css'),
      loadScript(this, FullCalendarJS + '/core/main.js'),
    ])
      .then(() => {
          // Second step: Load the plugins in a new promise
          Promise.all([
            loadStyle(this, FullCalendarJS + '/daygrid/main.css'),
            loadScript(this, FullCalendarJS + '/daygrid/main.js'),
            loadStyle(this, FullCalendarJS + '/timegrid/main.css'),
            loadScript(this, FullCalendarJS + '/timegrid/main.js'),
            loadScript(this, FullCalendarJS + '/interaction/main.js')
        ]).then(() => {
          // Third step: calls your calendar builder once the plugins have been also loaded
          this.initialiseFullCalendar();
        });
      })
      .catch(error => {
       // Catch any error while loading the scripts here
      })
  }

  initialiseFullCalendar() {
    // eslint-disable-next-line no-console
    console.log('begin');
    const ele = this.template.querySelector('div.fullcalendar');
    // eslint-disable-next-line no-console
    console.log('ele >>> ' + ele);
    // document.addEventListener('DOMContentLoaded', function() {
      var calendar = new FullCalendar.Calendar(ele, {
      plugins: ['dayGrid', 'timeGrid'],
      defaultView: 'timeGridDay'
});

      calendar.render();
    // });
   
}
}