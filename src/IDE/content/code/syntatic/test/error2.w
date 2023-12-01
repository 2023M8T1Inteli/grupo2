// Erro: estrutura 'se ... entao ... senao' mal formada
programa "erro2":
inicio
  se 1 > 0
  inicio  // Falta a palavra-chave 'entao'
    mostrar(x)
  fim  // Não fechou corretamente a estrutura do 'se'
  mostrar(y)
fim.
