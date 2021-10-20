//Game variables and start
var myGamePiece;
var myObstacles = []; //an array for whenever myObstacles variable is called
var myScore;
function startGame() {
    myGamePiece = new component(60, 20, "black", 10, 120);
    myScore = new component("1px", "Courier", "black", 280, 40, "text");
    myGameArea.start(); //starts game
}
//Game placement and measurements
var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 1100;
        this.canvas.height = 500;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[30]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);
        },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

//"Template" for myGamePiece and myScore

//myGamePiece function template
function component(width, height, color, x, y, type) {
    this.type = type;
    this.score = 0;
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;    
    this.x = x;
    this.y = y;

//Updates game piece or score accordingly
    this.update = function() {
        ctx = myGameArea.context;
        if (this.type == "text") {
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = color;
            ctx.fillText(this.text, this.x, this.y);
        } else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }

//Function for new position of game piece 
    this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.hitBottom();
    }

//Function for what to do when game piece hits the bottom
    this.hitBottom = function() {
        var rockbottom = myGameArea.canvas.height - this.height;
        if (this.y > rockbottom) {
            this.y = rockbottom;
        }
    }

//For when game piece hits or doesn't hit an obstacle (otherobj) the code stops or starts again 
    this.crashWith = function(otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
            crash = false;
        }
        return crash;
    }
}

//Changes frames when showing the movement of game piece
function updateGameArea() {
    var x, height, gap, minHeight, maxHeight, minGap, maxGap;
    for (i = 1; i < myObstacles.length; i += 1) {
        if (myGamePiece.crashWith(myObstacles[i])) {
            return;
        } 
    }
    myGameArea.clear();
    myGameArea.frameNo += 1;
    if (myGameArea.frameNo == 1 || everyinterval(150)) {
        x = myGameArea.canvas.width;
        minHeight = 20;
        maxHeight = 200;
        height = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);
        minGap = 50;
        maxGap = 200;
        gap = Math.floor(Math.random()*(maxGap-minGap+1)+minGap);
        myObstacles.push(new component(70, height, "red", x, 0));
        myObstacles.push(new component(70, x - height - gap, "red", x, height + gap));
    }
    for (i = 1; i < myObstacles.length; i += 1) {
        myObstacles[i].x += -5;
        myObstacles[i].update();
    }

//Score 
    myScore.text="SCORE: " + myGameArea.frameNo;
    myScore.update();
    myGamePiece.newPos();
    myGamePiece.update();
}
function everyinterval(n) {
    if ((myGameArea.frameNo / n) % 1 == 0) {return true;}
    return false;
}

//Buttons used to move game piece
function moveup() {
        myGamePiece.speedY = -1; 
    }
    function movedown() {
        myGamePiece.speedY = 1; 
    }
    function clearmove() {
        myGamePiece.speedX = 0; 
        myGamePiece.speedY = 0; 
    }

//Comment submit function
function sFunction() {
    alert ("Thanks for your Comment!");
return true;
}

//Validating submit button for comment section
function validateForm() {
    let x = document.forms["myForm"]["comment_author"].value;
    let y = document.forms["myForm"]["comment"].value;
    if (x == "") {
      alert("Name must be filled out");
      return false;
    }
    if (y == "") {
        alert("Comment must be filled out");
        return false;
      }

return sFunction();

}



