const BASE_URL = "https://striveschool-api.herokuapp.com/api/movies/Action"; 
    const headers = new Headers({
      "Content-Type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWIwYjdmYjRjZmY1ZjAwMTU5MGJkY2UiLCJpYXQiOjE2MzkxMzM3NDMsImV4cCI6MTY0MDM0MzM0M30.myCGtzLbJWO-AYj5yttlQapRGFPR0zaO6u7WfB7YFzg",
    });
//-------------------------TO GET MOVIES---------------------------

    const getMovies = (callback) => {
      fetch(BASE_URL, { headers })
        .then((res) => res.json())
        .then((data) => callback(null, data))
        .catch((error) => callback(error, null));
    };

  
    //---------------------------------------------------------------------

     window.onload = function () {
     getMovies((error, data) => {
        console.log(data, error)
        if (error) {
          console.log({ error });
        } else {
          const content = document.querySelector(".action-card-columns");
          content.innerHTML = "";
          data.forEach((movie) => {
            content.innerHTML += `<div class="card mr-3" style="width:18rem">
          <img src="${movie.imageUrl}" class="card-img-top" alt="..." />
          <div class="card-body">
            <h5 class="card-title">${movie.name}</h5>
            <p class="card-text">
               ${movie.description}
            </p>
            <button><a href="netflix-BackEnd.html?id=${movie._id}">Edit</a></button>
             </div>
        </div>`;
          });
        }
      });
    };

   
