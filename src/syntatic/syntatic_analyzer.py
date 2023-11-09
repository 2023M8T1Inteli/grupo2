class Syntatic:

    """
        This class represents a syntactic analyzer, which takes a sequence of tokens and 
        verifies the sequence's syntactic structure according to QAL's set of grammar rules.
    """

    def __init__(self, tokens):
        """
            Initialize the syntactic analyzer with a list of tokens.

            :param tokens: A list of tokens to be analyzed.
        """
        self.tokens = tokens
        self.index = 0
        self.current_token = self.tokens[self.index]


    def analyze(self):
        """
            Analyze the tokens by parsing them according to the grammar rules.
            The method starts with the 'program' non-terminal symbol and expects an EOF at the end.
        """
        self.program()
        self.match("EOF")

    
    def next_token(self):
        """
            Advances to the next token in the token list. If the end of the list is reached,
            the current token is set to None.
        """
        self.index += 1
        if self.index < len(self.tokens):
            self.current_token = self.tokens[self.index]
        else:
            self.current_token = None


    def match(self, expected):
        """
            Validates that the current token matches the expected token type. If it matches,
            the analyzer moves to the next token; otherwise, it raises a syntax error.

            :param expected: A string representing the expected token type.
            :raises Exception: If the current token type does not match the expected type.
        """
        if self.current_token.type == expected:
            self.next_token()
        else:
            # print(self.current_token)
            raise Exception(f"Syntatic error: expected {expected} line {self.current_token.line}")
        
    def program(self):
        """
            Validates the structure of a QAL program, which includes a program declaration followed by a block of code.
        """

        self.match("PROGRAMA")
        self.match("DQUOTE")
        self.match("STRING")
        self.match("DQUOTE")
        self.match("COLON")
        self.block()
        self.match("DOT")


    def block(self):
        """
            Validates a block of code, which is defined by a list of statements enclosed in block delimiters.
        """
        self.match("LBLOCK")
        self.statement_list()
        self.match("RBLOCK")


    def statement_list(self):
        """
            Recursively processes a list of statements until the end of the block is reached.
        """
        if self.current_token.type != "RBLOCK":
            self.statement()
            self.statement_list()

    def statement(self):
        """
            Determines the type of statement to process based on the current token and delegates to the appropriate method.

            :raises Exception: If an unexpected statement type is encountered.
        """
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
        """
            Processes an assignment statement, which assigns a value to a variable.
        """
        self.match("ID")
        self.match("ASSIGN")
        if self.current_token.value == "ler" or self.current_token.value == "ler_varios":
            self.input_statement()

        else:
            self.expression()


    def if_statement(self):
        """
            Processes an if statement, including an optional else block.
        """
        self.match("SE")
        self.expression()
        self.match("ENTAO")
        self.block()
        if  self.current_token.type == "SENAO":
            self.match("SENAO")
            self.block()

    def while_statement(self):
        """
            Processes a while statement, which executes a block of code as long as a condition is true.
        """
        self.match("ENQUANTO")
        self.expression()
        self.match("FACA")
        self.block()

    def command_statement(self):
        """
            Processes a command statement, which can be a display, wait, play sound command, or a combination of display and play.
        """
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
        """
            Processes an input statement, which reads user input.
        """
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
        """
            Processes an expression, which can be a mathematical or logical expression.
        """
        self.sum_expression()
        if self.current_token.type == "OPREL":
            self.relop()
            self.sum_expression() ### substituir por expression

    
    def sum_expression(self):
        """
            Processes a sum expression, which deals with addition and subtraction.
        """
        self.mult_term()
        self.sum_expression2()

    
    def relop(self):
        """
            Processes a relational operator, which is used to compare two values.
        """
        self.match("OPREL")

    def sum_expression2(self):
        """
            Continues processing a sum expression, allowing for multiple additions or subtractions in sequence.
        """
        if self.current_token.type == "OPSUM":
            self.match("OPSUM")
            self.mult_term()
            self.sum_expression2()

    def mult_term(self):
        """
            Processes a multiplication term within an expression.
        """
        self.power_term()
        self.mult_term2()

    def mult_term2(self):
        """
            Continues processing a multiplication term, allowing for multiple multiplications or divisions in sequence.
        """
        if self.current_token.type == "OPMUL":
            self.match("OPMUL")
            self.power_term()
            self.mult_term2()

    def power_term(self):
        """
            Processes an exponentiation term within an expression.
        """
        self.factor()
        if self.current_token.type == "OPPOW":
            self.match("OPPOW")
            self.power_term()


    def factor(self):
        """
            Processes a factor, which can be a number, a variable, or an entire expression enclosed in parentheses.
        """
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
        """
            Processes a boolean value within an expression.
        """
        self.match("BOOLEAN")