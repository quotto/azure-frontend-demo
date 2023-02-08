import React, { useEffect, useState } from "react"
import { Col, Container, Row, Button } from "react-bootstrap"
import { utcToZonedTime, format } from "date-fns-tz"
import { addDays, subDays } from "date-fns"

const dateToDateLabel= (date: Date)=> {
    return format(date, `yyyy年MM月dd日（i）`)
}
const dateToYYYYMMDD = (date: Date)=>{
    return format(date, "yyyyMMdd");
}
export const DateHeader = (props: any)=>{

    const [targetDate, setTargetDate] = useState(new Date);
    useEffect(()=>{
        setTargetDate(utcToZonedTime(Date.now(), "Asia/Tokyo"))
        setTargetDate(targetDate);
    },[])

    const addDay = ()=>{
        const newDate = addDays(targetDate, 1)
        setTargetDate(newDate)
        props.fetchAttendanceRecords(props.users,dateToYYYYMMDD(newDate));
    }
    const subDay = ()=>{
        const newDate = subDays(targetDate, 1)
        setTargetDate(newDate)
        props.fetchAttendanceRecords(props.users,dateToYYYYMMDD(newDate));
    }

    return (
        <Container>
            <Row>
                <Col style={{textAlign: "center"}}>
                    <Button variant="outline-success" onClick={()=>subDay()}>前の日</Button>{dateToDateLabel(targetDate)}<Button variant="outline-success" onClick={()=>{addDay()}}>次の日</Button>
                </Col>
            </Row>
        </Container>
    )
}