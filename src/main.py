from lexic.lexic_analyzer import Lexic
from syntatic.syntatic_analyzer import Syntatic
# from lexical.token import Token

# Define sample code snippets for testing the lexer
exemplos = {
    "exemplo1": 'a = 1\nb = 12\nc = (12+"xxx"3) 2xas_a=w#as dc  "sss" s', 
    "exemplo2": "inicio\n    z = -1234\nfim", 
    "exemplo3": "teste = 1+2 -3 *\n\n40/5 ^ 6 %\n\n\n987", 
    "exemplo4": 'se "oioi" abc <> xyz entao\ninicio  "oioi"\n   x=(verdade)\n   y= ler ( )\nfim', 
    "exemplo5": 'programa "cores":\n inicio'
}

# Select one of the samples for processing
code1 = exemplos["exemplo1"]

# Read the code from the file
with open('src/syntatic/test/example2.w', 'r') as file:
    code = file.read()


# print(code)

# Create an instance of the Lexic class
lexic_analyzer = Lexic(code)

# Process the code using the lexic method
lexic_analyzer.lexic()

# Print the resulting tokens
# print(lexic_analyzer.token_list)
syntatic_analyzer = Syntatic(lexic_analyzer.token_list)
syntatic_analyzer.analyze()
# print(analyzer.token_list)
