
import axiosInstance from "./axiosInstance";
const calendarApi = "https://bratsche.web-board.tw/ajax/course.php";

export const getAll = async (start, end) => {
    try {
        const response = await axiosInstance({
            method: 'post',
            url: calendarApi,
            data: {
                type: "get_course",
                s_date: start,
                e_date: end
            },
        });

        let data = response.data;
        return data
    } catch (error) {
        console.error(error);
    }
};

export const getOne = (id, func) => {
    try {
        axiosInstance({
            method: "POST",
            url: calendarApi,
            data: {
                type: "get_course_one",
                Tb_index: id
            }
        }).then((data) => {
            func(data)
        })
    } catch (error) {
        console.error(error);
    }

};

export const updateOne = (data, func) => {
    try {
        axiosInstance({
            method: "POST",
            url: calendarApi,
            data: {
                ...data,
                type: "update_course",
            }
        }).then((res) => {
            func(res)
        })

    } catch (error) {
        console.error(error);
    }

};

export const insertOne = (data, func) => {
    try {
        axiosInstance({
            method: "POST",
            url: calendarApi,
            data: {
                ...data,
                type: "insert_course",
            }
        }).then((res) => {
            func(res)
        })

    } catch (error) {
        console.error(error);
    }
};



export const deleteOne = (id, func) => {
    try {
        axiosInstance({
            method: "POST",
            url: calendarApi,
            data: {
                Tb_index: id,
                type: "delete_course",
            }
        }).then((res) => {
            func(res)
        })

    } catch (error) {
        console.error(error);
    }

};


export const import_course = (data, func) => {
    try {
        axiosInstance({
            method: "POST",
            url: "https://bratsche.web-board.tw/ajax/course_template.php",
            data: {
                ...data,
                type: "import_course",
            }
        }).then((res) => {
            func(res)
        })

    } catch (error) {
        console.error(error);
    }

};
