import React from "react";
import Card from "../Card/Card";

//Contexts
import { AdminLogStatusContext } from "../../contexts/AdminLogStatusContext";


function Main ({ openCommentDeleteConfirmModal, handleCreateComment, openDeleteConfirmModal ,postCards, clickImage, openAddPostModal}) {
    
  const isAdminTrue = React.useContext(AdminLogStatusContext)

    return(
        <main className="container mx-auto px-4 py-8 max-w-2xl">
            <div className="space-y-8" >
            {isAdminTrue && (
          <div className="mb-8 flex justify-center">
            <button
              onClick={openAddPostModal}
              className=" bg-pink-500 text-white px-8 py-2 rounded-md hover:bg-pink-600 transition duration-300 w-full max-w-md"
            >
              Agregar publicación
            </button>
          </div>
        )}
        {postCards.length > 0 ? (
          postCards.map((post) => (
            <Card openCommentDeleteConfirmModal={openCommentDeleteConfirmModal} handleCreateComment={handleCreateComment} openDeleteConfirmModal={openDeleteConfirmModal}  key={post._id} post={post} clickImage={clickImage} />
          ))
        ) : (
          // Mostrar un mensaje si no hay tarjetas
          <div className="text-center text-gray-500">No hay tarjetas disponibles</div>
        )}
      </div>
    </main>
  );
}

export default Main;