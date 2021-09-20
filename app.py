# importing Flask
from flask import Flask, jsonify, render_template, request, send_from_directory
import os


import json
# import tic tac toe game minimax algorithm
import minimax

import numpy as np

app = Flask(__name__)

@app.route('/')
def index():
    print("I am here")
    return render_template('index.html')


#Added to bypass chrome default dev tools behaviour(Not a part of logic)
@app.route('/favicon.ico') 
def favicon(): 
    return send_from_directory(os.path.join(app.root_path, 'static'), 'favicon.ico', mimetype='image/vnd.microsoft.icon')

"""
@return : Returns an opbject/dictionary with predicted row and col
"""
def bestmove_minimax(input):
    #Here Either return the reverse row and col, or reverse it in JS
    #The second Approach is implemented
    return (minimax.findBestMove_player1(input))
    

@app.route('/api/minimax', methods=['POST'])
def minimax_api():
    print("The request is received")
    data = request.get_json()
    print('Previous data is', data)
    data = np.array(data['data'])
    print('after conveeting to np.array', data)
    data = data.reshape(3, 3)
    print("After Reshaping data is", data)
    data = data.tolist()
    return_row_col = bestmove_minimax(data)
    print(return_row_col)
    return return_row_col


      

if __name__ == '__main__':

    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0',port=port)

