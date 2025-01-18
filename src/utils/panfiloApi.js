export const BASE_URL = 'https://api.panfile-blog.realdeeptech.com'

export const signup = (name, email, password) => {
    return fetch(`${BASE_URL}/signup`,{
        method:'POST',
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "password": password,
            "email": email,
            "name": name })
    })
    .then((res) => {
        if(!res.ok){
            return {error: true};
        }
        return res.json();
    })
    .then((res) => {
        return res;
    })
    .catch((err) =>{
        console.log(`Error : ${err}`);
        return { error: true};
    })
};

export const logIn = (email, password) => {
    return fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            password: password,
            email: email
        })
    })
    .then(res => {
        if (!res.ok) {
            throw new Error('Login failed, status: ' + res.status); // Maneja posibles errores
        }
        return res.json();  // Cambié esto de res.text() a res.json() porque la respuesta es un objeto JSON
    })
    .then((data) => {
        // Guarda el token y el estado de administrador (isAdmin) en el localStorage
        localStorage.setItem('jwtPanfilo', data.token); // Guarda el token

        return data; // Retorna la data completa (token + isAdmin)
    })
    .catch(err => {
        console.error('Error during login:', err); 
        return { error: err.message }; 
    });
};


export const createPost = ( title , description , image) => {
    const formData = new FormData();

    formData.append('title',title);
    formData.append('description',description);
    if(image){
        formData.append('image',image);
    }

    return fetch(`${BASE_URL}/posts`,{
        method:'POST',
        body: formData,
    })
    .then((res) => {
      if (!res.ok) {
        return { error: true, message: "Failed to create post. Please try again." };
      }
      return res.json();
    })
    .catch((err) => {
      console.log(`Error: ${err}`);
      return { error: true, message: "An error occurred while creating the post." };
    });
};


export const getPosts = () => {
    return fetch(`${BASE_URL}/posts`,{
        method:'GET',
        headers:{
            "Content-Type": "application/json"
        }
    })
    .then(res => {
      if (!res.ok) {
        return Promise.reject(`Error: ${res.status}`);
      }
      return res.json();
    })
    .catch(err => {
        console.error(`Error: ${err}`);
        return { error: true };
    });
}

export const checkToken = () => {
    const token = localStorage.getItem('jwtPanfilo'); // Obtener el token de localStorage

    if (!token) {
        return Promise.resolve(null); // Si no hay token, resolver con null sin errores
    }

    return fetch(`${BASE_URL}/check-token`, {
        method: 'GET',
        headers: {
            "Authorization": `Bearer ${token}`, // Enviar el token en el encabezado
            "Content-Type": "application/json"
        }
    })
    .then((res) => {
        if (!res.ok) {
            return Promise.resolve(null); // Si el token no es válido, resolver con null
        }
        return res.json(); // Convertir la respuesta a JSON si es válida
    })
    .catch((err) => {
        console.error('Error during token validation:', err); 
        return null; // En caso de error, resolver con null
    });
};

export const deletePost = (postId) => {
    return fetch(`${BASE_URL}/posts/${postId}`, {
        method: 'DELETE', // Usar 'DELETE' en mayúsculas
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(res => {
        if (!res.ok) {
            // Si la respuesta no es exitosa (código 2xx)
            throw new Error('No se pudo eliminar el post');
        }
        return res.json(); // Procesamos la respuesta si fue exitosa
    })
    .then(data => {
        console.log('Post eliminado exitosamente:', data);
        return data; // Opcional: puedes retornar los datos si necesitas usarlos
    })
    .catch(error => {
        console.error('Error al eliminar el post:', error);
        throw error; // Opcional: lanzar el error si quieres manejarlo más arriba
    });
};

export const createComment = (text, postId, userId) => {
    return fetch(`${BASE_URL}/comments/${postId}`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            userId: userId,
            text: text
        })
    })
    .then((res) => {
        if (!res.ok) {
            return { error: true, message: "Failed to create comment. Please try again." };
        }
        return res.json();
    })
    .catch((err) => {
        console.log(`Error: ${err}`);
        return { error: true, message: "An error occurred while creating the comment." };
    });
};

export const deleteComment = (postId, commentId) => {
    return fetch(`${BASE_URL}/comments/${postId}/${commentId}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then((res) => {
        if (!res.ok) {
            return { error: true, message: "Failed to delete comment. Please try again." };
        }
        return res.json();
    })
    .catch((err) => {
        console.log(`Error: ${err}`);
        return { error: true, message: "An error occurred while deleting the comment." };
    });
};