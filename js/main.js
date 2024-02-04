'use strict';

/* ^=====================Nav section=========> */
function openNav()
{
    if ($("nav").css("margin-left") == "250px") {
        closeNav();
    } else {
        $(".side-nav").css("margin-left","0px");
        $("nav").css("margin-left", "250px");
        $('.menu ul li').animate({"paddingTop":"25px","opacity":"1"},1000);
        $('.nav-menu').html('<i class="fa-solid fa-xmark fa-2x"></i>');
    }
}
function closeNav() 
{
    $('.menu ul li').animate({"paddingTop":"250px","opacity":"0"},1000);
    $(".side-nav").css("margin-left","-250px");
    $("nav").css("margin-left", "0px");
    $('.nav-menu').html('<i class="fa-solid fa-align-justify fa-2x"></i>');
}

$('.nav-menu').click(openNav);

/* ^=====================display data=========> */
let results,
movies,
movieImage,
movieTitle,
movieOverView,
movieRelease,
stars;
 async function getMovie(term) {
    let movie = `https://api.themoviedb.org/3/${term}?api_key=a295c2fda0d44898d34830970fce7edc&language=en-US&include_adult=false`;
    let myHttp = await fetch(`${movie}`);
    if (myHttp.ok && 400 != myHttp.status) {
        let Data = await myHttp.json();
         results = Data.results;
        movies = new Map(Object.entries(results));
        display();
    }
}
 async function searchMovie(term) {
    let movie = `https://api.themoviedb.org/3/search/movie?query=${term}&api_key=a295c2fda0d44898d34830970fce7edc&language=en-US&include_adult=false`;
    let myHttp = await fetch(`${movie}`);
    if (myHttp.ok && 400 != myHttp.status) {
        let Data = await myHttp.json();
        results = Data.results;
        movies = new Map(Object.entries(results));
        display();
    }
}
 function display()
{
let imgPath = 'https://image.tmdb.org/t/p/w500';
let term = '';
    for(let [key,value] of movies)
    {
         conditions(value,imgPath);
         term += `
         <div class="col-lg-4 col-md-6 col-sm-12 animate__animated">
         <div class="item overflow-hidden position-relative">
             <div class="cardImage">
                 <img src="${movieImage}" class="img-fluid">
             </div>
             <div class="overlay overflow-hidden">
                 <h1 class="animate__animated title">${value[movieTitle]}</h1>    
                 <p class="animate__animated desc">${movieOverView}</p>
                 <p class="animate__animated date"><span class="fst-normal">Release Date<span> : ${movieRelease}</p>
                 <h3 class="rate animate__animated">${stars}</h3>
                 <h3 class="rate animate__animated vote">${value.vote_average.toFixed(1)}</h3>
             </div>
         </div>
     </div>
    `
         $('#hero .row').html(term);
         $('#hero .row div').addClass("animate__fadeIn");
         $('#hero .item ').mouseenter(cardHoverIn);
        $('#hero .item').mouseleave(cardHoverOut);
    }
}
function conditions(value,imgPath)
{
    checkMovieImage(value,imgPath);
    checkMovieTItle(value);
    checkMovieDesc(value);
    checkMovieDate(value);
    checkMovieVote(value);
}
function checkMovieImage(value,imgPath)
{
    if(value.poster_path == null && value.backdrop_path == null)
    {
        movieImage = `assets/images/default-movie.jpg`;
    }
    else if(value.poster_path == null)
    {
        movieImage = `${imgPath+value.backdrop_path}`;
    }
    else if(value.hasOwnProperty('poster_path'))
    {
        movieImage = `${imgPath+value.poster_path}`;
    }
}
function checkMovieTItle(value)
{
    if(value.hasOwnProperty('title'))
    {
        movieTitle = `title`;
    }
    else if(value.hasOwnProperty('name'))
    {
            movieTitle = `name`;
    }
}
function checkMovieDesc(value)
{
    if(value.overview.length > 300)
    {
        movieOverView = `${value.overview.slice(0,300)}...`;
    }
    else
    {
        movieOverView = `${value.overview}`;
    }
}
function checkMovieDate(value)
{
    if(value.hasOwnProperty('release_date'))
    {
        movieRelease = `${value.release_date}`;
    }
    else if(value.hasOwnProperty('first_air_date'))
    {
        movieRelease = `${value.first_air_date}`;
    }
    else
    {
        movieRelease = "Release Date UnKnown";
    }
}
function checkMovieVote(value)
{
    if(value.vote_average < 1)
    {
        stars = `<i class="fa-solid fa-star text-muted fs-6"></i>`;
    }
    else if(value.vote_average < 2)
    {
        let term = '';
        stars = term + `<i class="fa-regular fa-star-half-stroke text-warning fs-6"></i>`;
    }
    else if(value.vote_average < 3)
    {
        stars =  `<i class="fa-solid fa-star text-warning fs-6"></i>`;
    }
    else if(value.vote_average <4)
    {
        let term = '';
        for (let i = 0; i < 1; i++) {
        term += `<i class="fa-solid fa-star text-warning fs-6"></i>`;
        }
        stars = term + `<i class="fa-regular fa-star-half-stroke text-warning fs-6"></i>`;
    }
    else if(value.vote_average <5)
    {
        let term = '';
        for (let i = 0; i < 2; i++) {
        term += `<i class="fa-solid fa-star text-warning fs-6"></i>`;
        }
        stars = term;
    }
    else if(value.vote_average <6)
    {
        let term = '';
        for (let i = 0; i < 2; i++) {
        term += `<i class="fa-solid fa-star text-warning fs-6"></i>`;
        }
        stars = term + `<i class="fa-regular fa-star-half-stroke text-warning fs-6"></i>`;
    }
    else if(value.vote_average < 7)
    {
        let term = '';
        for (let i = 0; i < 3; i++) {
        term += `<i class="fa-solid fa-star text-warning fs-6"></i>`;
        }
        stars = term;
    }
    else if(value.vote_average < 8)
    {
        let term = '';
        for (let i = 0; i < 3; i++) {
        term += `<i class="fa-solid fa-star text-warning fs-6"></i>`;
        }
        stars = term + `<i class="fa-regular fa-star-half-stroke text-warning fs-6"></i>`;
    }
    else if(value.vote_average < 9)
    {
        let term = '';
        for (let i = 0; i < 4; i++) {
        term += `<i class="fa-solid fa-star text-warning fs-6"></i>`;
        }
        stars = term;
    }
    else if(value.vote_average < 10)
    {
        let term = '';
        for (let i = 0; i < 4; i++) {
        term += `<i class="fa-solid fa-star text-warning fs-6"></i>`;
        }
        stars = term + `<i class="fa-regular fa-star-half-stroke text-warning fs-6"></i>`;
    }
    else
    {
        let term = '';
        for (let i = 0; i < 5; i++) {
            term += `<i class="fa-solid fa-star text-warning fs-6"></i>`;
        }
        stars = term;
    }
}


