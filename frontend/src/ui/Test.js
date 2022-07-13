import React, { useEffect } from 'react'
// import { apiClient } from '../api/axios.js'
import axios from 'axios';

export default function Test() {
    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/test', { withCredentials: true, headers: { 'Content-Type': 'application/json' } })
                console.log(response)
            } catch (error) {
                console.log(error)
            }
        })()
    }, [])
    return (
        <div>Test</div>
    )
}

