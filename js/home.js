// ahmed creation the home page
$(document).ready(function () {


// to transform sound off
    $("img.soundon").on("click", function () {
        $(this).hide()
        $("img.soundoff").show()
        $("audio:first").get(0).pause()
    })

// to transform sound on

    $("img.soundoff").on("click", function () {
        $(this).hide()
        $("img.soundon").show()
        $("audio:first").get(0).play()
    })

 // open popup for register
    $(".btnPlay").on("click", function () {
        $("audio:last").get(0).play();
        $("audio:first").get(0).play();
        $("img.soundon").show()
        $("img.soundoff").hide()

        $("div.popUp").css({
            transform: "scale(1) rotate(360deg) scale(1) rotate(360deg) scale(1) rotate(360deg) scale(1) rotate(360deg)scale(1) rotate(360deg) scale(1) rotate(360deg) scale(1) rotate(360deg) scale(1) rotate(360deg) scale(1) rotate(360deg) scale(1)  ",
            transition: "1s"
        })

    })
// close popup for regiset
    $("span.close").on("click", function () {
        $("audio:last").get(0).play();

        $("div.popUp").css({
            transform: "scale(.9) rotate(360deg) scale(.9) rotate(360deg) scale(.9) rotate(360deg) scale(.9) rotate(360deg) scale(0)  ",
            transition: "1s"
        })


    })


    // get data and store in localStorage
    $("input[name='level']").on("change",function(){
            level= $(this).val()
            })

    $("input[type='submit']").on("click", function (e) {
       
        var playername = $("input[placeholder='Enter Your Name Here']").val()
        var data_ofUser = [playername,level]
        localStorage.setItem("dataOfUser", JSON.stringify(data_ofUser));
    
    })

// start animation body

    $(".body_animate").css({
        top: '50%',
        transform: ' rotate(360deg)rotate(360deg)rotate(360deg)rotate(360deg)rotate(360deg)rotate(360deg)rotate(360deg)rotate(360deg)rotate(360deg)rotate(360deg)rotate(360deg)rotate(360deg)rotate(360deg) ',
        transition: '3s',

    })


    setTimeout(function () {


        $(".body_animate").animate({

            left: "0",
            width: "100%"

        }, 1000)

        $(".body_animate").animate({
            top: "0",
            height: "100%"

        }, 1000, function () {
            $("img.soundoff").show(1000)

            $("img.background").css("animation", "animateBackground  20s infinite")
        })

    }, 1000)


    
})