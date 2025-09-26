import React from "react";
import Button from "../components/Button";
import Search from "../components/SearchBar";
import styles from './Navbar.module.css'
import Logo from "./Logo";


export default function Navbar(){
    return(
        <>
            <nav className={styles.navbar}>
                <div className={styles.logoDiv}><Logo /></div>
                <Search search={"Search a song of your choice"}/>
                <Button children="Give Feedback"/>
            </nav>
        </>
    )
}