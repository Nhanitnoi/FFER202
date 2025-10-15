import React from 'react';

function Header() {
    return (
        <header className="bg-warning">
            <div className="container py-3">
                <div className="bg-white p-4 mx-auto text-center" style={{maxWidth: '400px'}}>
                    <img 
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/FPT_Education_logo.svg/320px-FPT_Education_logo.svg.png" 
                        alt="FPT Education" 
                        className="img-fluid"
                        style={{maxWidth: '250px'}}
                    />
                    <h1 className="text-warning fw-bold mt-3" style={{fontSize: '2.5rem'}}>
                        FPT UNIVERSITY
                    </h1>
                </div>
            </div>
            <nav className="bg-warning">
                <div className="container">
                    <div className="text-center py-2">
                        <a href="#home" className="text-white text-decoration-none mx-3">Home</a>
                        <a href="#about" className="text-white text-decoration-none mx-3">About</a>
                        <a href="#contact" className="text-white text-decoration-none mx-3">Contact</a>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Header;