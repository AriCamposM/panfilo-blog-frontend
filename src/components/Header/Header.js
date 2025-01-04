import React from "react";

import { UserLogStatusContext } from "../../contexts/UserLogStatusContext";

function Header ({openAuthModal}) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false); 
    const isLoggedIn = React.useContext(UserLogStatusContext)
     const openMobileMenu = () =>{
        setIsMobileMenuOpen(!isMobileMenuOpen);
      }
    

    return(
        <header className="bg-pink-200 py-4 sticky top-0 z-20">
            <div className="container mx-auto px-4 flex justify-between items-center">
                <h1 className="text-3xl font-bold font-diphylleia text-pink-800">
                    Panfilo Blog &hearts;
                </h1>
                <nav className="hidden md:flex space-x-4  hover:bg-pink-600 bg-pink-500 p-2  rounded-full
                                 transition duration-300">
                    <button className="text-white " onClick={openAuthModal}>
                        {isLoggedIn ? 'Log Out' : 'Log In / Sign Up'}
                    </button>
                </nav>
                <button className="md:hidden text-pink-800">
                    <img
                    alt=""
                    onClick={openMobileMenu}
                    className="w-6 h-6 aspect-square" 
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAExJREFUSEtjZKAxYKSx+QyjFhAM4QEJov8EnYVfAYqjsfmA5hZQ6AFU7QMSBzT3Ac3jgOYW0DyIhr4FNI8Dmlsw9ONg1AcoIUDz0hQAbegGGXzv/l0AAAAASUVORK5CYII="
                    />
                </button>
            </div>
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 p-2 hover:bg-pink-600 bg-pink-500 rounded-full
          transition duration-300">
            <button
              className="w-full text-white  px-4 py-2 rounded-md transition duration-300 
              text-lg"
              onClick={() => {
                openAuthModal()
                setIsMobileMenuOpen(false);
              }}
            >
              {isLoggedIn ? 'Finalizar la sesión' : 'Iniciar sesión / Registrarse'}
            </button>
          </div>
        )}
        </header>
    )
}

export default Header;