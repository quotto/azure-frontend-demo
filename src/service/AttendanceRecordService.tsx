import { AccountInfo, IPublicClientApplication } from "@azure/msal-browser";
import { config} from "../AuthModule";
import { callEndpoint } from "../repository/FetchManager";
import UpdateAttendanceRecord from "../model/UpdateAttendanceRecord";
import AttendanceRecord from "../model/ReceivedAttendanceRecord";
import { UserInfo } from "../model/GraphReponseTypes";

export const getAttendanceRecordByDate = async(date: string, memberList: UserInfo[]): Promise<UpdateAttendanceRecord[] | null> => {
    try {
        const response = await callEndpoint(
            {
                endpoint: `${config.AZURE_ATTENDANCE_API_ENDPOINT}/api/list/${date}`,
                method: "GET",
                headers: {
                    "X-Github": "xxxxxxxxxxxxxxxxx"
                }
            }
        );
        const responseBody = await response.json();
        console.log(JSON.stringify(responseBody));
        return memberList.map((member: UserInfo)=> {
            const record = responseBody.items.find((value: any)=>value.id === member.id);
            if(record) {
                const attendanceRecord = Object.assign(record,{name: member.displayName});
                return attendanceRecord;
            } else {
                return {
                    userId: member.id,
                    name: member.displayName,
                    date: date
                };
            }
        });
    } catch (e) {
        console.error(e);
        return null;
    }
}

export const updateAttendanceRecordByUserId = async(updateData: UpdateAttendanceRecord) : Promise<string | null >=> {
    const response = await callEndpoint(
        {
            endpoint: `${config.AZURE_ATTENDANCE_API_ENDPOINT}/api/update`,
            method: "POST",
            headers: {
                "X-Github": "xxxxxxxxxxxxxxxxx"
            },
            body: updateData
        }
    )
    const responseBody = await response.json();
    console.log(JSON.stringify(responseBody))
    return  responseBody.id;
}