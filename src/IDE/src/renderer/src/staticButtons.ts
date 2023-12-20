import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import {
  faWalking,
  faImage,
  faMusic,
  faHourglassHalf,
  faUserXmark
} from '@fortawesome/free-solid-svg-icons'

export interface IBaseButton {
  id?: string
  name: string
  icon: IconDefinition
  category: 'input' | 'resource' | 'action' | 'logical'
  type: 'scene' | 'sound' | 'input' | 'wait' | 'else'
  src?: string
  correspondingCompileCode: string
}

export const inputButtons: IBaseButton[] = [
  {
    name: 'Quadrante 1',
    type: 'input',
    category: 'input',
    icon: faWalking,
    correspondingCompileCode: 'ler_varios(1,1,0)',
    src: ''
  },
  {
    name: 'Quadrante 2',
    type: 'input',
    category: 'input',
    icon: faWalking,
    correspondingCompileCode: 'ler_varios(2,1,0)',
    src: ''
  },
  {
    name: 'Quadrante 3',
    type: 'input',
    category: 'input',
    icon: faWalking,
    correspondingCompileCode: 'ler_varios(3,1,0)',
    src: ''
  },
  {
    name: 'Quadrante 4',
    type: 'input',
    category: 'input',
    icon: faWalking,
    correspondingCompileCode: 'ler_varios(4,1,0)',
    src: ''
  }
]

export const genericButtons: IBaseButton[] = [
  {
    name: 'Mostrar Cena',
    icon: faImage,
    correspondingCompileCode: '',
    type: 'scene',
    category: 'resource',
    src: '0'
  },
  {
    name: 'Tocar Música',
    icon: faMusic,
    correspondingCompileCode: 'music',
    type: 'sound',
    category: 'resource',
    src: '0'
  },
  {
    name: 'Esperar Segundos',
    icon: faHourglassHalf,
    correspondingCompileCode: '',
    type: 'wait',
    category: 'action',
    src: '10000'
  },
  {
    name: 'Caso errado',
    icon: faUserXmark,
    correspondingCompileCode: '',
    type: 'else',
    category: 'logical',
    src: ''
  }
]
