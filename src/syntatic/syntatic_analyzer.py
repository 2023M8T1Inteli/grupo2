class Syntatic:
    def __init__(self, tokens):
        self.tokens = tokens
        self.index = 0
        self.current_token = self.tokens[self.index]


    def analyze(self):
        self.program()
        self.match("EOF")

    
    def next_token(self):
        self.index += 1
        if self.index < len(self.tokens):
            self.current_token = self.tokens[self.index]
        else:
            self.current_token = None


    def match(self, expected=None):
        if self.current_token.type == expected:
            self.next_token()
        else:
            print(self.current_token)
            raise Exception(f"Syntatic error: expected {expected} line {self.current_token.line}")
        
    def program(self):
        self.match("PROGRAMA")
        self.match("DQUOTE")
        self.match("STRING")
        self.match("DQUOTE")
        self.match("COLON")
        self.block()
        self.match("DOT")


    def block(self):
        self.match("LBLOCK")
        self.statement_list()
        self.match("RBLOCK")


    def statement_list(self):
        if self.current_token.type != "RBLOCK":
            self.statement()
            self.statement_list()

    def statement(self):
        if self.current_token.type == "ID":
            self.assignment_statement()
        elif self.current_token.type == "SE":
            self.if_statement()
        elif self.current_token.type == "ENQUANTO":
            self.while_statement()
        elif self.current_token.value == "mostrar" or self.current_token.value == "tocar" or self.current_token.value == "esperar" or self.current_token.value == "mostrar_tocar":
            self.command_statement()
        else:
            i = self.index - 1
            raise Exception(f"Syntatic error: expected statement line {self.tokens[i].line}") ## necessário arrumar
        
        ## Entender como trata o caso de não ter o else
        
    def assignment_statement(self):
        self.match("ID")
        self.match("ASSIGN")
        if self.current_token.value == "ler" or self.current_token.value == "ler_varios":
            self.input_statement()

        else:
            self.expression()


    def if_statement(self):
        self.match("SE")
        self.expression()
        self.match("ENTAO")
        self.block()
        if  self.current_token.type == "SENAO":
            self.match("SENAO")
            self.block()

    def while_statement(self):
        self.match("ENQUANTO")
        self.expression()
        self.match("FACA")
        self.block()

    def command_statement(self):
        if self.current_token.value == "mostrar" or self.current_token.value == "esperar" or self.current_token.value == "tocar":
            self.match("COMANDO")
            self.match("LPAR")
            self.sum_expression()
            self.match("RPAR")

        elif self.current_token.value == "mostrar_tocar":
            self.match("COMANDO")
            self.match("LPAR")
            self.sum_expression()
            self.match("COMMA")
            self.sum_expression()
            self.match("RPAR")


    def input_statement(self):
        if self.current_token.value == "ler":
            self.match("COMANDO")
            self.match("LPAR")
            self.match("RPAR")
        else:
            self.match("COMANDO")
            self.match("LPAR")
            self.sum_expression()
            self.match("COMMA")
            self.sum_expression()
            self.match("COMMA")
            self.sum_expression()
            self.match("RPAR")

    
    def expression(self):
        self.sum_expression()
        if self.current_token.type == "OPREL":
            self.relop()
            self.sum_expression()

    
    def sum_expression(self):
        self.mult_term()
        self.sum_expression2()

    
    def relop(self):
        self.match("OPREL")

    def sum_expression2(self):
        if self.current_token.type == "OPSUM":
            self.mult_term()
            self.sum_expression2()

    def mult_term(self):
        self.power_term()
        self.mult_term2()

    def mult_term2(self):
        if self.current_token.type == "OPMUL":
            self.match("OPMUL")
            self.power_term()
            self.mult_term2()

    def power_term(self):
        self.factor()
        if self.current_token.type == "OPPOW":
            self.match("OPPOW")
            self.power_term()


    def factor(self):
        if self.current_token.type == "ID":
            self.match("ID")
        elif self.current_token.type == "INTEGER":
            self.match("INTEGER")
        elif self.current_token.type == "BOOLEAN":
            self.boolean()
        elif self.current_token.value == "+" or self.current_token.value == "-":
            self.match("OPSUM")
            self.factor()
        elif self.current_token.type == "NAO":
            self.match("NAO")
            self.boolean()
        elif self.current_token.type == "LPAR":
            self.match("LPAR")
            self.expression()
            self.match("RPAR")
        else:
            i = self.index - 1
            raise Exception(f"Syntatic error: expected factor line {self.tokens[i].line}")
    def boolean(self):
            self.match("BOOLEAN")