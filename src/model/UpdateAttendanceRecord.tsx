export default interface UpdateAttendanceRecord {
    id?: string,
    userId: string,
    date: string,
    inTime?: string,
    outTime?: string
}