var buttonColors = ["red", "blue", "green", "yellow"]
var gamePattern = []
var userClickedPattern = []


var started = false
var level = 0

// initialise the game
function KeyPress(){
    $(document).keypress(function(){
        if (!started){
            // $("h1").text("Level "+level)
            nextSequence()
            started = true
        }
    })
}
KeyPress()
//button click
$("button").click(function(){
    var userChosenColor = $(this).attr("class")
    userClickedPattern.push(userChosenColor)
    playSound(userChosenColor)
    animatePress(userChosenColor)
    checkAnswer(userClickedPattern.length-1)
})


//proceeding the game
function nextSequence(){
    level++
    userClickedPattern = []
    $("h1").text("Level "+level)
    var randomNumber = Math.floor(Math.random() * 4)
    var randomChosenColor = buttonColors[randomNumber]
    gamePattern.push(randomChosenColor)
    $("."+randomChosenColor).fadeOut(300).fadeIn(300)
    playSound(randomChosenColor)
}


function playSound(name){
    var audio = new Audio("sounds/"+ name +".mp3")
    audio.play()
}

function animatePress(currentColor){
    $("." + currentColor).addClass("pressed")
    setTimeout(function(){
        $("."+currentColor).removeClass("pressed")
    }, 100)
}

function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("success")
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence()
            }, 1000)
        }
    }
    else{
        playSound("wrong")
        $("h1").text("Game Over.")
        setTimeout(function(){
            $("h1").text("Press Any Key to Restart.")
        }, 500)
        gamePattern = []
        userClickedPattern = []
        level = 0
        started = false
        KeyPress()
    }
}
