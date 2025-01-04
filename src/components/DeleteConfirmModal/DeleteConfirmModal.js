import React from "react";

function DeleteConfirmModal ({ handleDeletePost, closePopups }) {

    const handleDeleteButton = () =>{
        handleDeletePost();
        closePopups();
    }


    return(
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white w-full max-w-md rounded-lg p-6 relative">
            <h2 className="text-xl font-bold mb-4 text-center text-pink-700">Confirmar Eliminación</h2>
            <p className="mb-4 text-center">¿Estás seguro de que deseas eliminar esta publicación?</p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={handleDeleteButton}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300"
              >
                Eliminar
              </button>
              <button
                onClick={() => closePopups() }
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 transition duration-300"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
    )
}

export default DeleteConfirmModal;