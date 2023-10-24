
class Token:
    def __init__(self, type, value, line):
        self.type = type
        self.value = value
        self.line = line

    def __repr__(self):
        return f"({self.type}, {self.value}, {self.line})"

    def __eq__(self, other):
        return self.type == other.type and self.value == other.value