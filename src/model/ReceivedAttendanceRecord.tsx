export default interface AttendanceRecord {
    id: string,
    userId: string,
    name: string,
    date: string,
    inTime: string,
    outTime?: string
}