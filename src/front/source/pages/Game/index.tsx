import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Button from '../../components/Button';

function DragDrop() {
  const initialTasks = {
    palette1: {
      title: "Quadrantes",
      cards: [
        {
          value: 'Se apertar o quadrante ESPIRAL ',
          label: 'Espiral',
          code: `
                if spiral_button.onclick()
              `,
          original: "palette1"
        },
        {
          value: 'Se apertar o quadrante LIXA ',
          label: 'Lixa',
          code: 'a',
          original: 'palette1'
        },
        {
          value: 'Se apertar o quadrante GRAMA ',
          label: 'Grama',
          code: 'a',
          original: 'palette1'
        }
      ]
    },
    palette2: {
      title: "Exibir um(a)",
      cards: [
        {
          value: 'exibir uma imagem ',
          label: 'Imagem',
          code: 'a',
          original: 'palette2'
        },
        {
          value: 'tocar um som ',
          label: 'Som',
          code: 'a',
          original: 'palette2'
        }
      ]
    },
    palette3: {
      title: "Imagens",
      cards: [
        {
          value: 'de uma melancia',
          label: 'Melancia',
          code: 'a',
          original: 'palette3'
        },
        {
          value: 'de uma maçã',
          label: 'Maçã',
          code: 'a',
          original: 'palette3'
        },
        {
          value: 'de uma vaca',
          label: 'Vaca',
          code: 'a',
          original: 'palette3'
        },
        {
          value: 'de um boi',
          label: 'Boi',
          code: 'a',
          original: 'palette3'
        }
      ]
    },
    result: {
      title: "Resultado",
      cards: []
    }
  };



  const [tasks, setTasks] = useState(initialTasks);

  const onDragEnd = (result) => {

    const { source, destination } = result;

    console.log(tasks[source.droppableId].cards[source.index].original)

    // ele verifica se vc ta arrastando pra um lugar inválido. um lugar inválido seria: nenhuma área (draggable) ou alguma área que não seja nem a de origem, nem o resultado. ex de caso válido: um card que tá no quadrantes só pode mover pro resultado e quando movido, só poderá voltar pro quadrantes. Se essa regra não for seguida, ele cai aqui e só volta pra onde saiu
    if (!destination || (destination.droppableId !== "result" && destination.droppableId !== tasks[source.droppableId].cards[source.index].original)) {
      return;
    }  else {
      // se cair no else, signifca que atendeu à regra anterior e foi ou pro local onde ele tava no início de tudo, ou pro result

      tasks[destination.droppableId].cards.splice(destination.index, 0, tasks[source.droppableId].cards[source.index]);
      tasks[source.droppableId].cards = tasks[source.droppableId].cards.filter(item => item !== tasks[source.droppableId].cards[source.index])
      
      setTasks({
        ...tasks,
      });

    }
  };

  return (
    <div>
      <DragDropContext onDragEnd={onDragEnd}>
        {Object.entries(tasks).map(([id, tasks]) => (
          <div key={id}>
            <h3>{tasks.title}</h3>
            <Droppable droppableId={id} direction="horizontal">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  style={{ display: 'flex', minHeight: '50px', padding: '2px', background: id === 'palette1' ? 'lightblue' : 'lightgreen', overflowX: 'auto', margin: '10px' }}
                >
                  {tasks.cards.map((task, index) => (
                    <Draggable key={task.label} draggableId={task.label} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={{
                            ...provided.draggableProps.style,
                            margin: '10px',
                            padding: '10px',
                            backgroundColor: 'lightgrey',
                            minWidth: '100px',
                          }}
                        >
                          {
                            id === "result" ? task.value : task.label
                          }
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        ))}
        <Button
          value='Exibir código'
          variant='primary'
          onClick={() => { tasks["result"].cards.map(item => console.log(item.code)) }}
        />
      </DragDropContext>
    </div>
  );
}

export default DragDrop;
