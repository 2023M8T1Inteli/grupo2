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
        # print("arvore: " + str(self.arvore))    

        nome_programa = no.get("nome")
        self.tabela[nome_programa] = NoTabela(None, "alg")
        # self.visitarDeclarations(no.get("bloco"))
        self.visitarBloco(no.get("bloco"))
    
    def visitarBloco(self, bloco):
        # print("bloco: " + str(bloco.op))

        declaracoes = bloco.get("listaAtribuicao")
        while declaracoes:
            declaracao = declaracoes.get("atribuicao")

            ## ASSIGN STATEMENT
            if declaracao.op == "atribuicao":
                id_token = declaracao.get("id")
                if id_token.value not in self.tabela:
                    exp = self.visitarExpression(declaracao.get("expression"))
                    self.tabela[id_token.value] = NoTabela(exp.valor, exp.tipo)
                    
                else:
                    exp = self.visitarExpression(declaracao.get("expression"))
                    if self.tabela[id_token.value].tipo != exp.tipo:
                        raise SemanticException(f"Tipos incompatíveis: {id_token.value} e {exp.valor} na linha {id_token.line}")
                    else:
                        self.tabela[id_token.value].valor = exp.valor
                        

            declaracoes = declaracoes.get("prox")


    
    def visitarExpression(self, noExpression):

        # print("noExpression: " + str(noExpression.op))

        esq_node = noExpression.get("esquerda")

        if noExpression.get("oper"):
            self.visitarSumExpression(esq_node)
            dir_node = noExpression.get("direita")
            resultado = self.visitarSumExpression(dir_node)
            return NoTabela(resultado.value, "log")
        
        else:
            return self.visitarSumExpression(esq_node)
        

    def visitarSumExpression(self, no):

        # print("noSumExpression: " + str(no))

        if no != None:
            val1 = self.visitarSumExpression(no.get("esquerda"))
            val2 = self.visitarSumExpression(no.get("direita"))

            if no.op in ("sumExpression", "multiplicativeTerm", "powerTerm"):
                print("val1: " + str(val1)) 
                print("val2: " + str(val2))
                if not (val1.tipo == "INTEGER" and val2.tipo == "BOOLEAN") or (val2.tipo == "INTEGER" and val1.tipo == "BOOLEAN"):
                    if val1.tipo != val2.tipo:
                        raise SemanticException(f"Tipos incompatíveis: {no.get('esquerda').get('factor').value} e {no.get('direita').get('factor').value} na linha {no.get('direita').get('factor').line}")

                if no.get("oper") == "/" and val2.tipo == "INTEGER" and no.get('direita').get('factor'):
                    if no.get('direita').get('factor').value == "0":
                        raise SemanticException(f"Divisão por zero na linha {no.get('direita').get('factor').line}")
                
                if no.get("oper") ==   "^" and val2.tipo == "INTEGER" and no.get('direita').get('sinal') == "-":
                    raise SemanticException(f"Expoente negativo na linha {no.get('direita').get('factor').line}")
                
                if val1 != None:
                    return NoTabela(val1.valor, val1.tipo)
                else:
                    return NoTabela(val2.valor, val2.tipo)

            elif no.op == "factor" and not no.get("expression"):
                factor = no.get("factor")

                if factor.op == "ID":
                    if factor.value not in self.tabela:
                        raise SemanticException(f"O identificador '{factor.value}' na linha {factor.line} não foi declarado")
                    else:
                        return NoTabela(valor=self.tabela[factor.value].valor, tipo=self.tabela[factor.value].tipo)

                elif factor.op == "BOOLEAN":
                    if factor.value == "verdade":
                        return NoTabela(valor=1, tipo="BOOLEAN")
                    else:
                        return NoTabela(valor=0, tipo="BOOLEAN")

                elif factor.op == "INTEGER":
                    sinal = no.get("sinal")

                    if sinal == "-":
                       return NoTabela("-" + factor.value, "INTEGER")
                   
                    else:
                       return NoTabela(factor.value, "INTEGER")


            elif no.op == "factor" and no.get("expression"):
                return self.visitarExpression(no.get("expression"))
        

    def print_tabela(self):
        print(self.tabela)