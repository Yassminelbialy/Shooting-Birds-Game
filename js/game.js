///////////////////////////////// Aya/////////////////
// Loading function
$(function () {
    // end drag for allimages
    $('img').on('dragstart', function(event) { event.preventDefault(); });

// Ahmed -> creation all sounds for game and send data from home page to game page in local storage

    setInterval(function(){
        var bgSound=document.querySelector(".bgSound")
        bgSound.play();
    },1000)


    localStorageItem = JSON.parse(localStorage.getItem("dataOfUser"));
    score = document.getElementById("sc");
    playerName=localStorageItem[0];
    level=localStorageItem[1] ;
    flyingSpeed =60;
    $("#levelLable").text(level);
    Swal.fire({
        title: 'Hello ' +playerName ,
        text: 'Have a nice game',
        imageUrl: '../images/gold2.gif',
        imageWidth: 400,
        imageHeight: 120,
        imageAlt: 'Custom image',
        allowOutsideClick: false
    })
    $(".swal2-confirm").on("click", startGame) //the game will start when click on "OK" on the popup
});//Loading

function startGame() {

///////////////////////////////// creation bomb Ahmed,aya,yasmeen in level hard///////////////////////

    if (level == "Hard") {
        bombID = setInterval(function () {
            $("body").append('<div class="area"><img class="bomb" src="../images/bomb.png"> </div>');
            $('.area').css({
                top: -600,
                left: Math.random() * ($(window).height())+ 'px'
            })
            bombDown = document.querySelector(".bombDown")
            bombDown.currentTime = 1.2
            bombDown.play()
        }, 20000);
        //moving the bomb and handling its event
        setInterval(function () {
            $(".area").css({ "top": "+=10px" });
            $(".bomb").on("click", function (e) {
                $(this).attr("src","../images/explosion.gif");
                bombSound = document.querySelector(".bomb");
              
                bombSound.play();
                bombDown.currentTime=8
                setTimeout(function () {
                    $(".area").remove();
                }, 700)
                if (parseInt($(".allBirds").last().css("left"))+parseInt($(".allBirds").last().css("width")) > parseInt($(".area").css("left")) && parseInt($(".allBirds").last().css("left")) < parseInt($(".area").css("left"))+parseInt($(".area").css("width"))  ) {
                    $(".allBirds").last().click().remove();
                }
    
                if (parseInt($(".allBirds").first().css("left"))+parseInt($(".allBirds").first().css("width")) > parseInt($(".area").css("left")) && parseInt($(".allBirds").first().css("left")) < parseInt($(".area").css("left"))+parseInt($(".area").css("width"))  ) {
                    $(".allBirds").first().click().remove();
                }
    
    
                
            })
        }, 100);
    // change speed yasmeen
         flyingSpeed =40;
        }



    $("body").on("click", function () {
        var shot= document.querySelector(".shotGun");
        shot.currentTime=0;
        shot.play();
     })

    /////////////////////////////////Yassmin///////////////////////
    // method for creation the normal birds in random locations 
    function normalBird() {
        let img1 = new Image(200, 200);
        img1.src = "../images/normal2.gif";
        $("body").append(img1);
        $('img').last().css({
            top: Math.random() * ($(window).height() - $('img').last().height()) + 'px',
            // multiply random .width(0..1) value by window height minus div height
            // left: Math.random() * ($(window).width() - $('img').last().width()) + 'px'
        }).addClass("allBirds").addClass("normalBirds");
        $('img').last().on('dragstart', function(event) { event.preventDefault(); });
    }
    normalBird();
    normalBird();

    ///////////////////////handling the timer by Ahmed Said  and Yassmin
    decreaseProgress = 100
    timerID = setInterval(function () {
        if (decreaseProgress < 0) {
            decreaseProgress = 0;
            loseEndGame();      //calling end game function when the time is out
        } else {
            $(".move_progress").css("width", decreaseProgress + '%').text(decreaseProgress + "%")
        }
        decreaseProgress -= 1;
        if (decreaseProgress < 50) { //the timer background color will be orange if the half time pass
            $(".move_progress").css({ backgroundColor: "orange" })
        }
        if (decreaseProgress < 25) {
            $(".move_progress").css({ backgroundColor: "red" })
        }
    }, 700)
    ///////////////////////////Yassmin
    /////creation black birds
    blackID = setInterval(function () {
        let img1 = new Image(200, 200);
        img1.src = "../images/black.gif";
        $("body").append(img1);
        $('img').last().css({
            top: Math.random() * ($(window).height() - $('img').last().height()) + 'px',
            // left: Math.random() * ($(window).width() - $('img').last().width()) + 'px'
        }).addClass("allBirds").addClass("blackBirds");
        $('img').last().on('dragstart', function(event) { event.preventDefault(); });
    
    }, 4000);
    //creation normal birds by calling the function 
    normalID = setInterval(function () {
        normalBird();
    }, 2500);
    /////creation gold birds
    goldID = setInterval(function () {
        let img1 = new Image(200, 200);
        img1.src = "../images/gold.gif";
        $("body").append(img1);
        $('img').last().css({
            top: Math.random() * ($(window).height() - $('img').last().height()) + 'px',
            // left: Math.random() * ($(window).width() - $('img').last().width()) + 'px'
        }).addClass("flipBird").addClass("allBirds").addClass("goldBirds");
        $('img').last().on('dragstart', function(event) { event.preventDefault(); });
    }, 3000);
    //moving all birds
    flyingIntervalID = setInterval(function () {
        $(".allBirds").css({ "left": "+=20px"});

        if (parseInt($(".allBirds").css("left")) > window.innerWidth) {
            $(".allBirds").first().remove()
        }
      

    }, flyingSpeed);



    /////////////////////Aya ////////////////////
    //score 
    livesCounter = 30;
    totalscore = 0;
    $("body").on("click", ".allBirds", function (e) {
        bird = event.target.classList.value;
        //hunted birds
        dieDuck = document.querySelector(".dieDuck");
        dieDuck.currentTime = .4;
        dieDuck.play();
        setTimeout(function () {
            dieDuck.currentTime = 9;
        }, 500)
        $(this).attr("src","../images/feather.png");
        setTimeout(() => {
            $(this).remove()
        }, 200);
    
        if (bird == ("allBirds normalBirds")) {
            totalscore += 5;
            score.innerText = totalscore;
            livesCounter -= 1;
        }
        else if (bird == ("allBirds blackBirds")) {
            totalscore -= 10;
            score.innerText = totalscore;
        } else if (bird == ("allBirds goldBirds")) {
            totalscore += 10;
            score.innerText = totalscore;
            livesCounter -= 1;
        }else{ //the score for all bird when hint a bomb
            totalscore += 5;
            score.innerText = totalscore;
            livesCounter -= 1;
        }
        if (livesCounter > 0) {
            $("#LivesLable").text("Lives = " + livesCounter)

        } else {
            $("#LivesLable").text("Lives = " + 0)
            winEndGame();
        }
    })
}

