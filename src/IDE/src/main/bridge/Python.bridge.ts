// Este arquivo TypeScript define um módulo que fornece funcionalidades de ponte para processamento de código.
// Inclui:
// - Importação do módulo axios para fazer requisições HTTP.
// - Objeto `codeBridge` com a função `processCode` para processar código.
// - A função `processCode` faz uma requisição POST para um endpoint de compilação, enviando o código e retornando a resposta.

import axios from 'axios'

export const codeBridge = {
  async processCode(code: string): Promise<any> {
    const result = await axios.post('http://127.0.0.1:8000/compile', {
      code: code
    })
    return result.data
  }
}
