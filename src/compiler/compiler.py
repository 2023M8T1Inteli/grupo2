from lexic.lexic_analyzer import Lexic
from syntatic.syntatic_analyzer import Syntatic
from syntatic.tree_generator import NoInterno, NoFolha

class Compiler:

    def __init__(self, code):
        self.code = code
        self.tokens = []

    def compile(self):
        lexic_analyzer = Lexic(self.code)
        lexic_analyzer.lexic()
        syntatic_analyzer = Syntatic(lexic_analyzer.token_list)
        tree = syntatic_analyzer.analyze()
        self.print_tree(tree)

    def print_tree(self, node, level=0):
        print('  ' * level + str(node))
        if isinstance(node, NoInterno):
            for key, value in node.d.items():
                if isinstance(value, list):
                    for item in value:
                        self.print_tree(item, level + 1)
                else:
                    self.print_tree(value, level + 1)

