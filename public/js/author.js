$(document).ready(function() {
  // Getting references to the name inout and author container, as well as the table body
  var userName = $("#author-name");
  var firstName = $("#first-name");
  var lastName = $("#last-name");
  var birthdate = $("#birthdate");
  var password = $("#password");
  var emailAddress =$("#emailAddress");
  var authorList = $("tbody");
  var authorContainer = $(".author-container");
  // Adding event listeners to the form to create a new object, and the button to delete
  // an Author
  $(document).on("submit", "#author-form", handleAuthorFormSubmit);
  $(document).on("click", ".delete-author", handleDeleteButtonPress);
 
  // // Getting the intiial list of Authors
  // getAuthors();

  // A function to handle what happens when the form is submitted to create a new Author
  function handleAuthorFormSubmit(event) {
    event.preventDefault();
    // Don't do anything if the name fields hasn't been filled out
    if (!userName.val().trim().trim()|| !firstName.val().trim().trim()) {
      return;

    }
    // Calling the upsertAuthor function and passing in the value of the name input
    upsertAuthor({
      username: userName.val().trim(),
      firstName: firstName.val().trim(),
      lastName: lastName.val().trim(),
      password: password.val().trim(),
      email: emailAddress.val().trim(),
      birthdate: birthdate.val().trim()
    });

    //  //empty boxes
   $("#username").val("");
   $("#first-name").val("");
   $("#last-name").val("");
   $("#password").val("");
   $("#email").val("");
   $("#birthdate").val("");

  }

  // A function for creating an author. Calls getAuthors upon completion
  function upsertAuthor(authorData) {
    $.post("/api/authors", authorData)
      .then(getAuthors);
  }

  // Function for creating a new list row for authors
  function createAuthorRow(authorData) {
    console.log(authorData);
    var newTr = $("<tr>");
    newTr.data("author", authorData);
    newTr.append("<td>" + authorData.name + "</td>");
    newTr.append("<td>" + authorData.age + "</td>");
    newTr.append("<td>" + authorData.position + "</td>");
    newTr.append("<td>" + authorData.birthdate + "</td>"); 
    newTr.append("<td># of posts will display when we learn joins in the next activity!</td>");
    newTr.append("<td><a href='/blog?author_id=" + authorData.id + "'>Go to Posts</a></td>");
    newTr.append("<td><a href='/cms?author_id=" + authorData.id + "'>Create a Post</a></td>");
    newTr.append("<td><a style='cursor:pointer;color:red' class='delete-author'>Delete Author</a></td>");
    return newTr;
  }

  // Function for retrieving authors and getting them ready to be rendered to the page
  function getAuthors() {
    $.get("/api/authors", function(data) {
       console.log(userName);
      var rowsToAdd = [];
      console.log(data);
      for (var i = 0; i < data.length; i++) {
        rowsToAdd.push(createAuthorRow(data[i]));
      }
      renderAuthorList(rowsToAdd);
      userName.val("");
      firstName.val("");
      lastName.val("");
      password.val("");
      emailAddress.val("");
      birthdate.val("");
    });
  }

  // A function for rendering the list of authors to the page
  function renderAuthorList(rows) {
    authorList.children().not(":last").remove();
    authorContainer.children(".alert").remove();
    if (rows.length) {
      console.log(rows);
      authorList.prepend(rows);
    }
    else {
      renderEmpty();
    }
  }

  // Function for handling what to render when there are no authors
  function renderEmpty() {
    var alertDiv = $("<div>");
    alertDiv.addClass("alert alert-danger");
    alertDiv.html("You must create an Author before you can create a Post.");
    authorContainer.append(alertDiv);
  }

  // Function for handling what happens when the delete button is pressed
  function handleDeleteButtonPress() {
    var listItemData = $(this).parent("td").parent("tr").data("author");
    var id = listItemData.id;
    $.ajax({
      method: "DELETE",
      url: "/api/authors/" + id
    })
    .done(getAuthors);
  }


});




























