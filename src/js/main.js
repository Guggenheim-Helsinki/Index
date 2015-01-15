$(document).ready(function(){

  // Global variables
  var total_files = 1715;
  var MAX_COUNT = 100;
  var start_index = 0;
  var end_index;

  // handle event request for loading more images
  $('#load').click(function(){
    load(); // call load function
  });

  // Construct the URL
  var endpoint = "https://s3-us-west-2.amazonaws.com/api.designguggenheimhelsinki.org";
  var version = "v1";
  var directory = "directory.json";
  var data_dir = "data/v1";

  var url = endpoint + "/" + version + "/" + directory;


  var load = function(){
    // Get the directory and then use it to get the files
    $.get( url, function(data){
      // Prepare the submissions array
      var data_obj = $.parseJSON(data); // parse JSON response into javascript object

      var submissions = data_obj.submissions; // pluck out submissions into an array

      // Cycle through the first MAX_COUNT submissions and add to the DOM
      var path = ""; // endpoint plus file path
      var filename = ""; // container for image filename

      // set end index
      if( (start_index + MAX_COUNT) > total_files){
        end_index = total_files;
      }else{
        end_index = start_index + MAX_COUNT;
      }

      // Loop through submissions and add press image 1 to DOM
      for(var i = start_index; i < end_index; i++){

        var id = submissions[i].id; // get the id from the submissions array

        filename = submissions[i].data.images.press_image_1; // construct the filename

        // construct the image src URL
        path = endpoint + "/" + version + "/" + data_dir + "/" + id + "/";

        // add to the DOM
        var $block = $('<div class="submission"></div>');
        var $title = $('<h1>' + id + '</id>');
        var $links = $('<ul class="links"></ul>');

        var $description = $('<li><a href="' + path + submissions[i].data.pdfs.description + '">' + 'Text description (pdf)' + '</li>');
        var $summary = $('<li><a href="' + path + submissions[i].data.pdfs.summary + '">' + 'Text summary (pdf)' + '</li>');
        var $boards = $('<li><a href="' + path + submissions[i].data.pdfs.boards + '">' + 'Boards (pdf)' + '</li>');

        var $press_images = $('<li>' + 'Press images ' + '<a href="' + path + submissions[i].data.images.press_image_1 + '">' + '1</a>' + ' <a href="' + path + submissions[i].data.images.press_image_2 + '">' + '2' + '</li>');

        $links.append( $description );
        $links.append( $summary );
        $links.append( $boards );
        $links.append( $press_images );

        $block.append( $title );
        $block.append( $links );

        $('#data').append( $block );
      }//end for

      start_index = end_index; // increment the starting index/counter

      $('#count').text(end_index); // update the count
    });//end get
  }//end function load()
});
