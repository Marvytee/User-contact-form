import React, { useState } from "react";
import {useForm} from "react-hook-form"
import axios from 'axios'
import {nanoid} from "nanoid"

export default function Form(){
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [success, setSuccess] = useState("")
    const [neterror, setNeterror] = useState("")
    function onSubmit(data){
        const mainData = {...data, id: nanoid()}
        axios
        .post(
            'https://my-json-server.typicode.com/tundeojediran/contacts-api-server/inquiries',
            mainData,
            { headers: { 'Content-Type': 'application/json' }}
         )
        .then((response) => {
            console.log(response)
            setSuccess("Your submission was successful!")
            setNeterror("")
        }).catch((error) => {
            setSuccess("")
            setNeterror("Your submission was not successful because of " + error.message + "!")
        });
        
        reset();
    }
    return(
        <form onSubmit={handleSubmit(onSubmit)}>
            <h1>Get in touch with us.</h1>
            <h2>{success}</h2>
            <h2 className="error">{neterror}</h2>
            <div>
                <label htmlFor="name">Name: </label>
                <input {...register("name", {required: true})} type="text" id="name"></input>
                {errors.name?.type === "required" && <p>Please input your name.</p>}
            </div>
            <div>
                <label htmlFor="email">E-mail: </label>
                <input {...register("email", {required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i})} type="email" id="email"></input>
                {errors.email?.type === "required" && <p>Please enter your email address.</p>}
                {errors.email?.type === "pattern" && <p>Please enter a valid email address.</p>}
            </div>
            <div>
                <label htmlFor="subject">Subject: </label>
                <input {...register("subject")}type="text" id="subject"></input>
            </div>
            <div>
                <label htmlFor="message">Message: </label>
                <input {...register("message", {required: true})} type="text" id="message"></input>
                {errors.message?.type === "required" && <p>Please enter a message.</p>}
            </div>
            <button type="submit">Submit</button>
        </form>
    )
}