function cardHoverIn()
    {
      $(this).find($('.overlay')).css({"opacity":"1","visibility":"visible"});
      $(this).find($('.overlay .title')).removeClass('animate__slideOutLeft');
      $(this).find($('.overlay .title')).addClass('animate__fadeInDown animate__delay-0s');
      $(this).find($('.overlay .desc')).removeClass('animate__slideOutLeft');
      $(this).find($('.overlay .desc')).addClass('animate__flipInX animate__delay-0s');
      $(this).find($('.overlay .date')).removeClass('animate__slideOutLeft');
      $(this).find($('.overlay .date')).addClass('animate__fadeInUp animate__delay-0s');
      $(this).find($('.overlay .rate')).removeClass('animate__slideOutLeft');
      $(this).find($('.overlay .rate')).addClass('animate__fadeInUp animate__delay-0s');
      $(this).find($('.cardImage img')).addClass("animate");
  }
  function cardHoverOut()
    {
      $(this).find($('.overlay')).css({"opacity":"0","visibility":"hidden"});
      $(this).find($('.overlay .title')).removeClass('animate__fadeInDown animate__delay-0s');
      $(this).find($('.overlay .title')).addClass('animate__slideOutLeft');
      $(this).find($('.overlay .desc')).removeClass('animate__flipInX animate__delay-0s');
      $(this).find($('.overlay .desc')).addClass('animate__slideOutLeft');
      $(this).find($('.overlay .date')).removeClass('animate__fadeInUp animate__delay-0s');
      $(this).find($('.overlay .date')).addClass('animate__slideOutLeft');
      $(this).find($('.overlay .rate')).removeClass('animate__fadeInUp animate__delay-0s');
      $(this).find($('.overlay .rate')).addClass('animate__slideOutLeft');
      $('.cardImage img').removeClass("animate");
}  



getMovie("movie/now_playing");


$('.menu a').click(getMovieAttr);

function scroll() {
    $(window).scroll(backToTop);

    function backToTop() {
        var scrollPosition = $(window).scrollTop();
        var backToTopElement = $('#back-to-top');

        if (scrollPosition > 100) {
            backToTopElement.addClass("active");
        } else {
            backToTopElement.removeClass("active");
        }
    }
}
 function getMovieAttr()
{
    if($(this).attr("attr") == "nowPlaying")
    {
        getMovie("movie/now_playing");
        topZero();
    }
    else if($(this).attr("attr") == "popular")
    {
        getMovie("movie/popular");
        topZero();
    }
    else if($(this).attr("attr") == "topRated")
    {
        getMovie("movie/top_rated");
        topZero();
    }
    else if($(this).attr("attr") == "trending")
    {
    getMovie("trending/movie/day");
    topZero();
    }
    else if($(this).attr("attr") == "upcoming")
    {
        getMovie("movie/upcoming");
        topZero();
    }
}
 function navGetSection()
{
    if($(this).attr("section"))
    {
    let sectionLocation = $($(this).attr("section")).offset().top;
    $('html, body').animate({scrollTop:sectionLocation}, 2000);
    }
}
 function topZero()
{
    $('html, body').animate({scrollTop:0}, 1500);
}

