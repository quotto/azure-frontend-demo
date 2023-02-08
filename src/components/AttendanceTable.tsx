import React from "react"
import { Button, Table } from "react-bootstrap"
import AttendanceRecord from "../model/ReceivedAttendanceRecord"
import { format, utcToZonedTime } from "date-fns-tz";

const TimeRecord = (props: any)=>{
    const data = props.data;
    const ownId = props.ownId;
    console.log(JSON.stringify(data))
    return (
        <tr>
            <td>{data.name}</td>
            <td>{data.inTime ? data.inTime : ""}</td>
            <td>{data.outTime ? data.outTime : ""}</td>
            <td>{(data.inTime && typeof(data.outTime) === "undefined") || (data.inTime > (data.outTime || "")) ?
                <Button disabled={ownId!=data.userId} onClick={()=>{
                    const outTime = format(utcToZonedTime(Date.now(), "Asia/Tokyo"), "HH:mm")
                    props.updateAttendanceRecord(Object.assign(data,{outTime: outTime}));
                }}>出る</Button>:
                <Button disabled={ownId!=data.userId} onClick={()=>{
                    const inTime = format(utcToZonedTime(Date.now(), "Asia/Tokyo"), "HH:mm")
                    props.updateAttendanceRecord(Object.assign(data,{inTime: inTime}));
                }}>入る</Button>}</td>
        </tr>
    )
}
export const AttendanceTable = (props: any)=>{
    return (
        <Table striped>
            <thead>
                <tr>
                    <th>名前</th>
                    <th>来た時間</th>
                    <th>帰った時間</th>
                    <th>#</th>
                </tr>
            </thead>
            <tbody>
                {/* {props.records.map((data: any)=>TimeRecord(props.ownId, data))} */}
                {props.records.map((data: any)=><TimeRecord ownId={props.ownId} data={data} updateAttendanceRecord={props.updateAttendanceRecord} />)}
            </tbody>
        </Table>
    )
}