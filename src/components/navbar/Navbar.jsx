import React from 'react';
import { Link } from "@reach/router"
import style from './navbar.module.scss'

function Navbar() {

    const isActive = ({ isCurrent }) => ({ className: isCurrent ? style.active : ''})
     
    return (
        <nav>
            <Link to='/'>
                <i className="material-icons md-48">home</i>
            </Link>
            <Link getProps={isActive} to='/school-projects'>
                <p>Projets scolaires</p>
            </Link>
            <Link getProps={isActive} to='/oss-projects'>
                <p>Projets Open sources</p>
            </Link>
            <Link getProps={isActive} to='/perso-projects'>
                <p>Projets personnels</p>
            </Link>
            <Link getProps={isActive} to='/other-projects'>
                <p>Autres projets</p>
            </Link>
            <Link getProps={isActive} to='/iot'>
                <p>IoT</p>
            </Link>
            <Link getProps={isActive} to='/monitoring'>
                <p>Monitoring</p>
            </Link>
            <a href='https://design.bugsyaya.dev/'>
                <p>UI/UX design</p>
            </a>
            <Link getProps={isActive} to='/cv'>
                <p>CV</p>
            </Link>
            <Link getProps={isActive} to='/contact'>
                <p>Contact</p>
            </Link>
        </nav>
    )
}

export default Navbar;