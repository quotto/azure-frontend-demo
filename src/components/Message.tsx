import React from "react"
import { Alert } from "react-bootstrap"

export const Message = (props: any)=>{
    return (
        <>
            {props.message.length > 0 ?
                    <Alert key="danger" variant="danger">{props.message}</Alert> : null}
        </>
    )
}