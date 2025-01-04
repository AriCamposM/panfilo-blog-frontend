import React from "react";

import { AdminLogStatusContext } from "../../contexts/AdminLogStatusContext";
import { UserLogStatusContext } from "../../contexts/UserLogStatusContext";



function Card ({ openCommentDeleteConfirmModal, handleCreateComment, openDeleteConfirmModal ,post, clickImage}) {
    
    const [expandedComments, setExpandedComments] = React.useState(null)
    const [commentText, setCommentText] = React.useState('');

    const isAdminTrue = React.useContext(AdminLogStatusContext)
    const isLoggedIn = React.useContext(UserLogStatusContext)
    
    const handleCommentChange = (e) => {
      setCommentText(e.target.value);
    };

    const toggleComments = (postId) => {
        setExpandedComments(expandedComments === postId ? null : postId)
    }

    const handleCommentSubmit = (e) => {
      e.preventDefault();
      if (commentText.trim() !== '') {
        handleCreateComment(commentText, post._id); 
        setCommentText('');
      }
    } 
    

    return(
        <div className="w-full bg-white shadow-md overflow-hidden rounded-lg relative">
            {isAdminTrue && (
                <button
                  className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md z-10"
                  aria-label="Delete post"
                  onClick={()=>openDeleteConfirmModal(post._id)}
                >
                  <svg className="w-5 h-5 fill-pink-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" ><path d="M5 20a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8h2V6h-4V4a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v2H3v2h2zM9 4h6v2H9zM8 8h9v12H7V8z"></path><path d="M9 10h2v8H9zm4 0h2v8h-2z"></path></svg>
                </button>
              )}
            <div className="relative aspect-square">
                <img
                src={`https://panfilo-blog-backend.onrender.com${post.image}`}
                alt={post.title}
                className="w-full h-full object-cover cursor-pointer"
                onClick={() => clickImage(post)}
                />
            </div>
            <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                    <h2 className="text-lg font-semibold text-pink-700 truncate">{post.title}</h2>
                    <p className="text-sm text-gray-500">{post.date}</p>
                </div>
                <p className="text-gray-700 mb-4 line-clamp-2">{post.description}</p>
                <div className="flex items-center justify-between text-gray-500">
                    <div className="flex items-center space-x-4">
                        {/* <button className="flex items-center space-x-1">
                            <img className="w-5 h-5" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAehJREFUSEvV1MvLTWEYBfDfF5kiRK6lMFCSgUsuSWJKMVBymbiM/CtGLhlhQlEMzMj9UlIMFCkRBi6lpAwIe329R+ds+5yz++pL3jqdwbvftZ71POtZI8b5jIwzvn9GsBvbsQq/cAfncako3oH81jJa5ANcwLl6R+oKZuAstvZpXYgmYWWf+yvYj4+d+26CCbiNNfiAg7iHH9iAU5heHgbgAG5hYrk/gWkFYyN+5ttugkM4js9Yhre1KufiamnZZryr3c+v2voEU7AXZ+oEj7AC+3B6jO6KqpO4iajoUfC9yE0lb8ZIsBjP8R6z+hHMa2hPW74leFbeB6dHwX2sxp7ipLag3d8dxjFcxrY6wZFqQEfxqfL78oYhDiOcg6eYXP3vLHvRoyD+jooM+gXWl14OA879zGLPRdW7a9VixmWjp75oGUwckGG1JUnl1xHwDDg7kz1qJOhUkwVbWM3jZXlQ93znfcDvYkEBX1da/Ed1v7CL5CiJK16XzKmTdIOn9/F95tdzBqVpYiHZ00TSDf64ioxNJQH+mtewuA7JDSztUpLsibq05WEZ6Jd+ThhGkHdTC0ny6VVJ09nFcVvwdZDN2hB0SJK0UZITEyTSB4I32XRQMVFyEWnHLnxrsyBtFbTBavzm/yf4DTBuXhlUYzevAAAAAElFTkSuQmCC"/>
                            <span>{post.likes}</span>
                        </button> */}
                        <button className="flex items-center space-x-1"
                                onClick={() => post.comments.length > 0 ?  toggleComments(post._id) : ''}>
                            <img className="w-5 h-5" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAQZJREFUSEvt1T1KBEEQhuFnQ6+gILiCP8cwNDLdIxgYiiCCsQaaiGCw5/AIHkAFI0XB0FAwEXVHbOkd7V566TFy0u6qt/qrqm96Ov56HeeXA2zgACuFRdxgG+dNXA7wiLnC5OH6HRYnAUpzr+II61+Bn8XX7kEftylAFc3xngJU0TwHGCMXNKAdl3zBPyBM5J9IdI+F9h7U6sE1dn6zilqAsQGMN7lzwAPmW/MfCljDGZYS+/Gtefs8fkFjFYdYji7N4hiDzOJdYjdongPEZ0GulxF0ZuTvz9jHCV4LtjzppgHwhiH28FSSONxN2XUDuMAmrqZJPAmwhdPIGadm1P7h/Cikc8AHqrk7GaSdRPsAAAAASUVORK5CYII="/>
                            <span>{post.comments.length}</span>
                        </button>
                    </div>
                </div>
                 <div className="mt-4">
                  <form onSubmit={handleCommentSubmit}>
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        name="comment"
                        value={commentText}
                        placeholder={isLoggedIn ? "Añade un comentario..." : "Inicia sesión para comentar"}
                        className="flex-grow border rounded-md px-2 py-1"
                        disabled={!isLoggedIn}
                        onChange={handleCommentChange}
                        required
                      />
                      <button
                        disabled={commentText.trim() === ''} 
                        type="submit"
                        className="bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-600 transition duration-300"
                      >
                        Publicar
                      </button>
                    </div>
                  </form>
                </div>
                {expandedComments === post._id && (
                  <div className="mt-4 space-y-2">
                    {post.comments.map((comment) => (
                      <div key={comment._id} className="bg-gray-100 p-2 rounded relative">
                        {isAdminTrue && (
                          <button
                            className="absolute top-2 right-2 p-0.5 bg-white rounded-full shadow-md z-10"
                            aria-label="Delete post"
                            onClick={()=> openCommentDeleteConfirmModal(comment._id, post._id)}
                          >
                            <svg className="w-5 h-5 fill-pink-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" ><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm4.207 12.793-1.414 1.414L12 13.414l-2.793 2.793-1.414-1.414L10.586 12 7.793 9.207l1.414-1.414L12 10.586l2.793-2.793 1.414 1.414L13.414 12l2.793 2.793z"></path></svg>
                          </button>
                        )}
                        <p className="font-semibold">{comment.user.name}</p>
                        <p>{comment.text}</p>
                      </div>
                    ))}
                  </div>
                )}
            </div>
        </div>
    )
}

export default Card;