"use strict";

export function getDateWithoutTime(date) {
    let parsedDate = typeof date === "string" ? new Date(date) : date;
    return (parsedDate.getMonth() + 1) + "/" + parsedDate.getDate() + "/" + parsedDate.getFullYear();
}
