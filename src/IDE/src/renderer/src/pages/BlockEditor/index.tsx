import './styles.css'
import { ReactElement, useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  IconDefinition,
  faImage,
  faMusic,
  faHourglassHalf,
  faPlusCircle,
  faWalking,
  faUserXmark
} from '@fortawesome/free-solid-svg-icons'
import BlockRow from '@renderer/components/BlockRow'
import Modal from '@renderer/components/BlockModal'
import CanvasModal from '@renderer/components/CanvasModal'
import { sceneProcessor } from '@renderer/utils/SceneProcessor'

export interface IBaseButton {
  id?: string
  name: string
  icon: IconDefinition
  category: 'input' | 'resource' | 'action' | 'logical'
  type: 'scene' | 'sound' | 'input' | 'wait' | 'else'
  src?: string
  correspondingCompileCode: string
}

export interface IBlockRow {
  order: number
  blocks: IBaseButton[]
}

const inputButtons: IBaseButton[] = [
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

const genericButtons: IBaseButton[] = [
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

function BlockEditor(): ReactElement {
  const [showModal, setShowModal] = useState(false)
  const [showEditCanvasModal, setShowEditCanvasModal] = useState(false)
  const [modalType, setModalType] = useState<'input' | 'other'>('input')
  const [activeRowIndex, setActiveRowIndex] = useState<number | null>(null)
  const [rows, setRows] = useState<IBlockRow[]>([])

  // Be aware that this is VERY INNEFICIENT and will lead to "counter" leaks.
  // This is just a quick fix to make sure that the "src" property of each block is uniquely mapped.
  const [globalResourceCounter, setGlobalResourceCounter] = useState(0)

  const handleOpenModal = (rowIndex: number, modalType: string): void => {
    setActiveRowIndex(rowIndex)
    setModalType(modalType as 'input' | 'other')
    setShowModal(true)
  }

  const handleOpenEditCanvasModal = (idx: active): void => {
    setShowEditCanvasModal(true)
  }

  const compileCodeHandler = async (): Promise<void> => {
    const code = sceneProcessor({ name: 'teste', blockRows: rows })
    try {
      const compiledCode = await window.api.compileCode(code)
      console.log(compiledCode)
      alert(compiledCode)
    } catch (err) {
      alert(err)
    }
  }

  const setNewBlockCompileCode = (newBlock: IBaseButton): void => {
    switch (newBlock.type) {
      case 'scene':
        newBlock.correspondingCompileCode = `mostrar(${newBlock.id})`
        break
      case 'sound':
        newBlock.correspondingCompileCode = `tocar(${newBlock.id})`
        break
      case 'wait':
        newBlock.correspondingCompileCode = `esperar(${newBlock.src})`
        break
      case 'else':
        newBlock.correspondingCompileCode = ''
        break
      default:
        console.log('setNewBlockCompileCode: type not found')
    }
  }

  const handleAddBlockToRow = (newBlock: IBaseButton): void => {
    if (activeRowIndex !== null) {
      if (activeRowIndex < rows.length) {
        const updatedRows = rows.map((row, index) => {
          if (index === activeRowIndex) {
            if (['graphical', 'resource'].includes(newBlock.category)) {
              newBlock.id = `${globalResourceCounter}`
              setGlobalResourceCounter(globalResourceCounter + 1)
            } else if (newBlock.category === 'input') {
              newBlock.id = activeRowIndex.toString()
            }
            return { ...row, blocks: [...row.blocks, newBlock] }
          }
          return row
        })
        setRows(updatedRows)
      } else {
        if (['graphical', 'resource'].includes(newBlock.category)) {
          newBlock.id = `${globalResourceCounter}`
          setGlobalResourceCounter(globalResourceCounter + 1)
        } else if (newBlock.category === 'input') {
          newBlock.id = activeRowIndex.toString()
        }
        const newRow = { order: activeRowIndex, blocks: [newBlock] }
        setRows([...rows, newRow])
      }
      setNewBlockCompileCode(newBlock)
    }
    setShowModal(false)
  }
  const handleClose = (): void => setShowModal(false)
  const handleEditCanvasClose = (): void => setShowEditCanvasModal(false)
  return (
    <div className="Main">
      <Modal
        show={showModal}
        onClose={handleClose}
        type={modalType}
        genericButtons={genericButtons}
        inputButtons={inputButtons}
        onAddBlock={handleAddBlockToRow}
      />
      <CanvasModal show={showEditCanvasModal} onClose={handleEditCanvasClose} />
      <span style={{ padding: '1em', width: '40em', height: '40em' }}>
        <div
          style={{
            backgroundColor: 'transparent',
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'start',
            alignItems: 'center',
            overflowY: 'scroll',
            flexDirection: 'column',
            gap: '10px'
          }}
        >
          {rows.map((row, idx) => (
            <BlockRow
              key={idx}
              blocks={row.blocks}
              addButtonHandler={() => handleOpenModal(idx, 'other')}
              editCanvasHandler={() => {}}
              editTimeHandler={() => {}}
            />
          ))}
        </div>
      </span>
      <span style={{ padding: '1em' }} onClick={() => handleOpenModal(rows.length, 'input')}>
        <FontAwesomeIcon icon={faPlusCircle} size="4x" color="black" />
      </span>
      <button onClick={() => compileCodeHandler()}>Test Compile</button>
    </div>
  )
}
export default BlockEditor
