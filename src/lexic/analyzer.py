from token import Token

class Analyzer:

    def __init__(self, code):
        self.code = code
        self.token_list = []
        self.index = 0
        self.current_line = 1
        self.alphabet_list = ["a", "b", "c", "d", "e", "f", "g", "h", "i", 
                 "j", "k", "l", "m", "n", "o", "p", "q", "r", 
                 "s", "t", "u", "v", "w", "x", "y", "z", "A", 
                 "B", "C", "D", "E", "F", "G", "H", "I", "J", 
                 "K", "L", "M", "N", "O", "P", "Q", "R", "S", 
                 "T", "U", "V", "W", "X", "Y", "Z", "_"]

        self.digit_list = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]

        self.reserved_words = {"programa": "PROGRAMA", "se": "SE", "entao": "ENTAO", 
                  "senao": "SENAO", "enquanto": "ENQUANTO", "faca": "FACA", 
                  "nao": "NAO", "inicio": "LBLOCK", "fim": "RBLOCK", 
                  "verdade": "BOOLEAN", "falso": "BOOLEAN", "ler": "COMANDO", 
                  "ler_varios": "COMANDO", "mostrar": "COMANDO", "tocar": "COMANDO", 
                  "mostrar_tocar": "COMANDO", "esperar": "COMANDO", ":": "COLON", 
                  ",": "COMMA", ".": "DOT", '"': "DQUOTE", "=": "ASSIGN", "(": "LPAR", 
                  ")": "RPAR", "==": "OPREL", "<>": "OPREL", "<": "OPREL", "<=": "OPREL", 
                  ">": "OPREL", ">=": "OPREL", "+": "OPSUM", "-": "OPSUM", "ou": "OPSUM", 
                  "*": "OPMUL", "/": "OPMUL", "%": "OPMUL", "e": "OPMUL", "^": "OPPOW"
                  }
        self.symbol_list = ["+", "-", "*", "/", "^", "%", "(", ")", "<", ">", "=", "<>", "<=", ">=", ":", ";", ",", "."]
    
    def lexic(self):

        while self.index <= len(self.code):

            if self.index == len(self.code):
                self.token_list.append(Token("EOF", "EOF", self.current_line))
                break

            c = self.code[self.index]

            self.index += 1

            if c == "\n":
                self.current_line += 1
                continue

            if c == " ":
                continue
            
            if c == "/":
                i = self.index
                self.index = self.comments(c)
                if self.index > i:
                    continue

            if c in self.alphabet_list:
                self.index = self.starts_alphabetically(c)
                continue

            if c in self.digit_list:
                self.index = self.starts_numerically(c)
                continue

            if c in self.symbol_list:
                self.index = self.starts_symbol(c)
                continue

            if c == '"':
                self.index = self.starts_string(c)
                continue
            
            print("erro lexico na linha " + str(self.current_line))
            self.token_list = []
            break
            
        

    def starts_alphabetically(self, c):
        tmp =  str(c)
        while self.index < len(self.code):
            if self.code[self.index] in self.alphabet_list or self.code[self.index] in self.digit_list:
                tmp += self.code[self.index]
            else:
                if tmp in self.reserved_words:
                    self.token_list.append(Token(self.reserved_words[tmp], tmp, self.current_line))
                    return self.index
                else:
                    self.token_list.append(Token("ID", tmp, self.current_line))
                    return self.index
            self.index = self.index + 1

        if tmp in self.alphabet_list:
            self.token_list.append(Token("ID", tmp, self.current_line))
            return self.index
    
        return self.index
    

    def starts_numerically(self, c):
        tmp = str(c)
        while self.index < len(self.code):
            if self.code[self.index] in self.digit_list:
                tmp += self.code[self.index]
            else:
                self.token_list.append(Token("INTEGER", tmp, self.current_line))
                return self.index
            self.index = self.index + 1

        if tmp in self.digit_list:
            self.token_list.append(Token("INTEGER", tmp, self.current_line))
            return self.index
        
        return self.index


    def starts_symbol(self, c):
        tmp = str(c)

        if (self.index) < len(self.code):
            tmp2 = tmp + self.code[self.index]
            if tmp2 in self.reserved_words:
                self.token_list.append(Token(self.reserved_words[tmp2], tmp2, self.current_line))
                return self.index + 1
            
            else:
                self.token_list.append(Token(self.reserved_words[tmp], tmp, self.current_line))
                return self.index
            
        self.token_list.append(Token(self.reserved_words[tmp], tmp, self.current_line))
        return self.index
    
    def starts_string(self, c):
        tmp = str(c)
        while self.index < len(self.code):
            if self.code[self.index] != '"':
                tmp += self.code[self.index]
            else:
                tmp += self.code[self.index]
                self.token_list.append(Token("STRING", tmp, self.current_line))
                return self.index + 1
            self.index = self.index + 1
        
        return self.index
    
    def comments(self, c):
        i = self.index
        tmp = str(c)
        if self.code[self.index] == "/":
            while self.code[self.index] != "\n":
                self.index += 1
            self.current_line += 1
            return self.index + 1
        
        if self.code[self.index] == "*":
            self.index += 1
            while self.index < len(self.code):
                if self.code[self.index] == "*":
                    self.index += 1
                    if self.code[self.index] == "/":
                        self.index += 1
                        return self.index
                self.index += 1
        return i