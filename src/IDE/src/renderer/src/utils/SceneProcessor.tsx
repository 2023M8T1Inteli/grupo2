import { IBlockRow } from '@renderer/pages/BlockEditor'

export interface IProject {
  name: string
  blockRows: IBlockRow[]
}
function _processBlockRow(blockRow: IBlockRow): string {
  let code = ''
  const conditionBtn = blockRow.blocks[0]
  code += `  press_quadrante_${conditionBtn.id} = ${conditionBtn.correspondingCompileCode}\n`
  code += `  se press_quadrante_${conditionBtn.id} == verdade entao\n  inicio\n`

  for (let i = 1; i < blockRow.blocks.length; i++) {
    const block = blockRow.blocks[i]
    if (block.type === 'else') {
      code += '  fim senao\n  inicio\n'
      for (let j = i + 1; j < blockRow.blocks.length; j++) {
        const block = blockRow.blocks[j]
        code += `    ${block.correspondingCompileCode}\n`
      }
      break
    }
    code += `    ${block.correspondingCompileCode}\n`
  }

  code += '  fim\n'
  return code
}
function _processBlockRows(blockRows: IBlockRow[]): string {
  let code = ''
  for (const blockRow of blockRows) {
    code += _processBlockRow(blockRow)
  }
  return code
}

export const sceneProcessor = (project: IProject): string => {
  const header = `programa "${project.name}":\n`
  const code = `inicio\n${_processBlockRows(project.blockRows)}fim.`
  return header + code
}
