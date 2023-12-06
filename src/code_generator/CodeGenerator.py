

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
        self.code += f"\n# Código gerado a partir do programa \"{self.tree.get('nome')}\"\n"
        self.visitarBlock(self.tree.get("bloco"))
        return self.code
    
    def visitarBlock(self, block):
        self.indent += 1

        listaAtribuicao = block.get("listaAtribuicao")

        while listaAtribuicao:
            atribuicao = listaAtribuicao.get("atribuicao")

            if atribuicao.op == "atribuicao":
                id_token = atribuicao.get("id")
                expression = atribuicao.get("expression")
                self.code += f"{self.indent_str * self.indent}{id_token.value} = {self.visitarExpression(expression)}\n"

    
            listaAtribuicao = listaAtribuicao.get("prox")

        self.indent -= 1

    def visitarExpression(self, expression):
        E = self.visitarSumExpression(expression.get("esquerda"))

        if expression.get("oper"):
            pass