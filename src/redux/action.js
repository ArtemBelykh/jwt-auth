import {CHECK_AUTH, SET_USER} from "./types";
import axios from "axios";
import $api, {conf} from "../http/axios";

export const registration = async (email, password) => {
    try {
        const response = await axios.post(`http://localhost:5000/api/registration`, {
            email,
            password
        })
        alert(response.data.message)
    } catch (e) {
        alert(e.response.data.message)
    }
}

export const login = (email, password) => {
    return async dispatch => {
        try {
            await $api.post(`http://localhost:5000/api/login`, {
                email,
                password
            }).then(res => {
                dispatch({
                    type: SET_USER,
                    payload: res.data.user
                })

                localStorage.setItem('token', res.data.accessToken)
                document.cookie = `refreshToken=` + res.data.refreshToken
            })


            //console.log(response.data)
        } catch (e) {
            alert(e.response.data.message)
        }
    }
}

export const checkAuth = () => {
    try {
        return async dispatch => {
            await axios.get(`http://localhost:5000/api/refresh`, {

                    withCredentials: true
                }
            ).then(res => {
                dispatch({
                    type: SET_USER,
                    payload: res.data
                })

                //console.log(res)
            }).catch((error) => {
                console.error(error)
            })
        }

        //localStorage.setItem('token', response.data.accessToken)
        //



    } catch (e) {
        console.log(e.response?.data?.message);
    }


}