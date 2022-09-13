import { useState } from "react";


export default function LoginUser() {
    const [submited, setSubmited] = useState(false);
    const [error, setError] = useState("");

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");


    // username should only contains letters and numbers (no spaces, 1 special character only)
    // password with at least 5 letters and 2 numbers, (at least 1 uppercase letter & lowercase, no spaces)


    // \n new line
    // /^.*(?=.{5,40})(?=.*\d)(?=.*[a-zA-Z]).*$/

    // return (
    //     <div>
    //         <form onSubmit={handleSubmit(onSubmit)} >
    //             <label>
    //                 Name:
    //                 <input {...register("username", { 
    //                     required: true,
    //                 })} /> 

    //                 Password
    //                 <input {...register("password", { 
    //                     required: true 
    //                 })} />
    //             </label>
    //             {errors && <div></div>}
    //             <input type="submit" value="Submit" />
    //         </form>
    //     </div>
    // )
}