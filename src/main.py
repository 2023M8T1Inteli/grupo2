from compiler.compiler import Compiler
import sys

# Read the code from the file passed as argument
with open(f'{sys.argv[1]}', 'r') as file:
    code = file.read()


analyser = Compiler(code)
analyser.compile()