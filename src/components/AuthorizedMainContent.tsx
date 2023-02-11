import React, { useEffect, useState } from "react"
import { getMyProfile, getTenantUsers } from "../service/ProfileService"
import { DateHeader } from "./DateHeader"
import { AttendanceTable } from "./AttendanceTable"
import { UserInfo } from "../model/GraphReponseTypes"
import { useMsal } from "@azure/msal-react"
import { getAttendanceRecordByDate, updateAttendanceRecordByUserId } from "../service/AttendanceRecordService"
import { utcToZonedTime } from "date-fns-tz"
import format from "date-fns-tz/format"
import AttendanceRecord from "../model/ReceivedAttendanceRecord"
import UpdateAttendanceRecord from "../model/UpdateAttendanceRecord"
import { Message } from "./Message";
import { Col, Container, Row, Spinner } from "react-bootstrap"


export const AuthorizedMainContent = () => {
    const {instance, accounts} = useMsal()
    const [profile, setProfile] = useState({} as UserInfo)
    const [users, setUsers] = useState([] as UserInfo[])
    const [attendanceRecords, setRecords] = useState([] as UpdateAttendanceRecord[])
    const [message, setMessage] = useState("");
    const [initialized, setInitialized] = useState(false);
    async function fetchAttendanceRecords(userList: UserInfo[], date: string) {
        setInitialized(false);
        try {
            const result = await getAttendanceRecordByDate(date, userList);
            if(result != null) {
                console.log(JSON.stringify(result))
                setRecords(result);
                setInitialized(true);
            } else {
                setMessage("データの取得に失敗しました");
            }
        } catch(e) {
            console.error(e);
            setMessage("データの取得に失敗しました");
        } finally {
            setInitialized(true);
        }
    }
    const updateAttendanceRecord = async(updateRecord: UpdateAttendanceRecord) =>{
        await updateAttendanceRecordByUserId(updateRecord);
        const newRecords: UpdateAttendanceRecord[] = Object.assign(attendanceRecords)
        const index = newRecords.findIndex((record: UpdateAttendanceRecord)=>record.userId === updateRecord.userId)
        newRecords[index] = updateRecord;
        console.log(index)

        setRecords(attendanceRecords.map((record)=>updateRecord.userId === record.userId ? updateRecord : record));
    }
    useEffect(()=>{
        async function fetchProfile(){
            try {
                const result = await getMyProfile(instance, accounts);
                if(result != null) {
                    console.log(JSON.stringify(result))
                    setProfile(result);
                } else {
                    setMessage("プロフィールの取得に失敗しました")
                }
            } catch(e) {
                console.error(e);
                setMessage("プロフィールの取得に失敗しました")
            }
        }
        async function fetchAllUsers() {
            try {
                const result = await getTenantUsers(instance, accounts);
                if (result != null) {
                    console.log(JSON.stringify(result));
                    setUsers(result);
                    const today = format(utcToZonedTime(Date.now(),"Asia/Tokyo"),"yyyyMMdd")
                    await fetchAttendanceRecords(result, today);
                } else {
                    setMessage("データの取得に失敗しました");
                }
            } catch(e) {
                console.error(e);
                setMessage("データの取得に失敗しました");
            } finally {
                setInitialized(true);
            }
        }
        setInitialized(false);
        fetchProfile()
        fetchAllUsers()
    },[]);


    return (
        <>
            {/* <ProfileContent /> */}
            <Message message={message} />
            < DateHeader users={users} fetchAttendanceRecords={fetchAttendanceRecords} />
            {initialized ?
                <AttendanceTable ownId={profile ? profile.id : ""} records={attendanceRecords} updateAttendanceRecord={updateAttendanceRecord}></AttendanceTable> :
                <Container fluid>
                    <Row>
                        <Col style={{textAlign: "center"}}>
                            <Spinner animation="border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>
                        </Col>
                    </Row>
                </Container>
            }
        </>

    )
}