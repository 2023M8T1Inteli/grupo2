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
        nome_programa = no.get("nome")
        self.tabela[nome_programa] = NoTabela(None, "alg")
        self.visitarDeclarations(no.get("bloco"))
        self.visitarBlock(no.get("bloco"))
    
    def visitarDeclarations(self, noDeclarations):
        for declaracao in noDeclarations.get("listaAtribuicao"):
            self.visitarVarDeclaration(declaracao)
    
    def visitarVarDeclaration(self, noVarDeclaration):
        nome_id = noVarDeclaration.get("id")
        tipo = noVarDeclaration.get("valor")
        if nome_id in self.tabela:
            raise SemanticException(f"O identificador '{nome_id}' na linha {noVarDeclaration.get('id').line} foi declarado anteriormente")
        self.tabela[nome_id] = NoTabela(None, tipo)
    
    def visitarBlock(self, noBlock):
        for statement in noBlock.get("listaAtribuicao"):
            if statement.get("op") == "atribuicao":
                id_node = statement.get("id")
                if id_node.get("value") not in self.tabela:
                    raise SemanticException(f"O identificador '{id_node.get('value')}' na linha {id_node.get('line')} não foi declarado")

                expression_node = statement.get("valor")
                if expression_node:
                    tipo_id = self.tabela[id_node.get("value")].tipo
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
        esq_node = noExpression.get("esquerda")
        if not esq_node.get("oper"):
            return self.visitarSumExpression(esq_node)
        else:
            dir_node = noExpression.get("direita")
            self.visitarSumExpression(dir_node)
            return NoTabela(None, "log")
    
    def visitarSumExpression(self, no):
        if no is not None:
            val1 = self.visitarSumExpression(no.get("esquerda"))
            val2 = self.visitarSumExpression(no.get("direita"))

            if no.op in ("sumExpression", "multiplicativeTerm", "powerTerm"):
                if val1.tipo != val2.tipo:
                    raise SemanticException(f"Tipos incompatíveis: {val1.tipo} e {val2.tipo}")

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