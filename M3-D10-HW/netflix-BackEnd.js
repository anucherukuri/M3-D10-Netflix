const params = new URLSearchParams(location.search);
const id = params.get("id");


const BASE_URL = "https://striveschool-api.herokuapp.com/api/movies";
    const headers = new Headers({
      "Content-Type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWIwYjdmYjRjZmY1ZjAwMTU5MGJkY2UiLCJpYXQiOjE2MzkxMzM3NDMsImV4cCI6MTY0MDM0MzM0M30.myCGtzLbJWO-AYj5yttlQapRGFPR0zaO6u7WfB7YFzg",
    });


    //-------------------------Fetch to POST---------------------------
    const method = id ? "PUT" : "POST";
    const postMovie = (movie, callback) => {
      console.log(movie)
      fetch( id !== null ? BASE_URL +"/" +id : BASE_URL, {
        headers,
        method: method,
        body: JSON.stringify(movie),
      })
        .then((res) => res.json())
        .then((data) => callback(null, data))
        .catch((error) => callback(error, null));
    };

    //---------------------SUBMIT FORM----------------------------------
     const formOnSubmit = function (e) {
      e.preventDefault();
      const name = document.querySelector("#name").value;
      const description = document.querySelector("#description").value;
      const category = document.querySelector("#category").value;
      const imageUrl = document.querySelector("#imageUrl").value;
      
      const movie = { name, description, category, imageUrl};
      postMovie(movie, (err, data) => {
        if (err) {
          console.log(err)
          alert(err.message)
        } else {
          alert('Added succesfully')
        }
      });
    };


    //--------------------------------------

    
      async function getMovieDetails(id) {
        setLoading(true);
        try {
          const response = await fetch(BASE_URL + "/" + id, {
            headers,
          });
          const movie = await response.json();

          console.log(movie);
          console.log(Object.keys(movie));

          Object.keys(movie).forEach((key) => {
            const field = document.querySelector(`#${key}`);
            if (field) field.value = movie[key];
          });
        } catch (error) {
          alert(error.message);
        }

        setLoading(false);
      }


      //-----------------------DELETE MOVIE-------------------------

       async function deleteMovie() {
        setLoading(true);
        try {
          const response = await fetch(BASE_URL +"/" + id, {
            method: "DELETE",
            headers,
          });

          if (!response.ok) throw new Error("Failed to delete Movie");

          alert("All good - Movie deleted successfully.");
          location.assign("netflix-FrontEnd.html");
        } catch (error) {
          alert(error.message);
        }
        setLoading(false);
      }
//---------
      const loader = document.getElementById("loader");

      function setLoading(loading) {
        if (loading) {
          loader.classList.remove("d-none");
        } else {
          loader.classList.add("d-none");
        }
      }

      window.onload = function () {
     

        if (id) {
         
          getMovieDetails(id);
        }
       
      };

    