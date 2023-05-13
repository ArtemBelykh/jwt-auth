import React from 'react';
import {useDispatch} from "react-redux";
import {registration} from "../redux/action";
import {useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";

const RegisterForm = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {
        register,
        formState: {errors},
        handleSubmit, reset
    } = useForm({mode: "onBlur"})

    const blure = (e) => {
        e.target.classList.add('has-val')
        if (e.target.value === "") e.target.classList.remove('has-val')

    }

    const onRegister = (data) => {
        reset()
        console.log(data)

        if (data.password === data.password1) {
            dispatch(registration(data.email, data.password))
        }else {
            alert("Passwords don't match")
        }

    }


    return (
        <div className="forms">
            <div className="container-forms">
                <div className="wrap-forms">

                        <span className="forms-title">
						    Welcome to JWT Auth created by Artem Belykh
                        </span>

                        <span className="forms-title-type">
						    Register Forms
                        </span>

                    <form className="forms-fields validate-form" onSubmit={handleSubmit(onRegister)}>


                        <div className="wrap-input validate-input">
                            <input {...register("email", {
                                required: "Enter your email",
                                minLength: {
                                    value: 3, message: "At least 3 characters"
                                }

                            })} onBlur={blure} className="input" type="email" />
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
                            })} onBlur={blure} className="input" type="password"/>
                            <span className="focus-input" data-placeholder="Password"></span>
                        </div>
                        <div>{errors?.password && <p>{errors?.password?.message}</p>}</div>

                        <div className="wrap-input validate-input">
						<span className="btn-show-pass">
							<i className="zmdi zmdi-eye"></i>
						</span>
                            <input {...register("password1", {
                                required: "Enter your password again",
                                minLength: {
                                    value: 5, message: "At least 5 characters"
                                }
                            })} onBlur={blure} className="input" type="password"/>
                            <span className="focus-input" data-placeholder="Enter the password again"></span>
                        </div>
                        <div>{errors?.password1 && <p>{errors?.password1?.message}</p>}</div>


                        <div className="container-form-btn">
                            <div className="wrap-form-btn">
                                <div className="form-bgbtn"></div>
                                <button
                                        className="login-form-btn">
                                    Sign Up
                                </button>
                            </div>
                        </div>

                        <div className="container-down-form-btn">
                            <div className="wrap-down-form-btn">
                                <div className="down-form-bgbtn"></div>
                                <button onClick={() => navigate('/')}
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
        </div>
    );
};

export default RegisterForm;