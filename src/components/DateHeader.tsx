import React, { useEffect, useState } from "react"
import { Col, Container, Row, Button } from "react-bootstrap"
import { utcToZonedTime, format } from "date-fns-tz"
import { addDays, subDays } from "date-fns"
import { CaretRight, CaretLeft } from "react-bootstrap-icons"

const DAY_OF_WEEK = ["日","月","火","水","木","金","土"];
const dateToDateLabel= (date: Date)=> {
    return format(date, `yyyy年MM月dd日（${DAY_OF_WEEK[date.getDay()]}）`);
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
                    <Button variant="outline-success" style={{border: "none"}} onClick={()=>subDay()}><CaretLeft /></Button>
                    <span style={{verticalAlign: "middle"}}>{dateToDateLabel(targetDate)}</span>
                    <Button variant="outline-success" style={{border: "none"}} onClick={()=>{addDay()}}><CaretRight /></Button>
                </Col>
            </Row>
        </Container>
    )
}