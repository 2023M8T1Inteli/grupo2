from token import Token
from analyzer import Analyzer

# Define sample code snippets for testing the lexer
exemplos = {
    "exemplo1": "a = 1\nb = 12\nc = (12+3)", 
    "exemplo2": "inicio\n    z = -1234\nfim", 
    "exemplo3": "teste = 1+2 -3 *\n\n40/5 ^ 6 %\n\n\n987", 
    "exemplo4": "se abc <> xyz entao\ninicio\n   x=(verdade)\n   y= ler ( )\nfim", 
    "exemplo5": "programa :\ninicio\n    /*programas = verdade\n  \n  verdades = 0\n  se entao inicio\n*/      ses = verdades\n       programas = ler()\n     x = ler_varios(11, 4, 1)\n  fim\n\nfim."
}

# Select one of the samples for processing
code = exemplos["exemplo4"]

# Create an instance of the Analyzer class
analyzer = Analyzer(code)

# Process the code using the lexic method
analyzer.lexic()

# Print the resulting tokens
print(analyzer.token_list)
