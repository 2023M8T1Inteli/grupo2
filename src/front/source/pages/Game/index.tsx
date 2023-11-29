import React, { useState, useCallback } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Button from '../../components/Button';
import { AutoRedirect } from '../../contexts/AuthContext';

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

function DragDrop() {
  
  const [tasks, setTasks] = useState(initialTasks);

  const onDragEnd = useCallback((result) => {
    const { source, destination } = result;

    if (!destination || (destination.droppableId !== "result" && destination.droppableId !== tasks[source.droppableId].cards[source.index].original)) {
      return;
    } else {
      const newTasks = { ...tasks };
      newTasks[destination.droppableId].cards.splice(destination.index, 0, tasks[source.droppableId].cards[source.index]);
      newTasks[source.droppableId].cards = newTasks[source.droppableId].cards.filter(item => item !== tasks[source.droppableId].cards[source.index]);
      
      setTasks(newTasks);
    }
  }, [tasks]);

  const renderTask = useCallback((task, index, id) => (
    <Draggable key={task.label} draggableId={task.label} index={index}>
      <AutoRedirect />
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
          {id === "result" ? task.value : task.label}
        </div>
      )}
    </Draggable>
  ), []);

  return (
    <div>
      <DragDropContext onDragEnd={onDragEnd}>
        {Object.entries(tasks).map(([id, taskGroup]) => (
          <div key={id}>
            <h3>{taskGroup.title}</h3>
            <Droppable droppableId={id} direction="horizontal">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  style={{ display: 'flex', minHeight: '50px', padding: '2px', background: id === 'palette1' ? 'lightblue' : 'lightgreen', overflowX: 'auto', margin: '10px' }}
                >
                  {taskGroup.cards.map((task, index) => renderTask(task, index, id))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        ))}
        <Button
          value='Exibir código'
          variant='primary'
          onClick={() => { tasks["result"].cards.forEach(item => console.log(item.code)) }}
        />
      </DragDropContext>
    </div>
  );
}

export default DragDrop;
