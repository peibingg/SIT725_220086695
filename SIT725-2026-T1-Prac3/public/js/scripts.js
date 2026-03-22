'use strict';

const bookList = [
  {
    title: "The Story Of A Lonely Boy",
    image: "images/book2.png",
    link: "About The Story Of A Lonely Boy",
    desciption: "The Story Of A Lonely Boy is a book about a lonely boy who is trying to find his place in the world."
  },
  {
    title: "Sin Eater",
    image: "images/book3.png",
    link: "About Sin Eater",
    desciption: "Sin Eater is a book about a boy who is a sin eater and he is trying to save the world from the sins of the people."
  },
];

const clickMe = () => {
  alert("Thanks for clicking me. Hope you have a nice day!");
};

const submitForm = () => {
  let formData = {};
  formData.first_name = $('#first_name').val();
  formData.last_name = $('#last_name').val();
  formData.password = $('#password').val();
  formData.email = $('#email').val();
  console.log("Form Data Submitted: ", formData);
}

const addBooks = (items) => {
  items.forEach(item => {
    let itemToAppend = '<div class="col s4 center-align">' +
      '<div class="card"><div class="card-image waves-effect waves-block waves-light"><img class="activator" src="' + item.image + '">' +
      '</div><div class="card-content">' +
      '<span class="card-title activator grey-text text-darken-4">' + item.title + '<i class="material-icons right">more_vert</i></span><p><a href="#">' + item.link + '</a></p></div>' +
      '<div class="card-reveal">' +
      '<span class="card-title grey-text text-darken-4">' + item.title + '<i class="material-icons right">close</i></span>' +
      '<p class="card-text">' + item.desciption + '</p>' +
      '</div></div></div>';
    document.getElementById('book-section').insertAdjacentHTML('beforeend', itemToAppend);
  });
};

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.materialboxed').forEach(el => {
    M.Materialbox.init(el);
  });

  document.getElementById('clickMeButton').addEventListener('click', clickMe);

  $('#formSubmit').click(()=>{
    submitForm();
  })
  
  $('.modal').modal();
  addBooks(bookList);
});
