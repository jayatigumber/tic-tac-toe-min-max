
#Global Definations
human = -1
ai = 1
empty = 0

# human = 'o'
# ai = 'x'
# empty = '_'

"""
--------------
Specifications
--------------
Human : Minimizing Player
AI : Maximizing Player

AI_1 : Maximizing Player
AI_2 : Minimizing Player

"""


def isMovesLeft(board):

    for i in range(3):
        for j in range(3):
            if(board[i][j] == empty):
                return True

    return False            

#Utility Function -> assigning utility to a particular state
def evaluate(board):

    #Check all rows combinations for victory.
    for row in range(3):
        if(board[row][0] == board[row][1] and board[row][1] == board[row][2]):

            #if AI won
            if(board[row][0] == ai):
                return +10
            #if human won    
            elif(board[row][0] == human):
                return -10

    #Check all Columns combinations for victory.
    for col in range(3):
        if(board[0][col] == board[1][col] and board[1][col] == board[2][col]):

            if(board[0][col] == ai):
                return +10
            elif(board[0][col] == human):
                return -10

    #Checking for Diagonals for X or O victory. 
    #left diagonal
    if(board[0][0] == board[1][1] and board[1][1] == board[2][2]):

        if(board[0][0] == ai):
            return +10
        elif(board[0][0] == human):
            return -10

    #right diagonal
    if(board[0][2] == board[1][1] and board[1][1] == board[2][0]):

        if(board[0][2] == ai):
            return +10
        elif(board[0][2] == human):
            return -10


    #if none of them have won return 0
    return 0




"""

@method : minimax
@Params : board - The 3X3 Matrix Tic Tac Toe Board
@Params : depth - Use1 - To make the AI smarter to give the moves which win quickly higher utility value
                  and moves that win but takes more number of moves a lower utility value(Maximizing side)
                  If loosing then Prolong the game as long as possible

                  Use2 - In games with high no. of search states eg. chess depth can be used to limit the 
                  depth of the search space
                  
                    

"""

#This is the minimax function. It considers all
#he possible ways the game can go and returns
#the value of the board   


def minimax(board, depth, isMax):

    # print("The board is ", board, "and the depth is", depth)

    #Base Cases for recursive functions
    score = evaluate(board)

    #if maximizer won return his score(Choose the quickest win)
    if(score == 10):
        return score - depth

    #if minimizer won return his score(Choose the quickest win or the longest draw)
    if(score == -10):
        return score + depth

    #If there are no more moves and no winner then
    #it is a tie  
    if(isMovesLeft(board) == False):
        return 0

    #If this maximizer's move
    if(isMax):
        best = -1000

        #Trverse all cells
        for i in range(3):
            for j in range(3):

                #Check if Cell is empty
                if(board[i][j] == empty):
                    board[i][j] = ai

                    #Call the Minimax Function recursively and
                    #Choose the  Best value out of oponents moves
                    best = max(best, minimax(board, depth + 1, not isMax))


                    #Undo the Move
                    board[i][j] = empty

        return best

    #if this is minimizers move
    else:

        best = 1000

        for i in range(3):
            for j in range(3):

                if(board[i][j] == empty):
                    board[i][j] = human

                    best = min(best, minimax(board, depth + 1, not isMax))

                    board[i][j] = empty
        return best         



"""
@method : findBestMove_player1
@params : board
@desc : Takes current position of the board and returns the best possible move for the current player

@usage : Used when there is a (Human, AI) agents and (AI, AI) agents

"""


# Return the best move possible for the given configuration
#For Minimizing Player
def findBestMove_player1(board):
    bestValue = -1000
    bestMove = {
        "row": -1,
        "col": -1
    }

    #Traversing all cells, Evaluating minimax for all empty cells
    # and return the one with the most optimal value(max)
    for i in range(3):
        for j in range(3):

            if(board[i][j] == empty):

                board[i][j] = ai

                #Calculate minimax for current move while Minimizing the opponent's utility
                moveValue = minimax(board, 0, False)


                board[i][j] = empty

                if(moveValue > bestValue):
                    bestMove["row"] = i
                    bestMove["col"] = j
                    bestValue = moveValue

    print("The value of best move is ", bestValue)
    return bestMove

"""
@method : findBestMove_player2
@params : board
@desc : Takes current position of the board and returns the best possible move for the current player

@usage : Used when there is a (AI, AI) agents to suggest moves for the other AI_2
         Then AI_1 -> -1,   AI_2 -> 1 on chess boards

@context : Each AI player would be having a Minimax Game Tree where one player would be trying to
           Maximizing its utility to win and the opponent Minimizing its own(from the root) to win

           Maximizing Player/AI_1 -> Maximizing its own utility(To win) and Minimizing opponents(Choosing best possible moves for its opponent)
           Minimizing Player/AI_2 -> Minimizing its own utility(To win) and Maximizing opponents(Choosing best possible moves for its opponent)

"""

def findBestMove_player2(board):
    bestValue = 1000
    bestMove = {
        "row": -1,
        "col": -1
    }

    #Traversing all cells, Evaluating minimax for all empty cells
    # and return the one with the most optimal value(minimum)
    for i in range(3):
        for j in range(3):

            if(board[i][j] == empty):

                board[i][j] = human

                #Calculate minimax for current move while Maximizing the opponent's utility
                moveValue = minimax(board, 0, True)


                board[i][j] = empty

                if(moveValue < bestValue):
                    bestMove["row"] = i
                    bestMove["col"] = j
                    bestValue = moveValue

    print("The value of best move is ", bestValue)
    return bestMove



if __name__ == "__main__":
    
    board = [
        [1, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ]

    print(findBestMove_player1(board))

    #Errors if board is full
    #it is the maximizing player turn
    # while(isMovesLeft(board) != False):
    #     player1 = findBestMove_player1(board)
    #     board[player1["row"]][player1["col"]] = 1
        
    #     print("After Player 1", board)
    #     player2 = findBestMove_player2(board)
    #     board[player2["row"]][player2["col"]] = -1
    #     print("After Player2 ", board)
        



























                   



                    


    

                




    

