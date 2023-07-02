let currentIdx = 0;

let addedMovie = [];

$(function() {
  
    $("#container").on("submit", function(evt) {
      evt.preventDefault();
      let title = $("#title").val();
      let rating = $("#rating").val();
      let movieInfo = { title, rating, currentIdx };
      const HTML = createMovieInfo(movieInfo);

      currentIdx++
      addedMovie.push(movieInfo);

      $("#table").append(HTML);
      $("#container").trigger("reset");

});

$("tbody").on("click", ".btn.btn-danger", function(evt) {
 
    let indexRemove = addedMovie.findIndex(movie => movie.currentIdx === +$(evt.target).data("deleteIdx"))
    
    addedMovie.splice(indexRemove, 1)

    $(evt.target)
      .closest("tr")
      .remove();
  });

  $(".fas").on("click", function(evt) {
    
    let direction = $(evt.target).hasClass("fa-sort-down") ? "down" : "up";
    let keyToSortBy = $(evt.target).attr("id");
    let sortedMovies = sortBy(addedMovie, keyToSortBy, direction);
    
    $("#table").empty();

    for (let movie of sortedMovies) {
      const HTML= createMovieInfo(movie);
      $("#table").append(HTML);
    }

    $(evt.target).toggleClass("fa-sort-down");
    $(evt.target).toggleClass("fa-sort-up");
  });
});

function sortBy(array, keyToSortBy, direction) {
    return array.sort(function(a, b) {
      
      if (keyToSortBy === "rating") {
        a[keyToSortBy] = +a[keyToSortBy];
        b[keyToSortBy] = +b[keyToSortBy];
      }
      if (a[keyToSortBy] > b[keyToSortBy]) {
        return direction === "up" ? 1 : -1;
      } else if (b[keyToSortBy] > a[keyToSortBy]) {
        return direction === "up" ? -1 : 1;
      }
      return 0;
    });
  }

function createMovieInfo(data) {
    return `
      <tr>
        <td>${data.title}</td>
        <td>${data.rating}</td>
        <td>
          <button class="btn btn-danger" data-delete-id=${data.currentIdx}>
            Delete
          </button>
        </td>
      <tr>
    `;
  }

    
    



    

