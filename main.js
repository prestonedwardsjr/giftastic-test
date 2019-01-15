
      // Array of animals,New animals will be added to this
      var animals = ["dog", "whale", "hummingbird", "butterfly","honeybadger","turtle","dolphin","eagle",];

      // Function to add the JSON content for each button into the div
      function displayanimalInfo() {

      }

      // Function for displaying animal data
      function renderButtons() {

        // Deleting the buttons prior to adding new animals
        // (this is necessary otherwise you will have repeat buttons)
        $("#buttons-view").empty();

        // Looping through the array of animals
        for (var i = 0; i < animals.length; i++) {

          // Then dynamicaly generating buttons for each animal in the array
          // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
          var a = $("<button>");
          // Adding a class of animial to our button
          a.addClass("animal");
          // Adding a data-attribute
          a.attr("data-name", animals[i]);
          // Providing the initial button text
          a.text(animals[i]);
          // Adding the button to the buttons-view div
          $("#buttons-view").append(a);
        }
      }

      // This function handles events where one button is clicked
      $("#submit").on("click", function(event) {
        event.preventDefault();

        // This line grabs the input from the textbox
        var animal = $("#animal-input").val().trim();

        // The animal from the textbox is then added to our array
        animals.push(animal);

        // Calling renderButtons which handles the processing of our animal array
        renderButtons();

      });

      // Generic function for displaying the animalInfo
      $(document).on("click", ".animal", displayanimalInfo);

      // Calling the renderButtons function to display the intial buttons
      renderButtons();
     
      $("button").on("click", function() {
      var animals = $(this).attr("data-name");
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        animals + "&api_key=G4MsAbIExFc4rSkna2AaniEO0TIyssp8&limit=10";

      $.ajax({
        url: queryURL,
        method: "GET"
      })
        .then(function(response) {
          var results = response.data;

          for (var i = 0; i < results.length; i++) {
            var gifDiv = $("<div>");

            var rating = results[i].rating;

            var p = $("<p>").text("Rating: " + rating);

            var animalImage = $("<img>");
            animalImage.attr("src", results[i].images.fixed_height_still.url);
            //store the still image
            animalImage.attr("data-still",results[i].images.fixed_height_still.url);
            //animate image
            animalImage.attr("data-animate",results[i].images.fixed_height.url);
            //set image state
            animalImage.attr("data-state", "still");
            animalImage.addClass("image");
            gifDiv.append(animalImage);
            gifDiv.prepend(p);
            gifDiv.prepend(animalImage);

            $("#gifs-appear-here").prepend(gifDiv);
          }
        });
    
      $('documemt').on("click", ".image", function(){
        console.log('hello')
    var state = $(this).attr('data-state');
    if ( state == 'still'){
      $(this).attr('src', $(this).data('animate'));
      $(this).attr('data-state', 'animate');
    }else{
      $(this).attr('src', $(this).data('still'));
      $(this).attr('data-state', 'still');
    }
  });
});