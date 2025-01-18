import React from 'react';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import PopupImage from '../PopupImage/PopupImage';
import AuthModal from '../AuthModal/AuthModal';
import AddPostModal from '../AddPostModal/AddPostModal';
import DeleteConfirmModal from '../DeleteConfirmModal/DeleteConfirmModal';
import { UserLogStatusContext } from '../../contexts/UserLogStatusContext';
import { AdminLogStatusContext } from '../../contexts/AdminLogStatusContext';
import CommentDeleteConfirmModal from '../CommentDeleteConfirmModal/CommentDeleteConfirmModal';
import SignupSuccess from '../SignupSuccess/SignupSuccess';
import LoginSuccess from '../../LoginSuccess/LoginSuccess';
import SignupError from '../SignupError/SignupError';
import LogionError from '../../LoginError/LoginError';

import * as panfiloApi from '../../utils/panfiloApi'

import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import LogOff from '../LogOff/LogOff';

function App() {

  const [expandedComments, setExpandedComments] = React.useState(null);
  const [selectedPost, setSelectedPost] = React.useState(null);
  const [newComment, setNewComment] = React.useState('');
  const [isLoggedIn, setIsLoggedIn] = React.useState(false); // This should be managed by your auth system
  const [isAdminTrue, setIsAdminTrue] = React.useState(false); 
  const [isAddPostModalOpen , setIsAddPostModalOpen]= React.useState(false) 
  const [isAuthModalOpen, setIsAuthModalOpen] = React.useState(false);
  const [isDeleteConfirmModalOpen, setIsDeleteConfirmModalOpen] = React.useState(null)
  const [isCommentDeleteConfirmModalOpen, setIsCommentDeleteConfirmModalOpen] = React.useState(null)
  
  const [postCards, setPostCards] = React.useState([]);
  
  const [currentUser,setCurrentUser ] = React.useState(null);

  const [signupSuccess, setSignupSuccess] = React.useState(null);
  const [loginSuccess, setLoginSuccess] = React.useState(null);
  const [logOff, setLogOff] = React.useState(null);
  const [signupError, setSignupError] = React.useState(null);
  const [loginError, setLoginError] = React.useState(null);

  React.useEffect(() => {

    panfiloApi.checkToken()
    .then((data) => {
        if (data) { // Solo si data no es null
            setIsLoggedIn(true);  
            setCurrentUser(data);
            if (data.isAdmin) {
                setIsAdminTrue(true);
            } else {
                setIsAdminTrue(false);
            }
        } else {
            setIsLoggedIn(false); // Si data es null, marcar como no logueado
        }
    })
    .finally(() => {
        // Finaliza la carga en cualquier caso
    });



    panfiloApi.getPosts()
      .then((posts) => {
        if(posts.length > 0){
          posts = posts.reverse();
        }
        if (posts.length > 0) {
          const postsConFechasFormateadas = posts.map(post => {
            const fecha = new Date(post.date);
            const fechaFormateada = format(fecha, 'd MMMM yyyy', { locale: es });
            const fechaConDe = fechaFormateada.replace(' ', ' de ');  

            return {
              ...post,
              date: fechaConDe,
            };
          });
          setPostCards(postsConFechasFormateadas);
        }
      });
  }, []);

  const toggleComments = (postId) => {
    setExpandedComments(expandedComments === postId ? null : postId);
  };
 
  const clickImage = (post) =>{
    setSelectedPost(post);
  }
  
  const openAuthModal = () =>{
    setIsAuthModalOpen(true)
  }

  const LogOutClick = () => {
    setIsLoggedIn(false);
    setIsAuthModalOpen(false)
    localStorage.removeItem("jwtPanfilo");
    setIsAdminTrue(false)
    setLogOff(true);
    setTimeout(() => setLogOff(false), 3000);
  }

  const openAddPostModal = () => {
    setIsAddPostModalOpen(true)
  }
 
  const openDeleteConfirmModal= (postId) => {
    setIsDeleteConfirmModalOpen(postId)
  }

  const openCommentDeleteConfirmModal = (commentId, postId) =>{
    setIsCommentDeleteConfirmModalOpen({commentId, postId});
  }

  const closePopups = () =>{
    setSelectedPost(null);
    setIsAuthModalOpen(false);
    setIsAddPostModalOpen(false);

    setIsDeleteConfirmModalOpen(null);
    setIsCommentDeleteConfirmModalOpen(null);
  }

  

  //Logic For Sign Up
  const handleSignUpForm = (name, email, password) => {

    panfiloApi.signup(name, email, password)
    .then((account)=>{
      setSignupSuccess(true);
      setTimeout(() => setSignupSuccess(false), 3000);
    })
    .catch((err) =>{
      console.log(err);
      setSignupError(true);
    })
  }

  //Logic For Log In
  const handleLogInForm = (email, password) => {

    panfiloApi.logIn(email, password)
    .then((data)=>{
      setCurrentUser(data);
      setIsLoggedIn(true)
      if(data.isAdmin){
        setIsAdminTrue(true);
      }

      setLoginSuccess(true);
      setTimeout(() => setLoginSuccess(false), 3000);
    })
    .catch((err) =>{
      console.log(err);
      setLoginError(true);
      setTimeout(() => setLoginError(false), 3000);
    })
  }


  //Logic For Posting Photos
  const handlePostForm = (title, description, image) => {
  panfiloApi.createPost(title, description, image)
    .then((post) => {
      const date = new Date(post.date);
      const formattedDate = format(date, 'd MMMM yyyy', { locale: es });
      const dateWithDe = formattedDate.replace(' ', ' de ');

      const postWithFormattedDate = {
        ...post,
        date: dateWithDe,
      };

      setPostCards([postWithFormattedDate, ...postCards]);
    })
    .catch((err) => {
      console.log(err);
    });
};
  
  //Logic For Deleting Post 
  const handleDeletePost = () => {
    if (isDeleteConfirmModalOpen !== null) {
    const postId = isDeleteConfirmModalOpen; 
    panfiloApi.deletePost(postId)
    .then(() => {
      // Filtrar el post eliminado del estado
      setPostCards((state) => state.filter((post) => post._id !== postId));
    })
    .catch((err) => {
      console.log(`Error al eliminar el post: ${err}`);
    });
   }
  };

  //Logic For Deleting Comment
   const handleDeleteComment = () => {
    if (isCommentDeleteConfirmModalOpen !== null) {
      const { commentId, postId } = isCommentDeleteConfirmModalOpen;
      
      // Eliminar el comentario en el backend
      panfiloApi.deleteComment(postId, commentId)
        .then(() => {
          // Actualizar el estado de los posts eliminando el comentario
          setPostCards((prevPosts) =>
            prevPosts.map((post) =>
              post._id === postId
                ? {
                    ...post,
                    comments: post.comments.filter((comment) => comment._id !== commentId), // Filtrar el comentario eliminado
                  }
                : post
            )
          );
        })
        .catch((err) => {
          console.log(`Error al eliminar el comentario: ${err}`);
        });
    }
  };


    // Logic For Creating A Comment
    const handleCreateComment = (text, postId) => {
      panfiloApi.createComment(text, postId, currentUser._id)
        .then((updatedPost) => {
          
          // Formatear la fecha del post actualizado
          const fecha = new Date(updatedPost.date);
          const fechaFormateada = format(fecha, 'd MMMM yyyy', { locale: es });
          const fechaConDe = fechaFormateada.replace(' ', ' de ');

          const updatedPostConFecha = {
            ...updatedPost,
            date: fechaConDe, // Asignar la fecha formateada
          };

          // Actualiza el estado de las publicaciones con la publicación actualizada
          setPostCards((prevPosts) => 
            prevPosts.map((post) => 
              post._id === updatedPostConFecha._id ? updatedPostConFecha : post
            )
          );
        })
        .catch((err) => {
          console.log(err);
        });
    }

    const handleCreateCommentPopupImage = (text, postId) => {
      panfiloApi.createComment(text, postId, currentUser._id)
        .then((updatedPost) => {
          console.log('Comentario enviado correctamente', updatedPost);
          
          // Formatear la fecha del post actualizado
          const fecha = new Date(updatedPost.date);
          const fechaFormateada = format(fecha, 'd MMMM yyyy', { locale: es });
          const fechaConDe = fechaFormateada.replace(' ', ' de ');

          // Crear una nueva versión del post actualizado con la fecha formateada
          const updatedPostConFecha = {
            ...updatedPost,
            date: fechaConDe, // Asignar la fecha formateada
          };

          // Actualizar el estado de selectedPost con el post actualizado
          setSelectedPost(updatedPostConFecha);
        })
        .catch((err) => {
          console.log(err);
        });
    }


  return (
    <div className="min-h-screen bg-pink-50">
      <UserLogStatusContext.Provider value={isLoggedIn}>
      <AdminLogStatusContext.Provider value={isAdminTrue}> 

        <Header openAuthModal={openAuthModal} />
        {isAuthModalOpen && <AuthModal handleSignUpForm={handleSignUpForm} handleLogInForm={handleLogInForm} closePopups={closePopups} LogOutClick={LogOutClick}/>}
        {isAddPostModalOpen && <AddPostModal handlePostForm={handlePostForm} closePopups={closePopups} />}
        <Main openCommentDeleteConfirmModal={openCommentDeleteConfirmModal} handleCreateComment={handleCreateComment} openDeleteConfirmModal={openDeleteConfirmModal} postCards={postCards} clickImage={clickImage} openAddPostModal={openAddPostModal}  />
        {selectedPost && (<PopupImage handleCreateCommentPopupImage={handleCreateCommentPopupImage} selectedPost={selectedPost} closePopups={closePopups} />)}
        {isDeleteConfirmModalOpen && <DeleteConfirmModal handleDeletePost={handleDeletePost} closePopups={closePopups}/>}
        {isCommentDeleteConfirmModalOpen && <CommentDeleteConfirmModal handleDeleteComment={handleDeleteComment} closePopups={closePopups} />}
        <Footer/>
        {loginSuccess && <LoginSuccess/>}
        {signupSuccess && <SignupSuccess/>}
        {logOff && <LogOff/>}
        {loginError && <LogionError/>}
        {signupError && <SignupError/>}
      </AdminLogStatusContext.Provider>
      </UserLogStatusContext.Provider>
    </div>
  );
}

export default App;
