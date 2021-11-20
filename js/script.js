$(document).ready(function(){
    //Smooth On Scroll
    $("#contactBtn").click(function(){
        if (this.hash !== "") {
            event.preventDefault();
      
            var hash = this.hash;
      
            $('html, body').animate({
              scrollTop: $(hash).offset().top
            }, 1500)
        }
    });
    //add check value to make the animation happens everytime when i open sidebar
    var check = 0 ;
    //Animation for Sidebar..
    $('#openSidebar').click(function() {
        //change icon on click 
        $(this).find('i').toggleClass('fa-align-justify fa-times');
        //open Sidebar
        $(".sidebar").toggleClass("sidebarLeft");
        if(check == 0 ){
            //animate items at slidebar
            $(".itemOne").animate({ opacity:"1", paddingTop: "25px" }, 1000);
            $(".itemTwo").animate({opacity:"1", paddingTop: "25px" }, 1200);
            $(".itemThree").animate({opacity:"1", paddingTop: "25px" }, 1400);
            $(".itemFour").animate({opacity:"1", paddingTop: "25px" }, 1600);
            $(".itemFive").animate({opacity:"1" ,paddingTop: "25px"  }, 1800);
            $(".itemSix").animate({opacity:"1", paddingTop: "25px" }, 2000);
            check = 1 ;
        }
        else{
            //animate items at slidebar
            $(".nav-items ul li").animate({ opacity:"0", paddingTop: "250px" }, 500);
            check = 0 ;
        }
    
    });

    //Display data by api url using async 
    
    let posts = [];
    let searchInput = document.getElementById("searchInput");
    let navLink = document.getElementById("nav-item");
    let navLinkOne = document.getElementById("nav-item-one");
    let navLinkTwo = document.getElementById("nav-item-two");
    let navLinkThree = document.getElementById("nav-item-three");
    let navLinkFour = document.getElementById("nav-item-four");
    async function addPosts(term){
        let myResponse = await  fetch(`https://api.themoviedb.org/3/${term}?api_key=eba8b9a7199efdcb0ca1f96879b83c44&fbclid=IwAR2_Pgznd1GWYyTDmAAjaS0VnAYFG-jyFJKO5qk3auunAEfH0mBkK3Mu-eE`)
        posts = await myResponse.json();
        posts = posts.results;
        console.log(posts);
        displayPosts();
    }
    addPosts("movie/now_playing");
    
    navLink.addEventListener("click", function () {
        addPosts("movie/now_playing");
        console.log(navLink.id)
    });
    navLinkOne.addEventListener("click", function () {
        addPosts("movie/popular");
    });
    navLinkTwo.addEventListener("click", function () {
        addPosts("movie/top_rated");
    });
    navLinkFour.addEventListener("click", function () {
        addPosts("trending/all/day");
    });
    navLinkThree.addEventListener("click", function () {
        addPosts("movie/upcoming");
    });

  
    //Display Data from API URL
    function displayPosts()
    {
    let cartoona = ``;

    for(let i=0; i<posts.length; i++)
    {
        
        cartoona +=`
        <div class="col-lg-4 col-md-6">
            <div class="box">
                <img src="https://image.tmdb.org/t/p/w500/${posts[i].poster_path}" class="img-fluid">
                <div class="overlayImg">
                    <div class="movieDetails">
                        <h2>${posts[i].title}</h2>
                        <p>${posts[i].overview}</p>
                        <p> rate: ${posts[i].vote_average}</p>
                        <p>${posts[i].release_date}</p>
                    </div>
                </div>
            </div>
            
        </div>`

    }
    document.getElementById("myRow").innerHTML  = cartoona;
    };

    //Search Function 
    function searchFun(searchTerm){
        cartoona = ``;
        
        for(let i=0; i<posts.length; i++){
            console.log(posts[i].original_title);
            let originalTitleMovie = posts[i].original_title.toLowerCase().includes(searchTerm.toLowerCase()),
                 titleMovie = posts[i].title.toLowerCase().includes(searchTerm.toLowerCase()),
                 overviewMovie = posts[i].overview.toLowerCase().includes(searchTerm.toLowerCase());
            if( originalTitleMovie == true || titleMovie == true || overviewMovie == true ){
                cartoona +=`
                <div class="col-lg-4 col-md-6">
                    <div class="box">
                        <img src="https://image.tmdb.org/t/p/w500/${posts[i].poster_path}" class="img-fluid">
                        <div class="overlayImg">
                            <div class="movieDetails">
                                <h2>${posts[i].title}</h2>
                                <p>${posts[i].overview}</p>
                                <p> rate: ${posts[i].vote_average}</p>
                                <p>${posts[i].release_date}</p>
                            </div>
                        </div>
                    </div>
                    
                </div>`
                console.log("Yes");
            }
            else{
                console.log("No");
            }
        }
        document.getElementById("myRow").innerHTML  = cartoona;
    }
    //Input One
    searchInput.addEventListener("keyup", function () {
        console.log(searchInput.value);
        searchFun(searchInput.value);
    })
    //Input Two
    searchInputTwo.addEventListener("keyup", function () {
        console.log(searchInputTwo.value);
        searchFun(searchInputTwo.value);
    })

    //======Validation ========
    let userName = document.getElementById("name"),
        alertBox = document.getElementById("nameAlert"),
        userEmail = document.getElementById("email"),
        userEmailAlert = document.getElementById("emailalert"),
        userPhone = document.getElementById("phone"),
        userPhoneAlert = document.getElementById("phonealert"),
        userAge = document.getElementById("age"),
        userAgeAlert = document.getElementById("agealert"),
        userPassword = document.getElementById("password"),
        userPasswordAlert = document.getElementById("passwordalert"),
        userRePassword = document.getElementById("rePassword"),
        userRepasswordAlert = document.getElementById("repasswordalert"),
        submitBtn = document.getElementById("submit");
        //Name Validation
        function userNameValid() {
            let regex = /^[a-zA-Z0-9]+$/;
            let final =  regex.test(userName.value);
            if( final == true){
                alertBox.style.display = 'none';
                userName.classList.add('inputColor');
                return 1;
            }
            else{
                alertBox.style.display = 'block';
            }
        }
        //Email Validation
        function userEmailValid() {
            regex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
            final =  regex.test(userEmail.value);
            if( final == true){
                userEmailAlert.style.display = 'none';
                return 1;
            }
            else{
                userEmailAlert.style.display = 'block';
            }
        }
        //Phone Validation
        function userPhoneValid() {
            regex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4,6})$/;
            final =  regex.test(userPhone.value);
            if( final == true){
                userPhoneAlert.style.display = 'none';
                userPhone.classList.add('inputColor');
                return 1 ;
            }
            else{
                userPhoneAlert.style.display = 'block';
            }
        }
        //Age Validation
        function userAgeValid() {
            regex = /^[1-9]?[0-9]{1}$|^100$/;
            final =  regex.test(userAge.value);
            if( final == true){
                userAgeAlert.style.display = 'none';
                userAge.classList.add('inputColor');
                return 1;
            }
            else{
                userAgeAlert.style.display = 'block';
            }
        }
         //Password Validation
         function userPasswordValid() {
            regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
            final =  regex.test(userPassword.value);
            if( final == true){
                userPasswordAlert.style.display = 'none';
                userPassword.classList.add('inputColor');
                return 1;
            }
            else{
                userPasswordAlert.style.display = 'block';
            }
        }
        //RePassword Validation
        function userRePasswordValid() {
            if( userPassword.value == userRePassword.value){
                userRepasswordAlert.style.display = 'none';
                userRePassword.classList.add('inputColor');
                test();
                console.log("testUserPAss");
                return 1;   
            }
            else{
                userRepasswordAlert.style.display = 'block';
            }
        }
        //Name Alert 
        userName.addEventListener("click", function () {
            alertBox.style.display = 'block';
        });
        //Email Alert 
        userEmail.addEventListener("keyup", function () {
            userEmailAlert.style.display = 'block';
        });
        //Phone Alert
        userPhone.addEventListener("click", function () {
            userPhoneAlert.style.display = 'block';
        });
        //Age Alert 
        userAge.addEventListener("click", function () {
            userAgeAlert.style.display = 'block';
        });
        //Password Alert
        userPassword.addEventListener("click", function () {
            userPasswordAlert.style.display = 'block';
        });
        //RePassword Alert 
        userRePassword.addEventListener("click", function () {
            userRepasswordAlert.style.display = 'block';
        });
        userName.addEventListener("keyup",userNameValid),
        userEmail.addEventListener("keyup",userEmailValid),
        userPhone.addEventListener("keyup",userPhoneValid),
        userAge.addEventListener("keyup",userAgeValid),
        userPassword.addEventListener("keyup",userPasswordValid),
        userRePassword.addEventListener("keyup",userRePasswordValid);
        function test(){
                console.log("testing");
                if(!checker()){
                    $('#submit').prop('disabled', true);    
                }else{
                    $('#submit').prop('disabled', false);   
                }
            
        }
        function checker(){
            if(userNameValid() == 1 && userEmailValid() == 1 && userPhoneValid() == 1 && userAgeValid() == 1 && userPasswordValid() == 1 )
                {
                    return true;
                } else {
                    return false;
                }   
        }
        
})
    


