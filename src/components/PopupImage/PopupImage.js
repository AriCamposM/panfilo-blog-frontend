import React from "react";
import { UserLogStatusContext } from "../../contexts/UserLogStatusContext";

function PopupImage({ handleCreateCommentPopupImage, selectedPost, closePopups }) {
    const [newComment, setNewComment] = React.useState('');
    const isLoggedIn = React.useContext(UserLogStatusContext);

    // Función para manejar el envío de un comentario
    const handleCommentSubmit = (e) => {
        e.preventDefault(); // Evitar el comportamiento predeterminado de recargar la página
        if (newComment.trim() !== '') {
            // Llamar a la función que pasa el comentario y el ID del post
            handleCreateCommentPopupImage(newComment, selectedPost._id);

            // Limpiar el campo de texto después de enviar el comentario
            setNewComment('');
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white w-full max-w-4xl h-[80vh] rounded-lg overflow-hidden flex flex-col sm:flex-row">
                <div className="w-full sm:w-2/3 h-full relative">
                    <img
                        src={`https://panfilo-blog-backend.onrender.com${selectedPost.image}`}
                        alt={selectedPost.title}
                        className="w-full h-full object-cover sm:aspect-auto aspect-square"
                    />
                </div>
                <div className="w-full sm:w-1/3 p-4 overflow-y-auto sm:pl-6 sm:pr-6 sm:pt-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold text-pink-700">{selectedPost.title}</h2>
                        <button
                            onClick={closePopups}
                            className="text-gray-500 hover:text-gray-700"
                        >
                            <img className="w-6 h-6" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAARlJREFUSEvt1M8qxUEYxvHP2SrZEMpCUlyD/Cls5TZkq9yJzsZKuQG5AmSFbP3JmiVX4PfWqF/6nZlx6mRzZjm98zzv8513pmfEqzdifWODIuF/R3SMM7wPaHUFGzgdFCWX4BAneMFmh8kyrjGHfVx0meQM4mAIhNBr6vQnyRJuMYtHbOHrrwZR32UyUSseAjWXPI+rlOQJU8n4vkm4g8/cKNUYxPmFhGsxiWWxtA1rDYJ1MA/2sR6aVNul7msRhfhNQvScEMXeXbO/WzIpJWh3/oY1TLbGs5gkZ9Al/pEQxegGspkSrpzBQTPnfQSWmPPfr3k1JZnGHi6HeQdHOM98FWGyPuxXUfwpawpKl1yjka0ZGxQRjhzRNxi0NBmpupZSAAAAAElFTkSuQmCC"/>
                        </button>
                    </div>
                    <p className="text-sm text-gray-500 mb-4">{selectedPost.date}</p>
                    <p className="text-gray-700 mb-4">{selectedPost.description}</p>

                    {/* Like and Comment Buttons */}
                    <div className="flex items-center space-x-4 mb-4">
                        <button className="flex items-center space-x-1">
                            <img className="w-5 h=5" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAehJREFUSEvV1MvLTWEYBfDfF5kiRK6lMFCSgUsuSWJKMVBymbiM/CtGLhlhQlEMzMj9UlIMFCkRBi6lpAwIe329R+ds+5yz++pL3jqdwbvftZ71POtZI8b5jIwzvn9GsBvbsQq/cAfncako3oH81jJa5ANcwLl6R+oKZuAstvZpXYgmYWWf+yvYj4+d+26CCbiNNfiAg7iHH9iAU5heHgbgAG5hYrk/gWkFYyN+5ttugkM4js9Yhre1KufiamnZZryr3c+v2voEU7AXZ+oEj7AC+3B6jO6KqpO4iajoUfC9yE0lb8ZIsBjP8R6z+hHMa2hPW74leFbeB6dHwX2sxp7ipLag3d8dxjFcxrY6wZFqQEfxqfL78oYhDiOcg6eYXP3vLHvRoyD+jooM+gXWl14OA879zGLPRdW7a9VixmWjp75oGUwckGG1JUnl1xHwDDg7kz1qJOhUkwVbWM3jZXlQ93znfcDvYkEBX1da/Ed1v7CL5CiJK16XzKmTdIOn9/F95tdzBqVpYiHZ00TSDf64ioxNJQH+mtewuA7JDSztUpLsibq05WEZ6Jd+ThhGkHdTC0ny6VVJ09nFcVvwdZDN2hB0SJK0UZITEyTSB4I32XRQMVFyEWnHLnxrsyBtFbTBavzm/yf4DTBuXhlUYzevAAAAAElFTkSuQmCC"/>
                            <span>{selectedPost.likes}</span>
                        </button>
                        <button className="flex items-center space-x-1">
                            <img className="w-5 h-5" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAQZJREFUSEvt1T1KBEEQhuFnQ6+gILiCP8cwNDLdIxgYiiCCsQaaiGCw5/AIHkAFI0XB0FAwEXVHbOkd7V566TFy0u6qt/qrqm96Ov56HeeXA2zgACuFRdxgG+dNXA7wiLnC5OH6HRYnAUpzr+II61+Bn8XX7kEftylAFc3xngJU0TwHGCMXNKAdl3zBPyBM5J9IdI+F9h7U6sE1dn6zilqAsQGMN7lzwAPmW/MfCljDGZYS+/Gtefs8fkFjFYdYji7N4hiDzOJdYjdongPEZ0GulxF0ZuTvz9jHCV4LtjzppgHwhiH28FSSONxN2XUDuMAmrqZJPAmwhdPIGadm1P7h/Cikc8AHqrk7GaSdRPsAAAAASUVORK5CYII="/>
                            <span>{selectedPost.comments.length}</span>
                        </button>
                    </div>

                    {/* Comment Form */}
                    <form onSubmit={handleCommentSubmit} className="mt-4">
                        <div className="flex space-x-2">
                            <input
                                type="text"
                                placeholder={isLoggedIn ? "Añadir un comentario..." : "Inicia sesión para comentar"}
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                disabled={!isLoggedIn}
                                className="flex-grow border rounded-md px-2 py-1"
                            />
                            <button
                                type="submit"
                                disabled={!isLoggedIn || !newComment.trim()}
                                className="bg-pink-500 text-white px-4 py-2 rounded-md disabled:opacity-50"
                            >
                                <img className="h-4 w-4" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAatJREFUSEu91b9Ll1EUx/GXDRFEUA1RblpDBk1N/Qvt1WSrCUYNFWIItWg/aKig0CmIsJaIJOgHNDWIS0OkRpCDYFs02SLVPXCf+HJ5zL5ffbzwwMO5zz3ve87nnPN0aXh1NezflgNe4xju5ef7RiMsI1jGgex0Jb1P4Ba+dQoqAU9wGj+wOztdxSOM40u7oBJwFg8QoDsYxYns9BeeYQwf/hdUAg6nCOZzSrqzk6O4gpPYlm1vcR3v1gPVVVEIuwe9WGxxcAjD6E9RbM/22Qx6jt91sDpApcNLXMZccTAiC/tAcr4j733GjaxVaPZ31QEGcT9/Ebd6gWs1ed+biuEChnLEcWQJtzGJn2GoA1Q6lBG/yqCZYmNXjuZSuti+vLeAvnYBkbIQ9n0B2ImovkhbBYhLHF8LUJVq7EeKptPL1TVSdB7n2k1RJfIbXMTHGpEjHXGRVpGjER9jXZGrMj2Iry3OezCSbGc2UqZHUkN9arLRqhKdwt0mRsXT1FinaobdQ9zcjGEXY3l/y7iOholxHWO8o1U2WtR4NFpjP5yObvmvQ1v+T970CP4AYRFiGVK+9HMAAAAASUVORK5CYII="/>
                            </button>
                        </div>
                        {!isLoggedIn && (
                            <p className="text-sm text-gray-500 mt-2">Por favor inicia sesión para dejar un comentario.</p>
                        )}
                    </form>

                    {/* Comments Section */}
                    <div className="space-y-4 mt-4">
                        {selectedPost.comments.map((comment) => (
                            <div key={comment._id} className="bg-gray-100 p-2 rounded">
                                <p className="font-semibold">{comment.user.name}</p>
                                <p>{comment.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PopupImage;
