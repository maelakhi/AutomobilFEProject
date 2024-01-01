import React from 'react'

const FormatDate = (value) => {
    var weekday=new Array(7);
    weekday[0]="Sunday";
    weekday[1]="Monday";
    weekday[2]="Tuesday";
    weekday[3]="Wednesday";
    weekday[4]="Thursday";
    weekday[5]="Friday";
    weekday[6] = "Saturday";
    
    const date = new Date(value);

    let dateDay = date.getDate();
    if (dateDay < 10) {
        dateDay = '0'+ dateDay
    }
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

  return `${weekday[date.getDay()]},  ${dateDay} ${monthNames[date.getMonth()]} ${date.getFullYear()}`
}

 
export {
    FormatDate
}