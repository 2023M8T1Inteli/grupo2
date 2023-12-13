// Funções auxiliares para exibir mensagens de notificação (toasts)
// Inclui:
// - `successToast` para exibir uma mensagem de sucesso.
// - `errorToast` para exibir uma mensagem de erro.
// - `infoToast` para exibir uma mensagem informativa.
// Todas as funções aceitam uma string como conteúdo da mensagem e utilizam a biblioteca 'react-toastify'.

import { toast } from 'react-toastify'

export function successToast(content: string) {
  return toast.success(content, {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true
  })
}

export function errorToast(content: string) {
  return toast.error(content, {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true
  })
}

export function infoToast(content: string) {
  return toast.info(content, {
    position: 'top-right',
    autoClose: 10000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true
  })
}
