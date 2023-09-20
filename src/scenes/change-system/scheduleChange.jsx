import React from "react";
import Header from "../../components/Header";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel, InputLabel, MenuItem, TextField, useMediaQuery } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import * as changeApi from "../../axios-api/changeSystem"
import { useSelector } from "react-redux";
import ChangeSheet from "./changeSheet";
import YourApproval from "./yourApproval";
import Inprogress from "./inProgress";
import TurnDown from "./turnDown";
import Storage from "./storage";

export default function ScheduleChange(){
    //儲存list資料
    const [listData,setListData] = useState(null)

    const userData = useSelector(state => state.accessRangeReducer)
  
    useEffect(()=>{
        if(userData.inform !== null){
            const userId = userData.inform.Tb_index;
            changeApi.get_course_transfer(userId,(res)=>{
                setListData(res.data.data)
            })
        }
    },[userData])

    useEffect(()=>{
        console.log(listData)
    },[listData])
    return(
        <div style={{ width: '95%', margin: '20px auto 0' }}>
            <Header title={`異動單管理`} subtitle={`已提交的異動單無法再做修改與刪除。`} />
            <ChangeSheet crud={"insert"} setListData={setListData}/>
            {listData&& listData.you_approval.length>0 && <YourApproval listData={listData.you_approval}/>}
            {listData&& listData.in_progress.length>0 && <Inprogress listData={listData.in_progress}/>}
            {listData&& listData.turn_down.length>0 && <TurnDown listData={listData.turn_down}/>}
            {listData&& listData.storage.length>0 && <Storage listData={listData.storage}/>}
        </div>
    )
}