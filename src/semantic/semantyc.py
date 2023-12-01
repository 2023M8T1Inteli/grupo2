from semantic.table import NoTabela
from syntatic.TreeGenerator import NoInterno, NoFolha

class SemanticException(Exception):
    pass

class AnalisadorSemantico:
    
    def __init__(self, arvoreSintatica):
        self.arvore = arvoreSintatica
        self.tabela = {}
    
    def analisar(self):
        self.visitarAlg(self.arvore)
    
    def visitarAlg(self, no):
        print("arvore: " + str(self.arvore))    

        nome_programa = no.get("nome")
        self.tabela[nome_programa] = NoTabela(None, "alg")
        self.visitarDeclarations(no.get("bloco"))
        self.visitarBlock(no.get("bloco"))
    
    def visitarDeclarations(self, noDeclarations):
        declarations = noDeclarations.get("listaAtribuicao")
        while declarations:
            declaration = declarations.get("atribuicao")
            self.visitarVarDeclaration(declaration)
            declarations = declarations.get("prox")
    
    def visitarVarDeclaration(self, noVarDeclaration):
        nome_id = noVarDeclaration.get("id")
        expression = noVarDeclaration.get("op")
        if expression == "atribuicao":
            tokid = noVarDeclaration.get("id")
            if tokid.value not in self.tabela:
                raise SemanticException(f"O identificador '{tokid}' na linha {nome_id.line} não foi declarado")
            self.tabela[nome_id.value] = NoTabela(None, self.tabela[tokid.value].tipo)
        elif expression == "sumExpression":
            if noVarDeclaration.get("id").tipo == "ID":
                if noVarDeclaration.get("id").value not in self.tabela:
                    raise SemanticException(f"O identificador '{noVarDeclaration.get('id').value}' na linha {nome_id.line} não foi declarado")
                self.tabela[nome_id.value] = NoTabela(None, noVarDeclaration.get("id").tipo)


    def visitarBlock(self, noBlock):
        statement = noBlock.get("listaAtribuicao")
        while statement:
            if statement.op == "atribuicao":
                id_node = statement.get("id")

                if statement.get('valor').op == "ID" and statement.get('valor').value not in self.tabela:
                    raise SemanticException(f"O identificador '{statement.get('valor').value}' na linha {id_node.line} não foi declarado")

                expression_node = statement.get("valor")
                if expression_node:
                    tipo_id = self.tabela[id_node.value].tipo
                    tipo_expression = self.visitarExpression(expression_node).tipo

                    if tipo_id != tipo_expression:
                        raise SemanticException(f"O identificador '{id_node.get('value')}' na linha {id_node.get('line')} não pode receber uma expressão do tipo '{tipo_expression}'")

                    self.tabela[id_node.get("value")].value = id_node.get("value")

            elif statement.get("op") == "mostrar":
                expression_node = statement.get("param")
                self.visitarExpression(expression_node)

            elif statement.get("op") == "se":
                block_if = statement.get("entao")
                self.visitarBlock(block_if)
                block_else = statement.get("senao")
                if block_else:
                    self.visitarBlock(block_else)
    
    def visitarExpression(self, noExpression):
        print("noExpression: " + str(noExpression.op))

        esq_node = noExpression.get("esquerda")

        if not esq_node.get("oper"):
            return self.visitarSumExpression(esq_node)
        
        else:

            esq_node = noExpression.get("esquerda")
            dir_node = noExpression.get("direita")
            self.visitarSumExpression(dir_node)
            return NoTabela(None, "log")
        
        
    def visitarSumExpression(self, no):
        if no is not None:
            if no.get("esquerda"):
                val1 = self.visitarSumExpression(no.get("esquerda"))
                val2 = self.visitarSumExpression(no.get("direita"))

                if no.op in ("sumExpression", "multiplicativeTerm", "powerTerm"):
                    if val1.tipo != val2.tipo:
                        raise SemanticException(f"Tipos incompatíveis: {no.get('esquerda').get('factor').valor} e {no.get('direita').get('factor').valor}")

                    if no.op == ":" and val2.tipo == "num" and val2.value == "0":
                        raise SemanticException(f"Divisão por zero na linha {no.get('line')}")

                    if no.op == "^" and val2.tipo == "num" and int(val2.value) < 0:
                        raise SemanticException(f"Expoente negativo na linha {no.get('line')}")

                    return val1 if val1 else val2

                elif no.op == "factor" and not no.get("expression"):
                    if no.op == "ID":
                        identificador = no.get("value")
                        if identificador not in self.tabela:
                            raise SemanticException(f"O identificador '{identificador}' na linha {no.get('line')} não foi declarado")
                        elif self.tabela[identificador].value is None:
                            raise SemanticException(f"O identificador '{identificador}' na linha {no.get('line')} não foi inicializado")
                        else:
                            return NoTabela(value=self.tabela[identificador].value, tipo=self.tabela[identificador].tipo)

                    elif no.op == "BOOLEAN":
                        return NoTabela(value=no.get("value"), tipo="log")

                    elif no.op == "INTEGER":
                        valor = no.get("value")
                        valor_com_sinal = valor if valor >= 0 else f"-{abs(valor)}"
                        return NoTabela(value=valor_com_sinal, tipo="num")

                elif no.op == "factor" and no.get("expression"):
                    return self.visitarExpression(no.get("expression"))
        

    def print_tabela(self):
        print(self.tabela)