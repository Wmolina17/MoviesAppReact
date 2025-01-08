import React, { useState } from 'react'
import Logo from "../../../public/logoN.png"
import IconSearch from "../../../public/iconSearch.png"
import { Link } from 'react-router-dom'
import "./NavBar.css"

export const NavBar = () => {
    return (
        <nav>
            <Link to="/"><img src={Logo} alt="" /></Link>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to={"/movies"}>Movies</Link>
                </li>
                <li>
                    <Link to={"/series"}>Series</Link>
                </li>
                <li>
                    <Link to={"/genres"}>Genres</Link>
                </li>
            </ul>
            <Link to="/search" className="inputGroup">
                <img src={IconSearch} alt="" />
            </Link>
        </nav>
    )
}