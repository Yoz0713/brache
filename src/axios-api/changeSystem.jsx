
import axiosInstance from "./axiosInstance";
const changeApi = "https://bratsche.web-board.tw/ajax/course_transfer.php";

export const get_course_transfer = async (id,func) => {
    try {
      axiosInstance({
            method: 'post',
            url: changeApi,
            data: {
                type: "get_course_transfer",
                admin_id:id
            },
        }).then((data)=>{
            func(data)
        })

  
    } catch (error) {
        console.error(error);
    }
};

export const course_transfer_one = async (id,func) => {
    try {
      axiosInstance({
            method: 'post',
            url: changeApi,
            data: {
                type: "course_transfer_one",
                course_ch_id:id
            },
        }).then((data)=>{
            func(data)
        })

  
    } catch (error) {
        console.error(error);
    }
};




export const select_course = async (data,func) => {
    try {
      axiosInstance({
            method: 'post',
            url: changeApi,
            data: {
                type: "select_course",
                ...data
            },
        }).then((data)=>{
            func(data)
        })

  
    } catch (error) {
        console.error(error);
    }
};




export const insert_course_transfer = async (data,func) => {
    try {
      axiosInstance({
            method: 'post',
            url: changeApi,
            data: {
                type: "insert_course_transfer",
                ...data
            },
        }).then((data)=>{
            func(data)
        })

  
    } catch (error) {
        console.error(error);
    }
};