// ===============================================================================================
// $(document).ready(function() {
//   // Getting references to the name inout and author container, as well as the table body
//   var username = $("#username");
//   var firstName = $("#birthdate");
//   var lastName = $("#birthdate");
//   var birthdate = $("#birthdate");
//   var emailAddress = $("#emailAddress");
//   var userList = $("tbody");
//   var userContainer = $(".author-container");
//   // Adding event listeners to the form to create a new object, and the button to delete
//   // an Author
//   $(document).on("submit", "#user-form", handleAuthorFormSubmit);
//   $(document).on("click", ".delete-author", handleDeleteButtonPress);

//   // Getting the intiial list of Authors
//   getAuthors();


//   // A function to handle what happens when the form is submitted to create a new Author
//   function handleAuthorFormSubmit(event) {
//     event.preventDefault();
//     // Don't do anything if the name fields hasn't been filled out
//     if (!username.val().trim().trim()|| !firstName.val().trim().trim()) {
//       return;
//     }
//     // Calling the upsertAuthor function and passing in the value of the name input
//     upsertAuthor({
//       username: nameInput.val().trim(),
//       firstName: birthdate.val().trim(),
//       lastName:  lastName.val().trim(),
//       emailAddress: emailAddress.val().trim(),
//       password: password.val().trim(),
//       birthdate: birthdate.val().trim()
//     });
//   }

//   // A function for creating an author. Calls getAuthors upon completion
//   function upsertAuthor(authorData) {
//     $.post("/api/authors", authorData)
//       .then(getAuthors);
//   }
// // });
//   Function for creating a new list row for authors
//   function createAuthorRow(authorData) {
//     console.log(authorData);
//     var newTr = $("<tr>");
//     newTr.data("author", authorData);
//     newTr.append("<td>" + authorData.username + "</td>");
//     newTr.append("<td>" + authorData.birthdate + "</td>");
//     newTr.append("<td>" + authorData.firstName + "</td>"); 
//     newTr.append("<td># of posts will display when we learn joins in the next activity!</td>");
//     newTr.append("<td><a href='/blog?author_id=" + authorData.id + "'>Go to Posts</a></td>");
//     newTr.append("<td><a href='/cms?author_id=" + authorData.id + "'>Create a Post</a></td>");
//     newTr.append("<td><a style='cursor:pointer;color:red' class='delete-author'>Delete Author</a></td>");
//     return newTr;
//   }

//   Function for retrieving authors and getting them ready to be rendered to the page
//   function getAuthors() {
//     $.get("/api/authors", function(data) {
//       var rowsToAdd = [];
//       console.log(data);
//       for (var i = 0; i < data.length; i++) {
//         rowsToAdd.push(createAuthorRow(data[i]));
//       }
//       renderAuthorList(rowsToAdd);
//       nameInput.val("");
//       ageInput.val("");
//       position.val("");
//     });
//   }

//   A function for rendering the list of authors to the page
//   function renderAuthorList(rows) {
//     authorList.children().not(":last").remove();
//     authorContainer.children(".alert").remove();
//     if (rows.length) {
//       console.log(rows);
//       authorList.prepend(rows);
//     }
//     else {
//       renderEmpty();
//     }
//   }

//   Function for handling what to render when there are no authors
//   function renderEmpty() {
//     var alertDiv = $("<div>");
//     alertDiv.addClass("alert alert-danger");
//     alertDiv.html("You must create an Author before you can create a Post.");
//     authorContainer.append(alertDiv);
//   }

//   // Function for handling what happens when the delete button is pressed
//   function handleDeleteButtonPress() {
//     var listItemData = $(this).parent("td").parent("tr").data("author");
//     var id = listItemData.id;
//     $.ajax({
//       method: "DELETE",
//       url: "/api/authors/" + id
//     })
//     .done(getAuthors);
//   }
// });

// $("#form-btn-2").on("click", function(event) {
//             event.preventDefault();
//             //empty boxes
//             $("#username").val("");
//             $("#first-name").val("");
//             $("#last-name").val("");
//             $("#password").val("");
//             $("#email").val("");
//             $("#birthdate").val("");

//           });
