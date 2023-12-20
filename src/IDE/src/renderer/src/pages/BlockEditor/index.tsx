import './styles.css'
import { ReactElement, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import BlockRow from '@renderer/components/BlockRow'
import Modal from '@renderer/components/BlockModal'
import CanvasModal from '@renderer/components/CanvasModal'
import { SceneProcessor, BlockUtil } from '@renderer/utils/util'
import { IBaseButton, genericButtons, inputButtons } from '@renderer/staticButtons'
import MusicModal from '@renderer/components/MusicModal'

export interface IBlockRow {
  order: number
  blocks: IBaseButton[]
}
function BlockEditor(): ReactElement {
  const [showModal, setShowModal] = useState(false)
  const [showEditCanvasModal, setShowEditCanvasModal] = useState(false)
  const [modalType, setModalType] = useState<'input' | 'other'>('input')
  const [activeRowIndex, setActiveRowIndex] = useState<number | null>(null)
  const [activeBlockId, setActiveBlockId] = useState<string | null>(null)
  const [rows, setRows] = useState<IBlockRow[]>([])
  const sceneProcessor = new SceneProcessor()
  const [showMusicModal, setShowMusicModal] = useState(false)

  // Be aware that this is VERY INNEFICIENT and will lead to "counter" leaks.
  // This is just a quick fix to make sure that the "src" property of each block is uniquely mapped.
  const [globalResourceCounter, setGlobalResourceCounter] = useState(0)

  const handleOpenModal = (rowIndex: number, modalType: string): void => {
    setActiveRowIndex(rowIndex)
    setModalType(modalType as 'input' | 'other')
    setShowModal(true)
  }

  const compileCodeHandler = async (): Promise<void> => {
    const code = sceneProcessor.process({ name: 'teste', blockRows: rows })
    alert(code)
    try {
      const compiledCode = await window.api.compileCode(code)
      console.log(compiledCode)
      alert(compiledCode)
      try {
        const projectFolderPath = localStorage.getItem('currentProjectPath')
        const runCode = await window.api.saveAndRunCode(compiledCode, projectFolderPath)
        console.log(runCode)
      } catch (err) {
        alert(err)
      }
    } catch (err) {
      alert(err)
    }
  }

  const appendNewBlockToRow = (
    newBlock: IBaseButton,
    rows: IBlockRow[],
    activeRowIndex: number
  ): IBlockRow[] => {
    if (activeRowIndex < rows.length) {
      const updatedRows = rows.map((row, index) => {
        if (index === activeRowIndex) {
          return { ...row, blocks: [...row.blocks, newBlock] }
        }
        return row
      })
      return updatedRows
    } else {
      const newRow = { order: activeRowIndex, blocks: [newBlock] }
      return [...rows, newRow]
    }
  }
  const handleMusicButtonClick = (button: IBaseButton) => {
    setShowMusicModal(true)
  }

  const addBlockToRow = (newBlock: IBaseButton): void => {
    if (activeRowIndex !== null) {
      BlockUtil.remapBlockCompiledCode(
        newBlock,
        activeRowIndex,
        globalResourceCounter,
        setGlobalResourceCounter
      )
      setActiveBlockId(newBlock.id ? newBlock.id : null)
      const updatedRows = appendNewBlockToRow(newBlock, rows, activeRowIndex)
      setRows(updatedRows)
    }
    setShowModal(false)
  }

  const addBlockToRowHandler = (newBlock: IBaseButton): void => {
    addBlockToRow(newBlock)
    if (newBlock.type === 'scene') {
      if (activeBlockId) setShowEditCanvasModal(true)
    }
  }

  const editCanvasHandler = (canvasIdx: string): void => {
    setActiveBlockId(canvasIdx)
    setShowEditCanvasModal(true)
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
        onAddBlock={addBlockToRowHandler}
        onMusicButtonClick={handleMusicButtonClick}
      />
      <MusicModal
        show={showMusicModal}
        onClose={() => setShowMusicModal(false)}
        activeSoundResourceId={activeBlockId || ''}
      />
      <CanvasModal
        show={showEditCanvasModal}
        activeSceneResourceId={activeBlockId || ''}
        onClose={handleEditCanvasClose}
      />
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
              editCanvasHandler={editCanvasHandler}
              editTimeHandler={() => {}}
            />
          ))}
        </div>
      </span>
      <span style={{ padding: '1em' }} onClick={() => handleOpenModal(rows.length, 'input')}>
        <FontAwesomeIcon icon={faPlusCircle} size="4x" color="black" />
      </span>
      {/* <button>Test Save</button> */}
      <button onClick={() => compileCodeHandler()}>Test Compile</button>
    </div>
  )
}
export default BlockEditor
