import React from 'react';
import { UserLogStatusContext } from '../../contexts/UserLogStatusContext';

function AuthModal({ handleSignUpForm, handleLogInForm , closePopups, LogOutClick }) {
  const isLoggedIn = React.useContext(UserLogStatusContext);

  const [activeTab, setActiveTab] = React.useState('signin');

  const [signinEmail, setSigninEmail] = React.useState('');
  const [signinPassword, setSigninPassword] = React.useState('');
  const [signupName, setSignupName] = React.useState('');
  const [signupEmail, setSignupEmail] = React.useState('');
  const [signupPassword, setSignupPassword] = React.useState('');

  function handleSigninEmailChange(e) {
    setSigninEmail(e.target.value);
  }

  function handleSigninPasswordChange(e) {
    setSigninPassword(e.target.value);
  }

  function handleSignupNameChange(e) {
    setSignupName(e.target.value);
  }

  function handleSignupEmailChange(e) {
    setSignupEmail(e.target.value);
  }

  function handleSignupPasswordChange(e) {
    setSignupPassword(e.target.value);
  }

  
  function handleLogInSubmit(e) {
    e.preventDefault();

    handleLogInForm(signinEmail, signinPassword);
    closePopups();  
  }

  function handleSignUpSubmit(e) {
    e.preventDefault();
    handleSignUpForm(signupName, signupEmail, signupPassword)
    closePopups();  
   
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white w-full max-w-md rounded-lg p-6 relative">
        <button
          onClick={closePopups}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          aria-label="Close"
        >
          <img
            alt=""
            className="w-6 h-6"
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAARlJREFUSEvt1M8qxUEYxvHP2SrZEMpCUlyD/Cls5TZkq9yJzsZKuQG5AmSFbP3JmiVX4PfWqF/6nZlx6mRzZjm98zzv8513pmfEqzdifWODIuF/R3SMM7wPaHUFGzgdFCWX4BAneMFmh8kyrjGHfVx0meQM4mAIhNBr6vQnyRJuMYtHbOHrrwZR32UyUSseAjWXPI+rlOQJU8n4vkm4g8/cKNUYxPmFhGsxiWWxtA1rDYJ1MA/2sR6aVNul7msRhfhNQvScEMXeXbO/WzIpJWh3/oY1TLbGs5gkZ9Al/pEQxegGspkSrpzBQTPnfQSWmPPfr3k1JZnGHi6HeQdHOM98FWGyPuxXUfwpawpKl1yjka0ZGxQRjhzRNxi0NBmpupZSAAAAAElFTkSuQmCC"
          />
        </button>
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-center text-pink-700">
            {isLoggedIn ? 'Cuenta': 'Iniciar sesión/Registrarse'}
          </h2>
          {isLoggedIn ? (
            <div className="text-center">
              <p className="mb-4">Has iniciado sesión.</p>
              <button
                onClick={LogOutClick}
                className="w-full bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-600 transition duration-300"
              >
                Finalizar la sesión
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="border-b border-gray-200">
                <nav className="-mb-px flex" aria-label="Tabs">
                  <button
                    onClick={() => setActiveTab('signin')}
                    className={`w-1/2 py-2 px-1 text-center border-b-2 font-medium text-sm ${
                      activeTab === 'signin'
                        ? 'border-pink-500 text-pink-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    Iniciar sesión
                  </button>
                  <button
                    onClick={() => setActiveTab('signup')}
                    className={`w-1/2 py-2 px-1 text-center border-b-2 font-medium text-sm ${
                      activeTab === 'signup'
                        ? 'border-pink-500 text-pink-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    Registrarse
                  </button>
                </nav>
              </div>
              {activeTab === 'signin' ? (
                <form onSubmit={handleLogInSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="signin-email" className="block text-sm font-medium text-gray-700">
                      Correo
                    </label>
                    <input
                      type="email"
                      id="signin-email"
                      value={signinEmail}
                      onChange={handleSigninEmailChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-300 focus:ring focus:ring-pink-200 focus:ring-opacity-50"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="signin-password" className="block text-sm font-medium text-gray-700">
                      Contraseña
                    </label>
                    <input
                      type="password"
                      id="signin-password"
                      value={signinPassword}
                      onChange={handleSigninPasswordChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-300 focus:ring focus:ring-pink-200 focus:ring-opacity-50"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-600 transition duration-300"
                  >
                    Iniciar sesión
                  </button>
                </form>
              ) : (
                <form onSubmit={handleSignUpSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="signup-name" className="block text-sm font-medium text-gray-700">
                      Nombre
                    </label>
                    <input
                      type="text"
                      id="signup-name"
                      value={signupName}
                      onChange={handleSignupNameChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-300 focus:ring focus:ring-pink-200 focus:ring-opacity-50"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="signup-email" className="block text-sm font-medium text-gray-700">
                      Correo
                    </label>
                    <input
                      type="email"
                      id="signup-email"
                      value={signupEmail}
                      onChange={handleSignupEmailChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-300 focus:ring focus:ring-pink-200 focus:ring-opacity-50"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="signup-password" className="block text-sm font-medium text-gray-700">
                      Contraseña
                    </label>
                    <input
                      type="password"
                      id="signup-password"
                      value={signupPassword}
                      onChange={handleSignupPasswordChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-300 focus:ring focus:ring-pink-200 focus:ring-opacity-50"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-600 transition duration-300"
                  >
                    Registrarse
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AuthModal;
