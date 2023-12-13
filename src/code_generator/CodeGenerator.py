import re

class CodeGenerator:

    def __init__(self, tree):
        self.tree = tree
        self.code = ""
        self.indent = - 1
        self.indent_str = "    "
        self.var_sum = 0
        self.var_mul = 0
        self.var_pow = 0
        self.var_minus = 0
        self.var_qtd = 0
        self.imgs = []
        self.audios = []

    
    def generate(self):

        self.code += "import math\n"
        self.code += "import time\n"
        self.code += "import pygame\n"
        self.code += "pygame.init()\n"
        self.code += "pygame.mixer.init()\n"
        self.code += "width, height = 800, 600\n"
        self.code += "screen = pygame.display.set_mode((width, height))\n"
        self.code += f"pygame.display.set_caption('{self.tree.get('nome')}')\n"

        self.visitarParams()

        self.funcs()

        self.visitarBlock(self.tree.get("bloco"))

        self.indent += 1
        self.code += "pygame.quit()\n"

        return self.code
    
    def funcs(self):
        self.indent += 1
        self.code += "\n\n"
        self.code += "def play_audio(audio):\n"
        self.indent += 1
        self.code += f"{self.indent_str * self.indent}audio.play()\n"
        self.indent -= 1

        self.code += "\n\n"
        self.code += "def show_image(image):\n"
        self.indent += 1
        self.code += f"{self.indent_str * self.indent}screen.fill((0, 0, 0))\n"
        self.code += f"{self.indent_str * self.indent}screen.blit(image, (300, 200))\n\n"
        self.code += f"{self.indent_str * self.indent}pygame.display.flip()\n"
        self.indent -= 2


    def visitarParams(self):
        self.indent += 1
        self.code += "\n\n"
        self.code += "img = {1: pygame.image.load('src/pygame/1.jpg'), 2: pygame.image.load('src/pygame/2.jpg') }\n"
        self.code += "audio = {1: pygame.mixer.Sound('src/pygame/1.mp3')}\n"
        self.indent -= 1

    def visitarBlock(self, block):
        self.indent += 1

        listaAtribuicao = block.get("listaAtribuicao")

        while listaAtribuicao:
            atribuicao = listaAtribuicao.get("atribuicao")

            if atribuicao.op == "atribuicao":
                id_token = atribuicao.get("id")
                if atribuicao.get("expression"):
                    expression = atribuicao.get("expression")
                    exp = self.visitarExpression(expression)
                    self.code += f"{self.indent_str * self.indent}{id_token.value} = {exp}\n"


                elif atribuicao.get("inStatement"):
                    id_token = atribuicao.get("id")
                    if atribuicao.get("inStatement").op == "ler":
                        self.code += f"{self.indent_str * self.indent}{id_token.value} = 0\n"
                        self.code += f"{self.indent_str * self.indent}running = True\n"
                        self.code += f"{self.indent_str * self.indent}while running:\n"
                        self.indent += 1
                        self.code += f"{self.indent_str * self.indent}for event in pygame.event.get():\n"
                        self.indent += 1
                        self.code += f"{self.indent_str * self.indent}if event.type == pygame.KEYDOWN:\n"
                        self.indent += 1
                        self.code += f"{self.indent_str * self.indent}{id_token.value} = event.key\n"
                        self.code += f"{self.indent_str * self.indent}running = False\n"
                        self.indent -= 3
                    else:
                        print(atribuicao.get("inStatement"))
                        quad = self.visitarSumExpression(atribuicao.get("inStatement").get("param1"))
                        qtd = self.visitarSumExpression(atribuicao.get("inStatement").get("param2"))
                        tol = self.visitarSumExpression(atribuicao.get("inStatement").get("param3"))
                        self.code += f"{self.indent_str * self.indent}quad_cont{self.var_qtd} = 0\n"
                        self.code += f"{self.indent_str * self.indent}tol_cont{self.var_qtd} = 0\n"
                        self.code += f"{self.indent_str * self.indent}{id_token.value} = False\n"
                        self.code += f"{self.indent_str * self.indent}running = True\n"
                        self.code += f"{self.indent_str * self.indent}while running:\n"
                        self.indent += 1
                        self.code += f"{self.indent_str * self.indent}for event in pygame.event.get():\n"
                        self.indent += 1
                        self.code += f"{self.indent_str * self.indent}if event.type == pygame.KEYDOWN:\n"
                        self.indent += 1
                        self.code += f"{self.indent_str * self.indent}if event.key == {quad}:\n"
                        self.indent += 1
                        self.code += f"{self.indent_str * self.indent}quad_cont{self.var_qtd} += 1\n"
                        self.indent -= 1
                        self.code += f"{self.indent_str * self.indent}else:\n"
                        self.indent += 1
                        self.code += f"{self.indent_str * self.indent}tol_cont{self.var_qtd} += 1\n"
                        self.indent -= 1
                        self.code += f"{self.indent_str * self.indent}if quad_cont{self.var_qtd} == {qtd}:\n"
                        self.indent += 1
                        self.code += f"{self.indent_str * self.indent}{id_token.value} = True\n"
                        self.code += f"{self.indent_str * self.indent}running = False\n"
                        self.indent -= 1
                        self.code += f"{self.indent_str * self.indent}elif tol_cont{self.var_qtd} == {tol}:\n"
                        self.indent += 1
                        self.code += f"{self.indent_str * self.indent}running = False\n"
                        self.indent -= 1
                        self.var_qtd += 1



            elif atribuicao.op == "esperar":
                exp_param = self.visitarSumExpression(atribuicao.get("param"))
                self.code += f"{self.indent_str * self.indent}time.sleep({exp_param})\n"

            elif atribuicao.op == "mostrar":
                exp = self.visitarSumExpression(atribuicao.get("param"))

                self.code += f'{self.indent_str * self.indent}show_image(img[{exp}])\n'
                self.code += f'{self.indent_str * self.indent}time.sleep(1)\n'


            elif atribuicao.op == "tocar":
                exp = self.visitarSumExpression(atribuicao.get("param"))
                self.code += f"{self.indent_str * self.indent}play_audio(audio[{exp}])\n"
                self.code += f'{self.indent_str * self.indent}time.sleep(1)\n'


            elif atribuicao.op == "mostrar_tocar":
                param1 = self.visitarSumExpression(atribuicao.get("param1"))
                param2 = self.visitarSumExpression(atribuicao.get("param2"))
                self.code += f'{self.indent_str * self.indent}show_image(img[{param1}])\n'
                self.code += f'{self.indent_str * self.indent}play_audio(audio[{param2}])\n'
                self.code += f'{self.indent_str * self.indent}time.sleep(1)\n'

            elif atribuicao.op == "ifStatement":
                exp = self.visitarExpression(atribuicao.get("expression"))
                self.code += f"{self.indent_str * self.indent}if {exp}:\n"
                self.visitarBlock(atribuicao.get("entao"))
                if atribuicao.get("senao"):
                    self.code += f"{self.indent_str * self.indent}else:\n"
                    self.visitarBlock(atribuicao.get("senao"))


            elif atribuicao.op == "whileStatement":
                # print(atribuicao)
                exp = self.visitarExpression(atribuicao.get("expression"))
                self.code += f"{self.indent_str * self.indent}while {exp}:\n"
                self.visitarBlock(atribuicao.get("faca"))


            
            listaAtribuicao = listaAtribuicao.get("prox")

        self.indent -= 1

    def visitarExpression(self, expression):
        E = self.visitarSumExpression(expression.get("esquerda"))

        if expression.get("oper"):
            D = self.visitarSumExpression(expression.get("direita"))
            op = expression.get("oper")
            if op == "<>":
                op = "!="
            self.code += f"{self.indent*self.indent_str}_TEMP_VAR_REL = {E} {op} {D}\n"
            return "_TEMP_VAR_REL"
        else:
            return E
        
    def visitarSumExpression(self, no):
        
        if no:
            val1 = self.visitarSumExpression(no.get("esquerda"))
            val2 = self.visitarSumExpression(no.get("direita"))

            if no.op == "sumExpression":

                if no.get("oper") == "ou":
                    self.code += f"{self.indent*self.indent_str}_TEMP_VAR_SUM{self.var_sum} = {val1} or {val2}\n"
                    self.var_sum += 1
                    return f"_TEMP_VAR_SUM{self.var_sum - 1}"

                else:
                    self.code += f"{self.indent*self.indent_str}_TEMP_VAR_SUM{self.var_sum} = {val1} {no.get('oper')} {val2}\n"
                    self.var_sum += 1   
                    return f"_TEMP_VAR_SUM{self.var_sum - 1}"
            

            elif no.op == "multiplicativeTerm":
                    
                # print("oi")

                if no.get("oper") == "e":
                
                    self.code += f"{self.indent*self.indent_str}_TEMP_VAR_MUL{self.var_mul} = {val1} and {val2}\n"
                    self.var_mul += 1
                    return f"_TEMP_VAR_MUL{self.var_mul - 1}"
                
                else:
                    print()
                    self.code += f"{self.indent*self.indent_str}_TEMP_VAR_MUL{self.var_mul} = {val1} {no.get('oper')} {val2}\n"
                    self.var_mul += 1
                    return f"_TEMP_VAR_MUL{self.var_mul - 1}"
                
                
            elif no.op == "powerTerm":
                self.code += f"{self.indent*self.indent_str}_TEMP_VAR_POW{self.var_pow} = {val1} ** {val2}\n"
                self.var_pow += 1
                return f"_TEMP_VAR_POW{self.var_pow - 1}"
            

            elif no.op == "factor" and not no.get("expression"):
                factor = no.get("factor")

                if no.get("sinal") == "-":
                    self.code += f"{self.indent*self.indent_str}_TEMP_VAR_MINUS{self.var_minus} = - {factor.value}\n"
                    self.var_minus += 1
                    return f"_TEMP_VAR_MINUS{self.var_minus - 1}"
                
                else:
                    if factor.value == "verdade":
                        return "True"
                    elif factor.value == "falso":
                        return "False"
                    else:
                        return str(factor.value)
                

            elif no.op == "factor" and no.get("expression"):
                sinal = no.get("sinal")
                if sinal == "-":
                    temp = self.visitarExpression(no.get("expression"))
                    self.code += f"{self.indent*self.indent_str}_TEMP_VAR_MINUS{self.var_minus} = - {temp}\n"
                    self.var_minus += 1
                    return f"_TEMP_VAR_MINUS{self.var_minus - 1}"
                else:
                    return self.visitarExpression(no.get("expression"))