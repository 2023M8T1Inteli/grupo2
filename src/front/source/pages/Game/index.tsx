import React, { useState, useCallback } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Button from "../../components/Button";
import { AutoRedirect } from "../../contexts/AuthContext";
import axios from "axios";

const initialTasks = {
  palette1: {
    title: "Quadrantes",
    cards: [
      {
        value: "Se apertar o quadrante ESPIRAL ",
        label: "Espiral",
        code: `botao_pressionado = ler_varios(4, 1, 0)\nse botao_pressionado entao\ninicio\n`,
        original: "palette1",
      },
      {
        value: "Se apertar o quadrante LIXA ",
        label: "Lixa",
        code: `botao_pressionado = ler_varios(1, 1, 0)\nse botao_pressionado entao\ninicio\n`,
        original: "palette1",
      },
      {
        value: "Se apertar o quadrante GRAMA ",
        label: "Grama",
        code: `botao_pressionado = ler_varios(2, 1, 0)\nse botao_pressionado entao\ninicio\n`,
        original: "palette1",
      },
    ],
  },
  palette2: {
    title: "Exibir um(a)",
    cards: [
      {
        value: "exibir uma imagem ",
        label: "Imagem",
        code: "mostrar(",
        original: "palette2",
      },
      {
        value: "tocar um som ",
        label: "Som",
        code: "1)\nfim",
        original: "palette2",
      },
    ],
  },
  palette3: {
    title: "Imagens",
    cards: [
      {
        value: "de uma melancia",
        label: "Melancia",
        code: "1)\nfim",
        original: "palette3",
      },
      {
        value: "de uma maçã",
        label: "Maçã",
        code: "2)\nfim",
        original: "palette3",
      },
      {
        value: "de uma vaca",
        label: "Vaca",
        code: "3)\nfim",
        original: "palette3",
      },
      {
        value: "de um boi",
        label: "Boi",
        code: "4)\nfim",
        original: "palette3",
      },
    ],
  },
  result: {
    title: "Resultado",
    cards: [],
  },
};

function DragDrop() {
  const [tasks, setTasks] = useState(initialTasks);
  const [result, setResult] = useState("");
  const onDragEnd = useCallback(
    (result) => {
      const { source, destination } = result;

      if (
        !destination ||
        (destination.droppableId !== "result" &&
          destination.droppableId !==
            tasks[source.droppableId].cards[source.index].original)
      ) {
        return;
      } else {
        const newTasks = { ...tasks };
        newTasks[destination.droppableId].cards.splice(
          destination.index,
          0,
          tasks[source.droppableId].cards[source.index],
        );
        newTasks[source.droppableId].cards = newTasks[
          source.droppableId
        ].cards.filter(
          (item) => item !== tasks[source.droppableId].cards[source.index],
        );

        setTasks(newTasks);
      }
    },
    [tasks],
  );

  const renderTask = useCallback(
    (task, index, id) => (
      <Draggable key={task.label} draggableId={task.label} index={index}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={{
              ...provided.draggableProps.style,
              margin: "10px",
              padding: "10px",
              backgroundColor: "lightgrey",
              minWidth: "100px",
            }}
          >
            {id === "result" ? task.value : task.label}
          </div>
        )}
      </Draggable>
    ),
    [],
  );

  const codeBuilder = () => {
    const header = 'programa "mostra_imagem":\ninicio\n';
    const footer = "\nfim.";
    const code = tasks["result"].cards.reduce((acc, item) => {
      return acc + item.code;
    }, "");

    const finalCode = header + code + footer;
    console.log(finalCode);
    return finalCode;
  };

  const processCodeBridge = window.electron.codeBridge.processCode;

  const processCode = async () => {
    const finalCode = codeBuilder();
    const compilerResult = await processCodeBridge(finalCode);
    setResult(compilerResult.result);
    alert(`Resultado do código: ${compilerResult.result}`);
  };

  return (
    <div>
      <p>
        <Button
          variant="back"
          onClick={() => {
            console.log("A");
          }}
        />
      </p>
      <DragDropContext onDragEnd={onDragEnd}>
        {Object.entries(tasks).map(([id, taskGroup]) => (
          <div key={id}>
            <h3>{taskGroup.title}</h3>
            <Droppable droppableId={id} direction="horizontal">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  style={{
                    display: "flex",
                    minHeight: "50px",
                    padding: "2px",
                    background: id === "palette1" ? "lightblue" : "lightgreen",
                    overflowX: "auto",
                    margin: "10px",
                  }}
                >
                  {taskGroup.cards.map((task, index) =>
                    renderTask(task, index, id),
                  )}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        ))}
        <Button
          value="Exibir código"
          variant="primary"
          onClick={() => {
            processCode();
          }}
        />
      </DragDropContext>
    </div>
  );
}

export default DragDrop;
