from token import Token
from analyzer import Analyzer


exemplos = {"exemplo1": "a = 1\nb = 12\nc = (12+3)", 
            "exemplo2": "inicio\n    z = -1234\nfim", 
            "exemplo3": "teste = 1+2 -3 *\n\n40/5 ^ 6 %\n\n\n987", 
            "exemplo4": "se abc <> xyz entao\ninicio\n   x=(verdade)\n   y= ler ( )\nfim", 
            "exemplo5": "programa :\ninicio\n    /*programas = verdade\n  \n  verdades = 0\n  se entao inicio\n*/$       ses = verdades\n       programas = ler()\n     x = ler_varios(11, 4, 1)\n  fim\n\nfim."
            }

code = exemplos["exemplo5"]

exemplo_teste = '/*adsadasdsa mostrar \n senao sddas 124 "#"\n*/'

analyzer = Analyzer(code)
analyzer.lexic()
print(analyzer.token_list)

