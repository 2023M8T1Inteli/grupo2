import './styles.css'
import { ReactElement, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  IconDefinition,
  faImage,
  faMusic,
  faHourglassHalf,
  faPlusCircle,
  faWalking
} from '@fortawesome/free-solid-svg-icons'
import BlockRow from '@renderer/components/BlockRow'
import Modal from '@renderer/components/BlockModal'
import CanvasModal from '@renderer/components/CanvasModal'

export interface IBaseButton {
  name: string
  icon: IconDefinition
  type: 'input' | 'resource' | 'action' | 'graphical'
  src?: string
  correspondingCompileCode: string
}

interface BlockRow {
  order: number
  blocks: IBaseButton[]
}

const inputButtons: IBaseButton[] = [
  {
    name: 'Quadrante 1',
    type: 'input',
    icon: faWalking,
    correspondingCompileCode: '1'
  },
  {
    name: 'Quadrante 2',
    type: 'input',
    icon: faWalking,
    correspondingCompileCode: '2'
  },
  {
    name: 'Quadrante 3',
    type: 'input',
    icon: faWalking,
    correspondingCompileCode: '3'
  },
  {
    name: 'Quadrante 4',
    type: 'input',
    icon: faWalking,
    correspondingCompileCode: '4'
  }
]

const genericButtons: IBaseButton[] = [
  {
    name: 'Mostrar Cena',
    icon: faImage,
    correspondingCompileCode: 'image',
    type: 'resource'
  },
  {
    name: 'Tocar Música',
    icon: faMusic,
    correspondingCompileCode: 'music',
    type: 'resource'
  },
  {
    name: 'Esperar Segundos',
    icon: faHourglassHalf,
    correspondingCompileCode: 'timer',
    type: 'action'
  },
  {
    name: 'Quadrante 1',
    type: 'input',
    icon: faWalking,
    correspondingCompileCode: '1'
  },
  {
    name: 'Quadrante 2',
    type: 'input',
    icon: faWalking,
    correspondingCompileCode: '2'
  },
  {
    name: 'Quadrante 3',
    type: 'input',
    icon: faWalking,
    correspondingCompileCode: '3'
  },
  {
    name: 'Quadrante 4',
    type: 'input',
    icon: faWalking,
    correspondingCompileCode: '4'
  }
]

function BlockEditor(): ReactElement {
  const [showModal, setShowModal] = useState(false)
  const [showEditCanvasModal, setShowEditCanvasModal] = useState(false)
  const [modalType, setModalType] = useState<'input' | 'other'>('input')
  const [activeRowIndex, setActiveRowIndex] = useState<number | null>(null)
  const [rows, setRows] = useState<BlockRow[]>([])

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

  const handleAddBlockToRow = (newBlock: IBaseButton): void => {
    if (activeRowIndex !== null) {
      if (activeRowIndex < rows.length) {
        const updatedRows = rows.map((row, index) => {
          if (index === activeRowIndex) {
            const currentBlocksLength = row.blocks.length
            if (['graphical', 'resource'].includes(newBlock.type)) {
              newBlock.src = `${globalResourceCounter}`
              setGlobalResourceCounter(globalResourceCounter + 1)
            }
            return { ...row, blocks: [...row.blocks, newBlock] }
          }
          return row
        })
        setRows(updatedRows)
      } else {
        if (['graphical', 'resource'].includes(newBlock.type)) {
          newBlock.src = `${globalResourceCounter}`
          setGlobalResourceCounter(globalResourceCounter + 1)
        }
        const newRow = { order: activeRowIndex, blocks: [newBlock] }
        setRows([...rows, newRow])
      }
    }
    console.log(rows)
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
    </div>
  )
}
export default BlockEditor
