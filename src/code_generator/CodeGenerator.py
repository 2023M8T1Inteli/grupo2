

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

    
    def generate(self):

        self.code += "import math\n"
        self.code += "import time\n"
        self.code += f"\n# Código gerado a partir do programa \"{self.tree.get('nome')}\"\n"
        self.visitarBlock(self.tree.get("bloco"))

        # print(self.code)
        return self.code
    
    def visitarBlock(self, block):
        self.indent += 1

        listaAtribuicao = block.get("listaAtribuicao")

        while listaAtribuicao:
            atribuicao = listaAtribuicao.get("atribuicao")

            if atribuicao.op == "atribuicao":
                id_token = atribuicao.get("id")
                expression = atribuicao.get("expression")
                exp = self.visitarExpression(expression)
                self.code += f"{self.indent_str * self.indent}{id_token.value} = {exp}\n"

            listaAtribuicao = listaAtribuicao.get("prox")

        self.indent -= 1

    def visitarExpression(self, expression):
        E = self.visitarSumExpression(expression.get("esquerda"))

        if expression.get("oper"):
            D = self.visitarSumExpression(expression.get("direita"))
            op = expression.get("oper")
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