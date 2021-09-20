$(document).ready(function() {

    // setting all variables.

    var canvas = $('canvas')[0]; // canvas
    var ctx = canvas.getContext("2d"); // context
    
    // width , height
    var width = canvas.width;
    var height = canvas.height;
    
    //board as an array(1D)
    var board = [   0, 0, 0,
                    0, 0, 0,
                    0, 0, 0 ]; // board
    // -1 is Human 
    //  1 is AI 
    //  0 is empty
    


    var human_btn = $("#human_btn"); // I'll go first button
    var ai_btn = $("#ai_btn"); // You go first button
    

    var human_art_isX = null;
    var isHumanTurn = false;
    var options = $(".options");


    var status = $("#status");
    var agentTime = $("#time_agent");
    var humanTime = $("#time_human");


    // game status
    var gameRunning = false;

    // hide options funciton 
    function hideOptions(doHide = true) {
        if(doHide) {
            options.hide();
        } else {
            options.show();
        }
    }


    // clear Board
    function clearBoard() {
        ctx.clearRect(0, 0, width, height);
    }

    // draw Board
    function drawBoard() {
        ctx.beginPath();
        ctx.moveTo(100,0);
        ctx.lineTo(100,300);
        ctx.moveTo(200,0);
        ctx.lineTo(200,300);
        ctx.moveTo(0,100);
        ctx.lineTo(300,100);
        ctx.moveTo(0,200);
        ctx.lineTo(300,200);
        ctx.stroke();
    }

    // reset board
    function resetBoard() {
        board = [   0, 0, 0,
                    0, 0, 0,
                    0, 0, 0 ];
    }

    // start Game
    function startGame() {
        resetBoard();
        hideOptions(true);
        drawBoard();
    }


    // clear uptill here(human_art_isX = null (except))

    // @name - canvas.getBoundingClientRect()
    // @desc - Give details about where the canvas is on the screen exactly via 8 properties
    // usually constant, but gets affected with scrolling(top), shrinking the screen(top and left)


    let recent = Date.now();
    // mouse event handelrs
    $(canvas).on('mousedown', function(evt) {
        if(!gameRunning || !isHumanTurn) return;

        //@desc : mouse event handlers
        //enter only if its human's turn

        isHumanTurn = false;

        var rect = canvas.getBoundingClientRect();

        var xpos = Math.floor((evt.clientX - rect.left) / (width/3)) ;
        var ypos = Math.floor((evt.clientY - rect.top) / (height/3));

        //@issue -> The cricle isn't drawn at all if xpos and ypos aren't accurate as integers
        var completed = drawHumanAt(xpos,ypos);
        // console.log("Is completed", completed);

        let end = Date.now()
        humanTime.text(`For the last move human took ${end - recent} ms`);
        recent = end;
        // after Human has played
        if(completed) {

            let start = Date.now();

            let response = MachinePlay();

            response.then(() => {
                let end = Date.now();
                
                // in ms
                agentTime.text(`For the last Move Agent took ${end - start} ms`);
            })
        } else {
            isHumanTurn = true
        }
    });


    // 
    function checkRoutineGameStatus() {

        // check if all are filled
        var humanWon = false;
        var AIWon = false;
        isVacent = false;
        for(var i=0;i<board.length;i++) {
            if(board[i] == 0) {
                isVacent = true;
            }
        }

        // check for rows
        for(var i=0;i<board.length;i+=3) {
            var rowsum = board[i] + board[i+1] + board[i+2];
            if(rowsum == 3) {
                AIWon = true;
            } else if(rowsum == -3) {
                humanWon = true;
            }
        }

        // check cols
        for(var i=0;i<3;i++) {
            var colsum = board[i] + board[i+3] + board[i+6];
            if(colsum == 3) {
                AIWon = true;
            } else if(colsum == -3) {
                humanWon = true;
            }
        }

        // check digonals
        var sum_ld = board[0] + board[4] + board[8]
         if(sum_ld == 3) {
            AIWon = true;
        } else if(sum_ld == -3) {
            humanWon = true;
        }

        var sum_rd = board[2] + board[4] + board[6]
        if(sum_rd == 3) {
            AIWon = true;
        } else if(sum_rd == -3) {
            humanWon = true;
        }

        if(AIWon) {
            status.text("Agent Won!");
            gameRunning = false;
            hideOptions(false);
            return false;
        } else if(humanWon) {
            status.text("You Won!");
            gameRunning = false;
            hideOptions(false);
            return false;
        } else if(!isVacent) {
            status.text("Draw!");
            gameRunning = false;
            hideOptions(false);
            return false;
        } else {
            return true;
        }

    } 

    //@deltas distance relative to the canvas, x -> from top left to right,
    //y from top left to down

    // detla's
    var xdelta = 15 
    var ydelta = -15

    // drawHuman
    function drawHumanAt(xpos,ypos) {
        if(human_art_isX) {
            return drawAt('X',xpos,ypos,-1);
        } else {
            return drawAt('O',xpos,ypos,-1);
        }
    }

    // (0,0) (1,0) (2,0)
    // (0,1) (1,1) (2,1)
    // (0,2) (1,2) (2,2)
    // Inputs Must be given accordingly

    // draw art at 
    function drawAt(character , xpos , ypos, player) {
        // console.log("The execution is here");
        var index = xpos + ypos*3;
        // console.log("index is ", index)
        if(board[index] == 0) {
            board[index] = player;
            ctx.font = "100px Arial";
            ctx.fillText(character, (xpos ) * (width / 3) + xdelta, (ypos+1) * (height / 3) + ydelta );
        } else {
            return false;
        }

        return checkRoutineGameStatus();
    }


    // initialize the game
    function init() {
        clearBoard();
        drawBoard();
        hideOptions(false);
    }
    init();


    //@jquerymagic, $('input[name=art]:checked').val() to access the value from the radio buttons
    //@human_btn , @ai_btn : Two Case Handlers, Human Plays First or AI plays first

    //Triggered if Human Plays first
    // 'you play first' button click
    human_btn.on('click',function(e) {
        var human_art = $('input[name=art]:checked').val();

        if(human_art == 'X')
            human_art_isX = true;
        else
            human_art_isX = false;
        
        hideOptions();
        clearBoard();
        resetBoard();
        drawBoard();
        isHumanTurn = true;
        gameRunning = true;
        status.text("")
        agentTime.text("");
        humanTime.text("");

    });


    //Triggered if AI has to play first
    // AI button on click
    ai_btn.on('click',function() {
        var human_art = $('input[name=art]:checked').val();
        if(human_art == 'X')
            human_art_isX = true;
        else
            human_art_isX = false;
        
        hideOptions();
        resetBoard();
        clearBoard();
        drawBoard();
        isHumanTurn = false;
        gameRunning = true;
        status.text("")
        agentTime.text("");
        humanTime.text("");


        let start = Date.now();
        let response = MachinePlay();
        // console.log(`response returned by machineplay ${response}`);


        response.then(() => {
            let end = Date.now();
            // console.log(`(1st )Execution took ${execution} ms`);
            agentTime.text(`For the last Move Agent took ${end - start} ms`);
        })
    });

    function makeRequest(){

        let predictedX;
        let predictedY;

        return new Promise((resolve, reject) => {
            $.ajax({
                type: 'POST',
                url: "/api/minimax",
                data: JSON.stringify({'data': board}),
                dataType: "json",
                contentType: "application/json",
                success: function(data) {
                    //Here the returned row and col are reverse for printing
    
                   xpos = data['col']
                   ypos = data['row']
    
                //    console.log("Machine suggests to play at row", xpos, "and col is ", ypos)
                    
                    if(human_art_isX) {
                         drawAt('O',xpos,ypos,1);
                    } else {
                        drawAt('X',xpos,ypos,1);
                    }
                    isHumanTurn = true;
                    predictedX = xpos;
                    predictedY = ypos;
                    // console.log(`inside make request x = ${predictedX}, y = ${predictedY}`);
            
                    resolve({
                        x: predictedX,
                        y:predictedY
                    });

                }

            });   
        })
    }

    // let the machine play
    async function MachinePlay() {
        // console.log("MAchine play now");
        try {
            // console.log("before making request");
            const response = await makeRequest();
            // console.log("After making request");
            
        } catch (error) {
            console.log("Error happened while making a request to the Min-Max function");
        }

    }
});

