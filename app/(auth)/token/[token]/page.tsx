"use client"
import Loading from '@/components/Loading'
import VOLUNTEER_URL from '@/config/VOLUNTEER_URL'
import axios from 'axios'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

function Token() {
    const {token}:any = useParams();
    const router = useRouter()
    useEffect(()=>{
        axios.get(`${VOLUNTEER_URL}/volunteer/protected`, {
                headers: {
                    "x-access-token": token
                }
        }).then((response)=>{
            if(response.status === 200){
                localStorage.setItem("volunteer-token", token)
                router.push("/dmc")
            }
        }).catch((err)=>{
            console.log(err)
            router.push("/login");
            localStorage.removeItem("volunteer-token");
        })
    },[])
  return (
    <Loading/>
  )
}

export default Token