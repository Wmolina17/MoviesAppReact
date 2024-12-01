import React from 'react'
import LogoSmall from "../../../public/logoSmall.png"
import "./footer.css"

export const Footer = () => {
    return (
        <footer>
            <img src={LogoSmall} alt="" />
            <div className="text">
                <p> Mov Copiright 2024 © All rights reserved &nbsp; &nbsp; |</p>
                <p>Made with React.js <a target='_blank' href="https://portafolio-w-dev.netlify.app/"> By Wdev</a></p>
            </div>
        </footer>
    )
}
