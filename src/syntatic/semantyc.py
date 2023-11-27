from syntatic.TreeGenerator import NoTabela

class SemanticException(Exception):
    """
    Represents a semantic error.
    Inherits from the base Exception class.
    """
    pass

class AnalisadorSemantico:
    
    def __init__(self, arvoreSintatica):
        self.arvore = arvoreSintatica
        self.tabela = {}
    
    def analisar(self):
        self.visitarAlg(self.arvore)
    
    def visitarAlg(self, no):
        nome_programa = no.get("nome")
        self.tabela[nome_programa] = NoTabela(None, "alg")
        self.visitarDeclarations(no.get("bloco"))
    
    def visitarDeclarations(self, noDeclarations):
        for declaracao in noDeclarations.get("listaAtribuicao"):
            self.visitarVarDeclaration(declaracao)
    
    def visitarVarDeclaration(self, noVarDeclaration):
        nome_id = noVarDeclaration.get("id")
        tipo = noVarDeclaration.get("valor")
        if nome_id in self.tabela:
            raise SemanticException(f"O identificador '{nome_id}' na linha {noVarDeclaration.id.line} foi declarado anteriormente")
        self.tabela[nome_id] = NoTabela(None, tipo)
    
    def visitarBlock(self, noBlock):
        for statement in noBlock.listaAtribuicao:
            if statement.op == "assignStatement":
                id_node = statement.id
                if id_node.value not in self.tabela:
                    raise SemanticException(f"O identificador '{id_node.value}' na linha {id_node.line} não foi declarado")

                expression_node = statement.valor
                if expression_node:
                    tipo_id = self.tabela[id_node.value].tipo
                    tipo_expression = self.visitarExpression(expression_node).tipo

                    if tipo_id != tipo_expression:
                        raise SemanticException(f"O identificador '{id_node.value}' na linha {id_node.line} não pode receber uma expressão do tipo '{tipo_expression}'")

                    self.tabela[id_node.value].value = id_node.value

            elif statement.op == "outStatement":
                expression_node = statement.param
                self.visitarExpression(expression_node)

            elif statement.op == "ifStatement":
                block_if = statement.entao
                self.visitarBlock(block_if)
                block_else = statement.senao
                if block_else:
                    self.visitarBlock(block_else)
    
    def visitarExpression(self, noExpression):
        if noExpression.op == "NAO":
            return self.visitarUnaria(noExpression)
        elif noExpression.op in ("ou", "e", ">", "=="):
            return self.visitarBinaria(noExpression)
        elif noExpression.op == "ID":
            identificador = noExpression.value
            if identificador not in self.tabela:
                raise SemanticException(f"O identificador '{identificador}' na linha {noExpression.line} não foi declarado")
            elif self.tabela[identificador].value is None:
                raise SemanticException(f"O identificador '{identificador}' na linha {noExpression.line} não foi inicializado")
            return NoTabela(value=self.tabela[identificador].value, tipo=self.tabela[identificador].tipo)
        elif noExpression.op in ("BOOLEAN", "INTEGER"):
            return NoTabela(value=noExpression.value, tipo=noExpression.op.lower())
    
    def visitarUnaria(self, no):
        if no.direita.op == "ID":
            identificador = no.direita.value
            if identificador not in self.tabela:
                raise SemanticException(f"O identificador '{identificador}' na linha {no.direita.line} não foi declarado")
            elif self.tabela[identificador].value is None:
                raise SemanticException(f"O identificador '{identificador}' na linha {no.direita.line} não foi inicializado")
            return NoTabela(value=self.tabela[identificador].value, tipo=self.tabela[identificador].tipo)
        elif no.direita.op in ("INTEGER", "BOOLEAN"):
            return NoTabela(value=no.direita.value, tipo=no.direita.op.lower())
    
    def visitarBinaria(self, no):
        val1 = self.visitarExpression(no.esquerda)
        val2 = self.visitarExpression(no.direita)

        if val1.tipo != val2.tipo:
            raise SemanticException(f"Tipos incompatíveis: {val1.tipo} e {val2.tipo} na linha {no.line}")

        if no.op == ":" and val2.tipo == "num" and val2.value == 0:
            raise SemanticException(f"Divisão por zero na linha {no.line}")

        if no.op == "^" and val2.tipo == "num" and val2.value < 0:
            raise SemanticException(f"Expoente negativo na linha {no.line}")

        return val1 if val1 else val2

    def print_tabela(self):
        print(self.tabela)