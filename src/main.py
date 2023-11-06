from lexical.analyzer import Analyzer
# from lexical.token import Token

# Define sample code snippets for testing the lexer
exemplos = {
    "exemplo1": 'a = 1\nb = 12\nc = (12+"xxx"3) 2xas_a=was dc  "sss" s', 
    "exemplo2": "inicio\n    z = -1234\nfim", 
    "exemplo3": "teste = 1+2 -3 *\n\n40/5 ^ 6 %\n\n\n987", 
    "exemplo4": 'se "oioi" abc <> xyz entao\ninicio  "oioi"\n   x=(verdade)\n   y= ler ( )\nfim', 
    "exemplo5": 'programa "cores":\n inicio'
}

# Select one of the samples for processing
code1 = exemplos["exemplo4"]

# Read the code from the file
with open('./lexical/test/example1.w', 'r') as file:
    code = file.read()


# print(code)

# Create an instance of the Analyzer class
analyzer = Analyzer(code)

# Process the code using the lexic method
analyzer.lexic()

# Print the resulting tokens
print(analyzer.token_list)
