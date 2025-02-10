import React, { useState, useEffect } from 'react';
import Basket from './basket';

function Header() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
    const handleScroll = () => {
        if (window.scrollY > 0) {
        setScrolled(true);
        } else {
        setScrolled(false);
        }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
        window.removeEventListener('scroll', handleScroll);
    };
    }, []);
    
    return (
        <header id="header" className={`header ${scrolled ? 'scrolled' : ''}`}>
            <img src={`${process.env.PUBLIC_URL}/logo.svg`} />
            <a href="#header"><p class="logo-text">Witch Market</p></a>
            <nav>
                <ul>
                    <li>
                        <a href="#hero">
                            <h3><img src={`${process.env.PUBLIC_URL}/1.svg`} />Про ринок</h3>
                        </a>
                    </li>
                    <li>
                        <a href="#items">
                            <h3><img src={`${process.env.PUBLIC_URL}/wand.svg`} />Магічні предмети</h3>
                        </a>
                    </li>
                    <li>
                        <a href="#vendors">
                            <h3><img src={`${process.env.PUBLIC_URL}/chart.svg`} />Торговці</h3>
                        </a>
                    </li>
                    <li>
                        <a href="#reviews">
                            <h3><img src={`${process.env.PUBLIC_URL}/starr.svg`} />Відгуки</h3>
                        </a>
                    </li>
                    <li>
                        <a href="#offers">
                            <h3><img src={`${process.env.PUBLIC_URL}/bag.svg`} />Спеціальні пропозиції</h3>
                        </a>
                    </li>
                    <li>
                        <a href="#contact">
                            <h3><img src={`${process.env.PUBLIC_URL}/contact.svg`} />Контакти</h3>
                        </a>
                    </li>
                </ul>
            </nav>
            <Basket />
        </header>
    )
}

export default Header;