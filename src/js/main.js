$(document).ready(function(){

  // Construct the URL
  var endpoint = "https://s3-us-west-2.amazonaws.com/api.designguggenheimhelsinki.org";
  var version = "v1";
  var directory = "directory.json";
  var data_dir = "data/v1";

  var url = endpoint + "/" + version + "/" + directory;

  console.log('url:');
  console.log(url);

  // Get the directory and then use it to get the files
  $.get( url, function(data){
    // Prepare the submissions array
    var data_obj = $.parseJSON(data); // parse JSON response into javascript array

    console.dir(data_obj.submissions);

    var submissions = data_obj.submissions;

    // Cycle through the first MAX_COUNT submissions and add to the DOM
    var src = ""; // container for image source
    var filename = ""; // container for image filename

    var total_files = 1715;
    var MAX_COUNT = 30;

    // Set up random interval
    var start_index = Math.floor( Math.random()*(total_files - MAX_COUNT) );
    var end_index = start_index + MAX_COUNT;

    // Loop through submissions and add press image 1 to DOM
    for(var i = start_index; i < end_index; i++){

      var id = submissions[i].id; // get the id from the submissions array

      filename = submissions[i].data.images.press_image_1; // construct the filename

      // construct the image src URL
      src = endpoint + "/" + version + "/" + data_dir + "/" + id + "/" + filename;

      // add to the DOM
      var caption = '<caption>' + id + '</caption>';
      var img = '<img src="' + src + '" />';
      var html = '<div class="item">' + img + caption + '</div>';

      $('#data').append( html );
    }//end for

  });//end get

});
