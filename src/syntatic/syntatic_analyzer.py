
from syntatic.tree_generator import NoInterno, NoFolha, SyntaxException

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
        tree = self.program()
        self.match("EOF")
        return tree
        
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
        program_name = self.current_token.value
        self.match("STRING")
        self.match("DQUOTE")
        self.match("COLON")
        block_node = self.block()
        self.match("DOT")
        return NoInterno("programa", nome=program_name, bloco=block_node)


    def block(self):
        """
            Validates a block of code, which is defined by a list of statements enclosed in block delimiters.
        """
        self.match("LBLOCK")
        statement_list_node = self.statement_list()
        self.match("RBLOCK")
        return NoInterno("bloco", listaAtribuicao=statement_list_node)


    def statement_list(self):
        """
            Recursively processes a list of statements until the end of the block is reached.
        """
        statement_nodes = []
        while self.current_token.type != "RBLOCK":
            statement_node = self.statement()
            statement_nodes.append(statement_node)
        return statement_nodes

    def statement(self):
        """
            Determines the type of statement to process based on the current token and delegates to the appropriate method.

            :raises Exception: If an unexpected statement type is encountered.
        """
        if self.current_token.type == "ID":
            return self.assignment_statement()
        elif self.current_token.type == "SE":
            return self.if_statement()
        elif self.current_token.type == "ENQUANTO":
            return self.while_statement()
        elif self.current_token.value in ["mostrar", "tocar", "esperar", "mostrar_tocar"]:
            return self.command_statement()
        else:
            i = self.index - 1
            raise Exception(f"Syntatic error: expected statement line {self.tokens[i].line}")
        
        ## Entender como trata o caso de não ter o else
        
    def assignment_statement(self):
        """
            Processes an assignment statement, which assigns a value to a variable.
        """
        id_node = NoFolha("ID", self.current_token.value, self.current_token.line)
        self.match("ID")
        self.match("ASSIGN")
        if self.current_token.value in ["ler", "ler_varios"]:
            input_node = self.input_statement()
            return NoInterno("atribuicao", id=id_node, valor=input_node)
        else:
            expression_node = self.expression()
            return NoInterno("atribuicao", id=id_node, valor=expression_node)


    def if_statement(self):
        """
            Processes an if statement, including an optional else block.
        """
        self.match("SE")
        condition_node = self.expression()
        self.match("ENTAO")
        then_block_node = self.block()
        if  self.current_token.type == "SENAO":
            self.match("SENAO")
            else_block_node = self.block()
            return NoInterno("se", condicao=condition_node, entao=then_block_node, senao=else_block_node)
        else:
            return NoInterno("se", condicao=condition_node, entao=then_block_node)

    def while_statement(self):
        """
            Processes a while statement, which executes a block of code as long as a condition is true.
        """
        self.match("ENQUANTO")
        condition_node = self.expression()
        self.match("FACA")
        block_node = self.block()
        return NoInterno("enquanto", condicao=condition_node, faca=block_node)

    def command_statement(self):
        """
            Processes a command statement, which can be a display, wait, play sound command, or a combination of display and play.
        """
        command = self.current_token.value
        self.match("COMANDO")
        self.match("LPAR")
        param1_node = self.sum_expression()
        if command == "mostrar_tocar":
            self.match("COMMA")
            param2_node = self.sum_expression()
            self.match("RPAR")
            return NoInterno(command, param1=param1_node, param2=param2_node)
        else:
            self.match("RPAR")
            return NoInterno(command, param=param1_node)


    def input_statement(self):
        """
            Processes an input statement, which reads user input.
        """
        command = self.current_token.value
        self.match("COMANDO")
        self.match("LPAR")
        if command == "ler_varios":
            param1_node = self.sum_expression()
            self.match("COMMA")
            param2_node = self.sum_expression()
            self.match("COMMA")
            param3_node = self.sum_expression()
            self.match("RPAR")
            return NoInterno(command, param1=param1_node, param2=param2_node, param3=param3_node)
        else:
            self.match("RPAR")
            return NoInterno(command)

    
    def expression(self):
        """
            Processes an expression, which can be a mathematical or logical expression.
        """
        sum_node = self.sum_expression()
        if self.current_token.type == "OPREL":
            op = self.current_token.value
            self.match("OPREL")
            right_node = self.expression()
            return NoInterno(op, esquerda=sum_node, direita=right_node)
        else:
            return sum_node


    
    def sum_expression(self):
        """
            Processes a sum expression, which deals with addition and subtraction.
        """
        term_node = self.mult_term()
        if self.current_token.type == "OPSUM":
            op = self.current_token.value
            self.match("OPSUM")
            right_node = self.sum_expression()
            return NoInterno(op, esquerda=term_node, direita=right_node)
        else:
            return term_node

    
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
        term_node = self.power_term()
        if self.current_token.type == "OPMUL":
            op = self.current_token.value
            self.match("OPMUL")
            right_node = self.mult_term()
            return NoInterno(op, esquerda=term_node, direita=right_node)
        else:
            return term_node

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
        factor_node = self.factor()
        if self.current_token.type == "OPPOW":
            self.match("OPPOW")
            right_node = self.power_term()
            return NoInterno("^", esquerda=factor_node, direita=right_node)
        else:
            return factor_node


    def factor(self):
        """
            Processes a factor, which can be a number, a variable, or an entire expression enclosed in parentheses.
        """
        if self.current_token.type == "ID":
            node = NoFolha("ID", self.current_token.value, self.current_token.line)
            self.match("ID")
        elif self.current_token.type == "INTEGER":
            node = NoFolha("INTEGER", self.current_token.value, self.current_token.line)
            self.match("INTEGER")
        elif self.current_token.type == "BOOLEAN":
            node = self.boolean()
        elif self.current_token.value in ["+", "-"]:
            op = self.current_token.value
            self.match("OPSUM")
            right_node = self.factor()
            node = NoInterno(op, direita=right_node)
        elif self.current_token.type == "NAO":
            self.match("NAO")
            right_node = self.boolean()
            node = NoInterno("NAO", direita=right_node)
        elif self.current_token.type == "LPAR":
            self.match("LPAR")
            node = self.expression()
            self.match("RPAR")
        else:
            i = self.index - 1
            raise Exception(f"Syntatic error: expected factor line {self.tokens[i].line}")
        return node
        

    def boolean(self):
        """
            Processes a boolean value within an expression.
        """
        node = NoFolha("BOOLEAN", self.current_token.value, self.current_token.line)
        self.match("BOOLEAN")
        return node