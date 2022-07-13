import { getCookie } from "../util/getCookie.js";
import React from 'react'

const csrfToken = getCookie('XSRF-TOKEN')
export default function CSRFtoken() {
    return (
        <input type="hidden" name="csrf" value={csrfToken} />
    )
}
