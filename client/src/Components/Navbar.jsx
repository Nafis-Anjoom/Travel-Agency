import React, {useState} from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Navbar() {
    return (
        <>
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <a class="navbar-brand" href="#">WCT</a>
            </nav>
        </>
    );
}