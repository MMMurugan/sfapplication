/**
 * @Author        : V.S.Marimuthu
 * @CreatedOn     : March 09 ,2020
 * @Purpose       : COntains all the utility functions
 **/
import { ShowToastEvent } from "lightning/platformShowToastEvent";
const titles = { success: 'Success!..', warning: 'Warning!..', error: 'Error!..' };
export const utils = {

    // Function used to format phone number in US format like (111) 111-1111
    formattedPhoneNumber(phoneNumber) {
        phoneNumber = phoneNumber ? '(' + phoneNumber.substr(0, 3) + ')' + ' ' + phoneNumber.substr(3, 3) + '-' + phoneNumber.substr(6, 4) : null;
        return phoneNumber;
    },

    // Function used to format Tax id  in US format like 11-11111111
    formattedTaxID(taxid) {
        taxid = taxid ? taxid.substr(0, 2) + '-' + taxid.substr(2, 9) : null;
        return taxid;
    },
    //Function Used to give Toast Messages On Success, Warning and Error
    toastMessage(message, variant) {

        const toast = new ShowToastEvent({
            title: titles[variant],
            message,
            variant
        });
        return toast;
    },

    //Function Used to Change the Date Format(MM/DD/YYYY) Start
    formatDate(fullDate) {
        if (fullDate !== null && fullDate !== undefined) {
            let recordDate = new Date(fullDate);
            let date = recordDate.getDate() > 9 ? recordDate.getDate() : '0' + recordDate.getDate();
            let month = recordDate.getMonth() + 1 > 9 ? recordDate.getMonth() + 1 : '0' + (recordDate.getMonth() + 1);
            let year = recordDate.getFullYear();
            fullDate = month + '/' + date + '/' + year;
        }
        return fullDate;
    },
    //Function Used to Change the Date Format(MM/DD/YYYY) End

    /*Adding New Time Format Functionality for 24hr/12hr format by Sundar K*/

    //Function Used to Change the 12 hour Time Format(HH:MM AM/PM)
    formatTime12Hr(duration) {
        var milliseconds = parseInt((duration % 1000) / 100),
            seconds = parseInt((duration / 1000) % 60),
            minutes = parseInt((duration / (1000 * 60)) % 60),
            hours = parseInt((duration / (1000 * 60 * 60)) % 24);

        hours = (hours < 10) ? "0" + hours : hours;
        minutes = (minutes < 10) ? "0" + minutes : minutes;
        seconds = (seconds < 10) ? "0" + seconds : seconds;

        var time = hours + ":" + minutes;

        if (time != null && time != undefined) {
            // Check correct time format and split into components
            time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)?$/) || [time];

            if (time.length > 1) { // If time format correct
                time = time.slice(1);  // Remove full string match value
                time[5] = +time[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
                time[0] = +time[0] % 12 || 12; // Adjust hours
            }

            return time.join(''); // return adjusted time or original string
        }
    },

    ////Function Used to Change the 24 hour Time Format(HH:MM AM/PM)
    formatTime24Hr(duration) {
        var milliseconds = parseInt((duration % 1000) / 100),
            seconds = parseInt((duration / 1000) % 60),
            minutes = parseInt((duration / (1000 * 60)) % 60),
            hours = parseInt((duration / (1000 * 60 * 60)) % 24);

        hours = (hours < 10) ? "0" + hours : hours;
        minutes = (minutes < 10) ? "0" + minutes : minutes;
        seconds = (seconds < 10) ? "0" + seconds : seconds;

        var time = hours + ":" + minutes + ":00.000";
        return time;
    },
    /*Ending Function*/

    //Function Used to Change the Date Format(YYYY/MM/DD) Start
    formatDateYYYYMMDD(fullDate) {
        if (fullDate !== null && fullDate !== undefined) {
            let recordDate = new Date(fullDate);
            let date = recordDate.getDate() > 9 ? recordDate.getDate() : '0' + recordDate.getDate();
            let month = recordDate.getMonth() + 1 > 9 ? recordDate.getMonth() + 1 : '0' + (recordDate.getMonth() + 1);
            let year = recordDate.getFullYear();
            fullDate = year + '-' + month + '-' + date;
        }
        return fullDate;
    },
    //Function Used to Change the Date FormatYYYY/MM/DD) End
    
}
export function reduceErrors(errors) {
    if (!Array.isArray(errors)) {
        errors = [errors];
    }

    return (
        errors
            // Remove null/undefined items
            .filter(error => !!error)
            // Extract an error message
            .map(error => {
                // UI API read errors
                if (Array.isArray(error.body)) {
                    return error.body.map(e => e.message);
                }
                // UI API DML, Apex and network errors
                else if (error.body && typeof error.body.message === 'string') {
                    return error.body.message;
                }
                // JS errors
                else if (typeof error.message === 'string') {
                    return error.message;
                }
                // Unknown error shape so try HTTP status text
                return error.statusText;
            })
            // Flatten
            .reduce((prev, curr) => prev.concat(curr), [])
            // Remove empty strings
            .filter(message => !!message)
    );
}