$('.menu li a').click(navGetSection);
$("#back-to-top").click(topZero)
$('#search').on("input", e => {
    searchMovie(e.target.value);
    if(e.target.value == "")
    {
        getMovie("movie/now_playing");
    }
});
$(document).ready(function(){
    $('.loading').fadeOut(2000)
})




/* ^=====================contact us=========> */


let nameUser = document.getElementById('name');
const emailUser = document.getElementById('email');
const phoneUser = document.getElementById('phone');
const ageUser = document.getElementById('age');
const passwordUser = document.getElementById('password');
const rePassWordUser = document.getElementById('repassword');
let error = Array.from(document.querySelectorAll(".error"));

function validations() {
  let errorMessage = '';
  let currentIndex=0;
  nameUser.addEventListener('input', function() {
    let regex = /^[a-zA-Z\s]{1,36}$/;
    let name = nameUser.value;
    currentIndex=0;

  
    if (name === '') {
      errorMessage = '';
      setTimeout(function() {
        hideError(errorMessage, currentIndex);
      }, 200);
    } else if (!regex.test(name)) {
      errorMessage = 'Invalid Name, only characters allowed';
      setTimeout(function() {
        showError(errorMessage, currentIndex);
      }, 200);
    } else {
      errorMessage = '';
      hideError(errorMessage, currentIndex);
    }
  });

  emailUser.addEventListener('input', function() {
    let regex = /^[a-zA-Z0-9]+@[a-z0-9]+\.[a-z]{3}$/;
    let email = emailUser.value;
    currentIndex = 1;
    if (email === '') {
      errorMessage = '';
      setTimeout(function() {
        hideError(errorMessage, currentIndex);
      }, 200);
    } else if (!regex.test(email)) {
      errorMessage = "Invalid Email, try example@domain.com";
      setTimeout(function() {
        showError(errorMessage, currentIndex);
      }, 200);
    } else {
      errorMessage = '';
      hideError(errorMessage, currentIndex);
    }
  });
  phoneUser.addEventListener('input', function() {
    let regex = /^(02)?(01)[0125][0-9]{8}$/;
    let phone = phoneUser.value;
    currentIndex=2;
    if (phone === '') {
      errorMessage = '';
      setTimeout(function() {
        hideError(errorMessage, currentIndex);
      }, 200);
    } else if (!regex.test(phone)) {
      errorMessage ="Invalid Phone Number";
      setTimeout(function() {
        showError(errorMessage, currentIndex);
      }, 200);
    } else {
      errorMessage = '';
      hideError(errorMessage, currentIndex);
    }
  });
 ageUser.addEventListener('input', function() {
    let regex = /^(1[6-9]|[2-9][0-9]|100)$/;;
    let age =ageUser.value;
    currentIndex= 3;
    if (phone === '') {
      errorMessage = '';
      setTimeout(function() {
        hideError(errorMessage, currentIndex);
      }, 200);
    } else if (!regex.test(age)) {
      errorMessage ="Your age must be over 16+";
      setTimeout(function() {
        showError(errorMessage, currentIndex);
      }, 200);
    } else {
      errorMessage = '';
      hideError(errorMessage, currentIndex);
    }
  });
 passwordUser.addEventListener('input', function() {
    let regex =  /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    let password =passwordUser.value;
    currentIndex= 4;
    if (phone === '') {
      errorMessage = '';
      setTimeout(function() {
        hideError(errorMessage, currentIndex);
      }, 200);
    } else if (!regex.test(password)) {
      errorMessage ="password must contain numbers & letters at least 8 character";
      setTimeout(function() {
        showError(errorMessage, currentIndex);
      }, 200);
    } else {
      errorMessage = '';
      hideError(errorMessage, currentIndex);
    }
  });
 rePassWordUser.addEventListener('input', function() {
    
    let rePassWord =rePassWordUser.value;
    currentIndex= 5;
    if (phone === '') {
      errorMessage = '';
      setTimeout(function() {
        hideError(errorMessage, currentIndex);
      }, 200);
    } else if (rePassWord!=passwordUser.value) {
      errorMessage ="Password not match";
      setTimeout(function() {
        showError(errorMessage, currentIndex);
      }, 200);
    } else {
      errorMessage = '';
      hideError(errorMessage, currentIndex);
    }
  });

  function hideError(errorMessage, index) {
    error[index].style.cssText = 'border-bottom-color: #CED4DA; transition: all 0.5s ease-in;';
    error[index].innerHTML = errorMessage;
    console.log(index)
  }

  function showError(errorMessage, index) {
    error[index].innerHTML = errorMessage;
    error[index].style.cssText = 'border-bottom: #CED4DA; transition: all 0.5s;';
  }
}
validations()