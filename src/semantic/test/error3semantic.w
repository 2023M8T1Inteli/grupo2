programa "geracao_codigo1":
inicio
a = 5
b = 9
c = (3+a)*b/2
/*esperar(c)
tocar(a%4)

fim.

/*
arvore: NoInterno(op=programa, {'nome': 'geracao_codigo1', 'bloco': NoInterno(op="bloco", listaAtribuicao=NoInterno(op=listaAtribuicao, {'atribuicao': NoInterno(op="atribuicao", id=NoFolha(ID, a, line=3), expression=NoInterno(op=expression, {'oper': None, 'esquerda': NoInterno(op="factor", sinal="+", esquerda=None, direita=None, factor=NoFolha(INTEGER, 5, line=3)), 'direita': None})), 'prox': NoInterno(op="listaAtribuicao", atribuicao=NoInterno(op=atribuicao, {'id': NoFolha(op="ID", value="b", line=4), 'expression': NoInterno(op="expression", oper=None, esquerda=NoInterno(op=factor, {'sinal': '+', 'esquerda': None, 'direita': None, 'factor': NoFolha(op="INTEGER", value="9", line=4)}), direita=None)}), prox=NoInterno(op=listaAtribuicao, {'atribuicao': NoInterno(op="atribuicao", id=NoFolha(ID, c, line=5), expression=NoInterno(op=expression, {'oper': None, 'esquerda': NoInterno(op="multiplicativeTerm", oper="/", esquerda=NoInterno(op=multiplicativeTerm, {'oper': '*', 'esquerda': NoInterno(op="factor", sinal="+", esquerda=None, direita=None, expression=NoInterno(op=expression, {'oper': None, 'esquerda': NoInterno(op="sumExpression", oper="+", esquerda=NoInterno(op=factor, {'sinal': '+', 'esquerda': None, 'direita': None, 'factor': NoFolha(op="INTEGER", value="3", line=5)}), direita=NoInterno(op=factor, {'sinal': '+', 'esquerda': None, 'direita': None, 'factor': NoFolha(op="ID", value="a", line=5)})), 'direita': None})), 'direita': NoInterno(op="factor", sinal="+", esquerda=None, direita=None, factor=NoFolha(ID, b, line=5))}), direita=NoInterno(op=factor, {'sinal': '+', 'esquerda': None, 'direita': None, 'factor': NoFolha(op="INTEGER", value="2", line=5)})), 'direita': None})), 'prox': NoInterno(op="listaAtribuicao", atribuicao=NoInterno(op=esperar, {'param': NoInterno(op="factor", sinal="+", esquerda=None, direita=None, factor=NoFolha(ID, c, line=6))}), prox=NoInterno(op=listaAtribuicao, {'atribuicao': NoInterno(op="tocar", param=NoInterno(op=multiplicativeTerm, {'oper': '%', 'esquerda': NoInterno(op="factor", sinal="+", esquerda=None, direita=None, factor=NoFolha(ID, a, line=7)), 'direita': NoInterno(op="factor", sinal="+", esquerda=None, direita=None, factor=NoFolha(INTEGER, 4, line=7))})), 'prox': None}))}))}))})
*/