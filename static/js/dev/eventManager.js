class EventManager {
    parseEvent(eventData) {
        let eventTitle = eventData.eventTempNameEn;
        let formatDate = this.formatEventData(eventData);

        let eventObject = {
            id: eventData.eventDateId + "_" + eventData.eventId,
            title: eventTitle,
            start:
                formatDate["year"] +
                "-" +
                formatDate["month"] +
                "-" +
                formatDate["day"] +
                "T" +
                formatDate["startHour"] +
                ":" +
                formatDate["startMin"] +
                ":00",
            end:
                formatDate["year"] +
                "-" +
                formatDate["month"] +
                "-" +
                formatDate["day"] +
                "T" +
                formatDate["endHour"] +
                ":" +
                formatDate["endMin"] +
                ":00",
        };

        return eventObject;
    }

    formatEventData(eventData) {
        let date = new Date(eventData.eventDate);
        let newDateData = [];
        let months_arr = [
            "01",
            "02",
            "03",
            "04",
            "05",
            "06",
            "07",
            "08",
            "09",
            "10",
            "11",
            "12",
        ];
        newDateData["year"] = date.getFullYear();
        newDateData["month"] = months_arr[date.getMonth()];
        let day = date.getDate();

        newDateData["day"] = this.zeroBeforeDateTime(day);
        newDateData["startHour"] = this.zeroBeforeDateTime(eventData.customStart.hour);
        newDateData["startMin"] = this.zeroBeforeDateTime(
            eventData.customStart.minute
        );
        newDateData["endHour"] = this.zeroBeforeDateTime(eventData.customEnd.hour);
        newDateData["endMin"] = this.zeroBeforeDateTime(eventData.customEnd.minute);

        return newDateData;
    }

    zeroBeforeDateTime(datetimeString) {
        if (datetimeString.toString().length == 1) {
            datetimeString = "0" + datetimeString;
        } else if (datetimeString.toString().length == 0) {
            datetimeString = "00" + datetimeString;
        }
        return datetimeString;
    }
}

export default EventManager;