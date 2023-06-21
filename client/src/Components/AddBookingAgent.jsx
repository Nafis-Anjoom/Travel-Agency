import React, {useState} from "react";
import axios from "axios";


export default function AddBookingAgent(){
    const [email, setEmail] = useState("");
    const [phoneNum, setPhoneNum] = useState("")
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        await axios.post("http://localhost:3005/empSignIn", {
            email, password
        });
    }
    
    return (
        <>
            <div className="container">
                <form onSubmit={handleSubmit}>
                    <div class="mb-3">
                        <label for="firstName" class="form-label">First name</label>
                        <input class="form-control" id="firstName"/>
                    </div>
                    <div class="mb-3">
                        <label for="lastName" class="form-label">First name</label>
                        <input class="form-control" id="lastName"/>
                    </div>
                    <div class="mb-3">
                        <label for="phoneNum" class="form-label">Phone number</label>
                        <input class="form-control" id="phoneNum"/>
                    </div>
                    <div class="mb-3">
                        <label for="email" class="form-label">Email address</label>
                        <input type="email" class="form-control" id="email" aria-describedby="emailHelp" onChange={(event) => setEmail(event.target.value)}/>
                    </div>
                    <div class="mb-3">
                        <label for="fanPassword" class="form-label">Password</label>
                        <input type="password" class="form-control" id="fanPassword" onChange={(event) => setPassword(event.target.value)}/>
                    </div>
                    <button type="submit" class="btn btn-primary">Submit</button>
                </form>
            </div>
        </>
    );
}