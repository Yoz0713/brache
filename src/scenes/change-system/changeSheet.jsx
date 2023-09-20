import React from "react";
import Header from "../../components/Header";
import SelectCalendar from "../calendar/selectCalendar";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel, InputLabel, MenuItem, TextField, useMediaQuery } from "@mui/material";
import { useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import { useEffect } from "react";
import { TimeSelect } from "../calendar/calendar";
import { getAll } from "../../axios-api/calendarData";
import { dataTransformTable, formatDateBack } from "../calendar/getMonday";
import { IsLoading } from "../../components/loading";
import Select from '@mui/material/Select';
import * as changeApi from "../../axios-api/changeSystem"
import { useSelector } from "react-redux";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { getOne } from "../../axios-api/calendarData";
import * as teacherApi from "../../axios-api/teacherData";

function OpenSelectClass({teacher=null,date=null,setClassDate,data,setData,type =null}){
    const [listData,setListData] = useState(null)
    const userData = useSelector(state => state.accessRangeReducer)
    const newDate = new Date(date)
    const handleCancel=()=>{
        setClassDate(null)
    }
    useEffect(()=>{
        if(date && userData){
            changeApi.select_course({
                c_date:`${newDate.getFullYear()}-${newDate.getMonth()+1}-${newDate.getDate()}`,
                teacher_id:teacher ? teacher:userData.inform.Tb_index
            },(data)=>{
                setListData(data.data.data)
            })
        }
    },[date])
    
    return(
        <>
        <Dialog open={date !== null ? date : false} onClose={()=>setClassDate(null)}
        sx={{
            "& .MuiPaper-root": { padding: " 10px 25px" },
            "& label": {
                fontSize: "16px"
            },
            "& .MuiDialog-container > .MuiPaper-root": {
                padding: " 10px 25px",
                width: "100%",
                maxWidth: "650px",
            },
            "& ul":{
                width:"100%",
                padding:0,
                border:"1px solid #000",
                borderBottom:"none",
                "& li":{
                    display:"flex",
                    listStyle:"none",
                    width:"100%",
                    "& .box":{
                        display:"flex",
                        justifyContent:"center",
                        alignItems:"center",
                        width:"28%",
                        height:"45px",
                        borderBottom:"1px solid #000",
                        "& label":{
                            margin:0
                        },
                        "& p":{
                            textAlign:"center",
                            margin:0,
                            lineHeight:1
                        },
                        "&.radio":{
                            width:"16%"
                        }
                    }
                }
            }
        }}>
        {listData ?
        <RadioGroup
             row
             aria-labelledby="demo-row-radio-buttons-group-label"
             name="row-radio-buttons-group"
             onChange={(e) => {
                if(type !== "換課"){
                    setData({
                        ...data,
                        course_id:e.target.value
                    })
                }else{
                    setData({
                        ...data,
                        change_course_id:e.target.value
                    })
                }
                
             }}
             value={data.radio}
         >
            <h4>{`${newDate.getFullYear()}年${newDate.getMonth()+1}月${newDate.getDate()}日課堂`}</h4>
            <ul>
                <li>
                    <div className="box">名稱</div>
                    <div className="box">教室</div>
                    <div className="box">上課</div>
                    <div className="box radio">選擇</div>
                </li>
         {listData.map((item)=>{
            return(
            <li key={item.Tb_index}>
                <div className="box"><p>{item.c_name}</p></div>
                <div className="box"><p>{item.room_name}</p></div>
                <div className="box"><p>{item.StartTime}</p></div>
                <div className="box radio"><FormControlLabel value={item.Tb_index} control={<Radio  />}  /></div>
            </li>
            )
         })}
     </ul>
     <DialogActions sx={{display:"flex",width:"100%",padding:0,ustifyContent:"flex-end", "& button": { fontSize: "15px",padding:0 } }}>
                        <Button onClick={handleCancel}>確認</Button>
    </DialogActions>
     </RadioGroup>:<IsLoading/>    
            }
               
        </Dialog>
      
        </>
     
    )
}

function TargetClass({course_id}){
    const [courseData,setCourseData]=useState(null)
    useEffect(()=>{
        //calendarApi
        getOne(course_id,(data)=>{
            setCourseData(data.data.data[0])
        })
    },[course_id])
    return(
    <>
        {courseData &&
            <>
            <Box sx={{
                 "& ul":{
                    width:"100%",
                    padding:0,
                    border:"1px solid #000",
                    borderBottom:"none",
                    "& li":{
                        display:"flex",
                        listStyle:"none",
                        width:"100%",
                        "& .box":{
                            display:"flex",
                            justifyContent:"center",
                            alignItems:"center",
                            width:"25%",
                            height:"45px",
                            borderBottom:"1px solid #000",
                            textAlign:"center",
                            "& label":{
                                margin:0
                            },
                            "& p":{
                                textAlign:"center",
                                margin:0,
                                lineHeight:1
                            }
                        }
                    }
                }
            }}>
               <ul>
                    <li>
                        <div className="box">名稱</div>
                        <div className="box">日期</div>
                        <div className="box">教室</div>
                        <div className="box">上課</div>
                    </li>
                    <li>
                        <div className="box">{courseData.c_name}</div>
                        <div className="box">{courseData.c_date}</div>
                        <div className="box">{courseData.room_name}</div>
                        <div className="box">{courseData.StartTime}</div>
                    </li>
                </ul>
            </Box>
            </>
        }
    
    </>
    
    )
}

function TargetTeacher({teacher,setTeacher}){
    const [teacherAll,setTeacherAll] = useState(null)
    
    useEffect(()=>{
        teacherApi.getAll().then((data) => {
            setTeacherAll(data.data);
          });
    },[])
    return(
       <>
         {teacherAll &&
                  <FormControl fullWidth  sx={{width:"fit-content"}}>
                    <InputLabel id="demo-simple-select-label">老師</InputLabel>
                    <Select onChange={(e) => {
                      setTeacher(e.target.value)
                    }}
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={teacher}
                      label="老師"
                      sx={{ width: "120px", maxWidth: "300px", "& .MuiButtonBase-root": { padding: "0 16px" } }}>
                      {teacherAll.map((item, i) => (
                        <MenuItem key={item.Tb_index} value={item.Tb_index} >
                          {item.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                }
       </>
    )
}

function OpenSelectCalendar({setData}){
    const [currentDate, setCurrentDate] = useState(null)
    const [tableData,setTableData] = useState(null)
    const isMobile = useMediaQuery('(max-width:1000px)'); // 媒体查询判断是否为手机屏幕
    useEffect(() => {
        if (currentDate) {
            //獲取calendar的資料
            getAll(formatDateBack(currentDate), formatDateBack(currentDate)).then((data) => {
            setTableData(dataTransformTable(data.data));
          })
        }
      }, [currentDate])
    return(
        <>
       
          <Box display={"flex"} alignItems={"center"}>
                <p style={{ color: "red", fontSize: "13px", letterSpacing: "0.1em", margin: "0px 5px 6px 0" }}>(時間與教室透過右邊行事曆選擇)--{'>'}</p>
                <TimeSelect setCurrentDate={setCurrentDate} />
            </Box>
            {currentDate &&
                <Dialog open={currentDate !==null ? currentDate :false} onClose={() => setCurrentDate(null)} sx={{
                  "& .MuiPaper-root": isMobile ? {
                    maxWidth: "100%",
                    width: "100%",
                    margin: 0
                  } : {
                    maxWidth: "700px",
                    padding: "25px"
                  }
                }}>
                  {tableData ? <SelectCalendar tableData={tableData} setData={setData} currentDate={currentDate} setCurrentDate={setCurrentDate}></SelectCalendar> : <IsLoading />}
                </Dialog>
              }
        </>
    )
}


export default function ChangeSheet({sheetId,crud,setListData}){
    const [open,setOpen] = useState(false)
    //獲取使用者資訊
    const userData = useSelector(state => state.accessRangeReducer)
      //主要後續傳後端的data
      const [data,setData] = useState({})
    //異動課堂
    const [classDate,setClassDate] = useState(null)
    //互換課堂
    const [teacher,setTeacher] = useState(null)
    const [classDate2,setClassDate2] = useState(null)
  
    //欲調課的位置
    const [newClass,setNewClass] = useState({})
    const handleCancel = ()=>{
        setData({})
        setOpen(false)
    }
  
      useEffect(()=>{
        console.log(data)
      },[data,classDate])



      useEffect(()=>{
        setData({
            ...data,
            change_date:newClass.c_date,
           change_StartTime:newClass.StartTime,
           change_EndTime:newClass.EndTime,
           change_room_name:newClass.room_name
        })
      },[newClass])

      useEffect(()=>{
        if(data?.change_type !== "1"){
            setNewClass({})
        }
        if (data?.change_type !== "2"){
            setTeacher(null)
            setData({
                ...data,
                change_course_id:undefined
            })
        }
      },[data.change_type])
  
     const handleSubmit = (status)=>{
        //status === 0 = > 暫存
          //status === 1 = > 送出
        if(window.confirm(status === "0" ? "是否要暫存此異動單" : "送出後不可再修改，確認是否送出此異動單")){
            const userId = userData.inform.Tb_index;
            if(data.change_type === "1"){
                if(data.course_id && data.change_date){
                    changeApi.insert_course_transfer({
                        ...data,
                        admin_id:userId,
                        c_remark:data?.c_remark || " ",
                        change_status:status
                    },(res)=>{
                        changeApi.get_course_transfer(userId,(res)=>{
                            setListData(res.data.data)
                        })
                       handleCancel()
                    })
                }else{
                    window.alert("資料未完整，無法送出")
                }
              
            }else if(data.change_type === "2"){
                if(data.course_id && data.change_course_id){
                    changeApi.insert_course_transfer({
                        ...data,
                        admin_id:userId,
                        c_remark:data?.c_remark || " ",
                        change_status:status
                    },(res)=>{
                        changeApi.get_course_transfer(userId,(res)=>{
                            setListData(res.data.data)
                        })
                       handleCancel()
                    })
                }else{
                    window.alert("資料未完整，無法送出")
                }
            }else{
                if(data.course_id ){
                    changeApi.insert_course_transfer({
                        ...data,
                        admin_id:userId,
                        c_remark:data?.c_remark || " ",
                        change_status:status
                    },(res)=>{
                        changeApi.get_course_transfer(userId,(res)=>{
                            setListData(res.data.data)
                        })
                       handleCancel()
                    })
                }else{
                    window.alert("資料未完整，無法送出")
                }
            }
        }
     }
  
    return(
        <>
             <Button variant="contained" sx={{ backgroundColor: "#6DC4C5", width: "85px", gap: "5px" }} onClick={(e) => {
            e.stopPropagation()
            if(sheetId){
                changeApi.course_transfer_one(sheetId,(res)=>{
              
                    setData(res.data.data)
                })
            }
       
            setOpen(true)
          }}>
            {crud !== "view" &&  <EditIcon />}
            {crud === "insert" && "新增"}
            {crud === "view" && "檢視"}
            {crud === "update" && "修改"}
            {crud === "needApproval" && "簽核"}
          </Button >
          <Dialog open={open} onClose={handleCancel} sx={{
                "& .MuiPaper-root": { padding: " 10px 25px" },
                "& label": {
                    fontSize: "16px"
                },
                "& .MuiDialog-container > .MuiPaper-root": {
                    padding: " 10px 25px",
                    width: "100%",
                    maxWidth: "650px",

                },
            }}>
            <DialogTitle sx={{ fontSize: "20px",padding:0 }}>
            {crud === "insert" && "異動單新增"}
            {crud === "view" && "異動單檢視"}
            {crud === "update" && "異動單修改"}
            {crud === "needApproval" && "異動單簽核"}
            </DialogTitle>
                <DialogContent sx={{padding:0,margin:"10px 0"}}>
                    <InputLabel id="demo-simple-select-label"sx={{marginBottom:"5px"}}>異動課堂</InputLabel>
                    {crud !== "view"&& crud !== "needApproval" &&
                     <Box display={"flex"} gap={"5px"} alignItems={"center"}>
                     <p style={{ color: "red", fontSize: "13px", letterSpacing: "0.1em", margin: "0px 5px 6px 0" }}>(課堂日期透過右邊查詢)--{'>'}</p>
                     <TimeSelect setCurrentDate={setClassDate}/>
                 </Box>
                    }
                   
                    {data.course_id &&<TargetClass course_id={data.course_id}/>}
                    {classDate &&<OpenSelectClass date={classDate} setClassDate={setClassDate} setData={setData} data={data}/>}
                </DialogContent>
                <DialogContent sx={{padding:0,margin:"10px 0"}}>
                    <InputLabel id="demo-simple-select-label">事由</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="事由"
                        onChange={(e) => {
                            setData({
                                ...data,
                                change_type:e.target.value
                            })
                        }}
                        fullWidth
                        sx={{ "& #demo-simple-select": { padding: "10px" }, marginTop: "10px" }}
                        value={data.change_type || ''} // 确保值不为 undefined
                        disabled={crud  === "view" || crud === "needApproval"}
                    >
                        <MenuItem value={"1"} >{"調課"}</MenuItem>
                        <MenuItem value={"2"} >{"換課"}</MenuItem>
                        <MenuItem value={"3"} >{"補簽"}</MenuItem>
                    </Select>
                </DialogContent>
               
                {data.change_type === "1" &&
                  <DialogContent sx={{padding:0,margin:"10px 0"}}>
                       <InputLabel id="demo-simple-select-label" sx={{margin:"10px 0 5px"}}>欲調課至的課堂日期</InputLabel>
                    {crud !== "view"&& crud!=="needApproval" &&
                       <OpenSelectCalendar setData={setNewClass}/>
                    }
                      <TextField
                    autoFocus
                    margin="dense"
                    id="c_date"
                    label="日期"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={data.change_date || " "}
                
                    className='input'
                  />
                  <TextField
                    autoFocus
                    margin="dense"
                    id="room_name"
                    label="教室"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={data.change_room_name || " "}
                
                    className='input'
                  />
  
                  <TextField
                    autoFocus
                    margin="dense"
                    id="StartTime"
                    label="課堂開始時間"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={data.change_StartTime || " "}
                
                    className='input'
                  />
                  <TextField
                    autoFocus
                    margin="dense"
                    id="EndTime"
                    label="課堂結束時間"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={data.change_EndTime || " "}
                
                    className='input'
                  />
                  </DialogContent>
                }
              {data.change_type === "2" &&
                  <DialogContent sx={{padding:0,margin:"10px 0"}}>
                        <InputLabel id="demo-simple-select-label"sx={{marginBottom:"20px"}}>互換的課堂</InputLabel>
                        <Box display={"flex"} gap={"5px"} alignItems={"center"} flexWrap={"wrap"} m={"5px 0 0 0"}>
                            {crud !== "view" && crud !== "needApproval" &&
                            <>
                             <TargetTeacher teacher={teacher} setTeacher={setTeacher}/>
                            {teacher && <>
                                <p style={{ color: "red",display:"inline", fontSize: "13px", letterSpacing: "0.1em", margin: "0px 5px 6px 0" }}>(課堂資訊透過右邊查詢)--{'>'}</p>
                                <TimeSelect setCurrentDate={setClassDate2}/>
                            </>}
                            </>
                            }
                           
                            {classDate2 &&<OpenSelectClass teacher={teacher} date={classDate2} setClassDate={setClassDate2} setData={setData} data={data} type={"換課"}/>}
                        </Box>
                        {data.change_course_id &&<TargetClass course_id={data.change_course_id}/>}
                  </DialogContent>
                }

                <DialogContent sx={{padding:0,margin:"10px 0"}}>
                <InputLabel id="demo-simple-select-label"sx={{marginBottom:"5px"}}>備註</InputLabel>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            type="text"
                            fullWidth
                            variant="standard"
                            onChange={(e) => {
                                setData({
                                    ...data,
                                    c_remark: e.target.value,
                                })
                            }}
                            value={data.c_remark}
                            disabled={crud === "view" || crud === "needApproval"}
                        />
                </DialogContent>   
                {(crud !== "view" && crud !== "needApproval") ?
                  <DialogActions  sx={{display:"flex",width:"100%",justifyContent:"space-between" }}>
                    <Button onClick={()=>handleSubmit("0")} sx={{padding:0,width:"fit-content",marginLeft:"-5px",border:"1px solid #1a1a1a",fontSize:"14px"}}>暫存</Button>
                    <Box display={"flex"} sx={{"& button": { fontSize: "16px" }}}>
                        <Button onClick={()=>handleSubmit("1")}>送出</Button>
                        <Button onClick={handleCancel}>取消</Button>
                    </Box>
                </DialogActions> 
              :
                <DialogActions  sx={{display:"flex",width:"100%",justifyContent:"flex-end" }}>
                    <Box display={"flex"} sx={{"& button": { fontSize: "16px" }}}>
                        <Button onClick={handleCancel}>返回</Button>
                    </Box>
                </DialogActions> 
                }

                {crud === "needApproval" && <Button variant="contained"  sx={{position:"absolute",left:"25px",bottom:"20px",fontSize:"16px", backgroundColor: "#6DC4C5"}} onClick={()=>{
                    if(window.confirm("簽核後無法再取消，是否要簽核此異動單?")){
                        handleCancel()
                    }
                }}>簽核</Button>}
          </Dialog>
        </>
    )
}