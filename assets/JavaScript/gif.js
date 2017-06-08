$(document).ready(function(){
    
    //Array of topics for Gif's
    var topics = ["Gettin' Jiggy Wit It", "Hitch", "I Robot", "Bad Boys", "Men in Black",
     "Wild Wild West", "Enemy of the State", "Independence Day", "The Pursuit of Happyness", "Will Smith"];
    createButtons();


    
    //This function creates buttons from the array topics
    function createButtons() {
        //empties this div before recreating buttons
        $("#gifButton").empty();

        for (var i = 0; i < topics.length; i++) {
            //creating button element
            var newButton = $("<button>");
            //adding class to button element
            newButton.addClass("gifCat");
            //adding data-attribute
            newButton.attr("data-name", topics[i]);
            //Filling in the initial button names
            newButton.text(topics[i]);
            //Adpending to the gifButton div
            $("#gifButton").append(newButton);
            
        }

    };

    //adds new gif buttons with user input
    $("#newGif").on("click", function(event) {

      event.preventDefault();


      var player = $("#textInput").val().trim();

      topics.push(player);


      createButtons();
     });

    //event handler generates 10 gifs for the button clicked
    function displayGifs(){
        //assigns var category to the button clicked
        var category = $(this).attr("data-name");
        //sets var queryURL to url + category + key
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + category + "&api_key=dc6zaTOxFJmzC&limit=10";

        //ajax call to get data to generate gifs
        $.ajax({
            url: queryURL,
            method: "GET"
        })
        .done(function(response) {
         var results = response.data;
         // console.log(response);
         $("#gifsHere").empty();
       
         //loops through the data to creating div and img elements to append gifs to html
         for (var i = 0; i < results.length; i++) {
       
           var rating = results[i].rating;
           
           //creates and stores h3 element and .text info for Rating
           var p = $("<h3>").text("Rating: " + rating.toUpperCase());
            // creates and stores div element
            var caption = $("<div class = 'caption col-md-4'>")
            // creates and stores the img element
           var gifImage = $("<img>");
           //sets attributes to gifImage for image url and alt description
           gifImage.attr("alt", topics[i] + " Gif")
           gifImage.attr("src", results[i].images.fixed_height_small_still.url); 
           gifImage.attr("data-animate",results[i].images.fixed_height_small.url); // animated image
           gifImage.attr("data-state", "still"); // set the image state 
           gifImage.addClass('image');
           gifImage.attr('data-still', results[i].images.fixed_height_small_still.url); 

           //appends rating info to caption div
           caption.append(p);
                     
           // appends gifImage to caption
           caption.append(gifImage);
           //append all info from caption to #gifsHere div
           $("#gifsHere").append(caption);
           
         }
         //creates and stores h1 element for creating a heading to describe gifs
         var descrHeader = $("<h1>").text(category);
         $("#gifsHere").prepend(descrHeader);

      

       
       });
    }

    $(document).on("click", ".gifCat", displayGifs);
  $(document).on("click", ".image", function(){
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


