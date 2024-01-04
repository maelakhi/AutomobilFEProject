import React from 'react'
import { FormatDate } from '../Utils/FormatDate';

const useDate = () => {
    const [date, setDate] = React.useState([])
    
    React.useEffect(() => {
        let dateNow = new Date();
        let dateList = []

        for (let index = 0; index < 7; index++) {
            dateList.push({
                value: index,
                label: FormatDate(dateNow.setDate(dateNow.getDate() + index)),
                valueDate: dateNow
            })
            dateNow = new Date()
        }
        setDate(dateList)
        
    }, [])
    
    return {
        date
    }
}

export default useDate