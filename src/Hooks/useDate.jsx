import React from 'react'
import { FormatDate } from '../Utils/FormatDate';

const useDate = () => {
    const [date, setDate] = React.useState([])
    const weekday = [
            "Sunday", "Monday", "Tuesday", "Wednesday",
            "Thursday", "Friday", "Saturday"
    ]
    
    React.useEffect(() => {
        // let dateNow = new Date();
        // let dateList = []

        // for (let index = 0; index < 7; index++) {
        //     dateList.push({
        //         value: index,
        //         label: FormatDate(dateNow.setDate(dateNow.getDate() + index)),
        //         valueDate: dateNow
        //     })
        //     dateNow = new Date()
        // }
        // setDate(dateList)
        let count = 0;
        let index = 0;
        let dateNow = new Date();
        let dateList = []

        while (count < 7) {
            dateNow.setDate(dateNow.getDate() + index)

            if (weekday[dateNow.getDay()] != "Sunday") {
                dateList.push({
                    value: count,
                    label: FormatDate(dateNow),
                    valueDate: dateNow
                })
                count++
            }
            
            dateNow = new Date()
            index++;
        }
        setDate(dateList)
    }, [])
    
    return {
        date
    }
}

export default useDate