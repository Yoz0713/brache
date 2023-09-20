import { Box, Typography, useMediaQuery } from "@mui/material";
import React from "react";
import { IsLoading } from "../../components/loading";
import { DataGrid } from "@mui/x-data-grid";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";

export default function TurnDown({listData=[]}){
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const isMobile = useMediaQuery('(max-width:1000px)'); // 媒体查询判断是否为手机屏幕
    const columns = [
        {
            field: 'id',
            headerName: '#',
            width: 50,
            filterable: false,
            renderCell: (params) => {
                return <div>{params.row.index + 1}</div>;
            },
            hide: isMobile
        },
        {
            field: "c_name",
            headerName: "課堂名稱",
            flex: isMobile ? 0.5 : 1,
            cellClassName: "name-column--cell",
        },
        {
            field: "teacher_name",
            headerName: "老師",
            flex: 1,
            hide: isMobile
        },
        {
            field: "room_name",
            headerName: "教室",
            flex: isMobile ? 0.3 : 1,
        },
        {
            field: "class-time",
            headerName: "上課時間",
            flex: isMobile ? 0.5 : 1,
            renderCell: (rows) => {
                return (
                    <Box display={"flex"} flexWrap={"wrap"} gap={"12px"} width="100%" >
                        <p>{rows.row.StartTime}~{rows.row.EndTime}</p>
                    </Box>
                )
            }
        },
        {
            field: "modify",
            headerName: "登記",
            flex: isMobile ? 0.7 : 1,
            renderCell: (rows) => {
                return (
                    <Box display={"flex"} flexWrap={"wrap"} gap={"12px"} width="100%" >
                    </Box>
                )
            }
        },
    ];
    return(
        <Box m={"25px 0"}>
             <Typography variant="h5" sx={{fontWeight:"600"}}>駁回的異動單</Typography>
             <Box
            m="20px 0 0 0"
            width="100%"
            height="35vh"
            sx={{
                overflowX: "scroll",
                "@media all and (max-width:850px)": {
                    paddingBottom: "40px",
                    height: "40vh"
                },
                "&::-webkit-scrollbar": {
                    display: "none"
                },
                "& .MuiDataGrid-root": {
                    border: "none",
                },
                "& .MuiDataGrid-cell": {
                    borderBottom: "none",
                },
                "& .name-column--cell": {
                    color: colors.greenAccent[300],
                },
                "& .MuiDataGrid-columnHeaders": {
                    backgroundColor: colors.blueAccent[400],
                    borderBottom: "none",
                },
                "& .MuiDataGrid-virtualScroller": {
                    backgroundColor: colors.primary[400],
                },
                "& .MuiDataGrid-footerContainer": {
                    borderTop: "none",
                    backgroundColor: colors.blueAccent[900],
                },
                "& .MuiCheckbox-root": {
                    color: `${colors.greenAccent[200]} !important`,
                },
                "& .MuiDataGrid-row": {
                    borderBottom: "1px solid rgba(224, 224, 224, 1)"
                }
            }}
        >
            {listData ? <DataGrid rowHeight={isMobile ? 110 : 85} rows={listData} getRowId={(row) => row.index} columns={columns} /> : <IsLoading />}
        </Box>
        </Box>
    )
}