////////////////////////////////////Yassmien&Aya/////////////////////////////
function winEndGame() {

    clearInterval(timerID);
    clearInterval(blackID);
    clearInterval(goldID);
    clearInterval(normalID);
    clearInterval(flyingIntervalID);
    if (localStorageItem[1] == "Hard") {
        clearInterval(bombID);
        }
    Swal.fire({
        title: 'Congratulations',
        icon: 'success',
        html:'THanks for this Game',         
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText:'Play Again',
        cancelButtonText:'back'  ,
        allowOutsideClick: false 
      })
      $(".swal2-confirm").on("click", function(){

        location.href = "gamePage.html";    
      });


      $(".swal2-cancel").on("click", function(){

        location.href = "home.html";
      });
    
}

function loseEndGame() {
  
    clearInterval(timerID);
    clearInterval(blackID);
    clearInterval(goldID);
    clearInterval(normalID);
    clearInterval(flyingIntervalID);
    if (localStorageItem[1] == "Hard") {
    clearInterval(bombID);
    }
    Swal.fire({
        title: 'Game Over',
        icon: 'error',
        html:'Ooops you lose this Game !',         
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText:'Play Again',
        cancelButtonText:'back' ,  
        allowOutsideClick: false
      })
      $(".swal2-confirm").on("click", function(){
        location.href = "../gameHTML/gamePage.html";
      });

      $(".swal2-cancel").on("click", function(){
        location.href = "../home.html";
      });
    
}



