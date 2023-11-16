from lexic.lexic_analyzer import Lexic
from syntatic.syntatic_analyzer import Syntatic



class Compiler:

    def __init__(self, code):
        self.code = code
        self.tokes = []

    
    def compile(self):
        lexic_analyzer = Lexic(self.code)
        lexic_analyzer.lexic()
        syntatic_analyzer = Syntatic(lexic_analyzer.token_list)
        syntatic_analyzer.analyze()
        # Prints the token list
        print("Tokens:")
        for token in lexic_analyzer.token_list:
            print(token)