# tic-tac-toe-min-max

## About the game

In the Tic-Tac-Toe game, a player tries to ensure two cases:
* Maximize a player's own chances of win.
* Minimize opponent's chances of win.

Maximize profit: The profit can be maximized by either fork or win.
Fork: Initially player will create opportunity where he can win in two ways.
Win: If there are two same X or O in a row, then play the third to get three in a row.
Minimize Loss: The loss can be minimized by a block.
Block: If two 'X' or 'O' of the opponent are in a row then block it, or else block opponents fork.

## Algorithm Used

Min-max is a decision-making algorithm which uses decision theory, game theory, statistics and philosophy to calculate the optimal move. It is a two-player game. The mechanism evaluates minimum loss and maximum profit. This logic can also be extended to play more complicated game like chess, checkers etc.

## Flowchart

![Flowchart](/flowchart.png)

## Working Snapshots
![Working snapshots](/snapshot.PNG)

## Installation

Use the package manager [pip]() for Python3 to develop Tic Tac Toe on your local system and Install all its dependencies


```bash
pip install -r requirements.txt
```

## Usage

To Start the development Server run. Navigate to the assigned port on the terminal to open the app

```bash
python server.py
```
