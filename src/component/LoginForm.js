import React from 'react';
import {useDispatch} from "react-redux";
import {login} from "../redux/action";
import {useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";

const LoginForm = () => {
    const dispatch = useDispatch()

    const {
        register,
        formState: {errors},
        handleSubmit, reset
    } = useForm({mode: "onBlur"})

    const navigate = useNavigate()

    const blure = (e) => {
        e.target.classList.add('has-val')
        if (e.target.value === "") e.target.classList.remove('has-val')

    }

    const onLogin = (data) => {
        reset()
        console.log(data)
        dispatch(login(data.email, data.password))
    }

    return (<div className="forms">
        <div className="container-forms">
            <div className="wrap-forms">

                        <span className="forms-title">
						    Welcome to JWT Auth created by Artem Belykh
                        </span>
                <span className="forms-title-type">
						    Login Forms
                        </span>

                <form className="forms-fields validate-form" onSubmit={handleSubmit(onLogin)}>

                    <div className="wrap-input validate-input">
                        <input {...register("email", {
                            required: "Enter your email",
                            minLength: {
                                value: 3, message: "At least 3 characters"
                            }

                        })} onBlur={blure} className="input" type="email"/>
                        <span className="focus-input" data-placeholder="Email"></span>
                    </div>
                    <div>{errors?.email && <p>{errors?.email?.message}</p>}</div>

                    <div className="wrap-input validate-input">
						<span className="btn-show-pass">
							<i className="zmdi zmdi-eye"></i>
						</span>
                        <input {...register("password", {
                            required: "Enter your password",
                            minLength: {
                                value: 5, message: "At least 5 characters"
                            }
                        })} className="input" type="password" onBlur={blure}/>
                        <span className="focus-input" data-placeholder="Password"></span>
                    </div>
                    <div>{errors?.password && <p>{errors?.password?.message}</p>}</div>

                    <div className="container-form-btn">
                        <div className="wrap-form-btn">
                            <div className="form-bgbtn"></div>
                            <button
                                className="login-form-btn">
                                Sign In
                            </button>
                        </div>
                    </div>

                    <div className="container-down-form-btn">
                        <div className="wrap-down-form-btn">
                            <div className="down-form-bgbtn"></div>
                            <button onClick={() => navigate('/registration')}
                                    className="down-form-btn">
                                Sign In
                            </button>
                        </div>


                        <a href="https://github.com/ArtemBelykh/jwt-auth-frontend/">Repository this project at the
                            GitHub</a>
                    </div>

                </form>
            </div>
        </div>
    </div>);
};

export default LoginForm;