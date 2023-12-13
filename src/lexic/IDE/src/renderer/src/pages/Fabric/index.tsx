// Tela de programação em blocos, projetada para ser utilizada pela terapeuta.
// Inclui:
// - Uso do pacote `react-beautiful-dnd` para funcionalidades de arrastar e soltar.
// - Estado inicial com tarefas pré-definidas divididas em diferentes paletas.
// - Função `onDragEnd` para lidar com a lógica de arrastar e soltar entre as paletas.
// - Função `renderTask` para renderizar tarefas arrastáveis individualmente.
// - Construção de código a partir das tarefas arrastadas para a paleta de resultado.
// - Botão para exibir o código gerado e processá-lo com a lógica de compilação. (integrado com o compilador em python)
// - Estilização através do arquivo `styles.css`.

import React, { useState, useEffect, useRef } from "react";
import Button from "../../components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircle,
  faSquare,
  faImage,
  faSlash,
  faFont,
  faTrash,
  faCaretUp,
  faDownload,
  faSave,
} from "@fortawesome/free-solid-svg-icons";
import { fabric } from "fabric";
import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";
import "./styles.css";

const serializeCanvas = (editor?) => {
  const canvas = editor?.canvas;
  const serializedCanvas = JSON.stringify(canvas);
  return serializedCanvas;
}

const loadCanvas = (editor?, serializedCanvas?) => {
  const canvas = editor?.canvas;
  canvas.loadFromJSON(serializedCanvas, canvas.renderAll.bind(canvas));
}

function FabricPage() {
  const [color, setColor] = useState("#35363a");
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");
  const [selectedImage, setSelectedImage] = useState(null);
  const { editor, onReady } = useFabricJSEditor();

  const fileInputRef = useRef(null);

  // Function to handle image file selection
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setSelectedImage(URL.createObjectURL(img));
      addImageToCanvas(URL.createObjectURL(img));
    }
  };

  // Function to add image to canvas
  const addImageToCanvas = (imageURL) => {
    fabric.Image.fromURL(imageURL, function (oImg) {
      editor?.canvas.add(oImg);
    });
  };

  const onAddCircle = () => {
    const circle = new fabric.Circle({
      radius: 20,
      fill: color,
      left: 100,
      top: 100,
    });

    // Add the group to the canvas
    editor?.canvas.add(circle);
  };
  const onAddRectangle = () => {
    editor?.addRectangle();
  };

  // add for all available forms
  const onAddTriangle = () => {
    const triangle = new fabric.Triangle({
      width: 20,
      height: 30,
      fill: color,
      left: 50,
      top: 50,
    });
    editor?.canvas.add(triangle);
  };

  const onAddLine = () => {
    const line = new fabric.Line([50, 100, 200, 200], {
      fill: color,
      stroke: color,
      strokeWidth: 5,
    });
    editor?.canvas.add(line);
  };

  const onClearRectangle = () => {
    editor?.deleteAll();
  };

  const onAddEditableText = () => {
    editor?.addText("I'm a normal text");
  };

  const onGenerateImageFromCanvas = () => {
    const img_data = editor?.canvas.toDataURL({
      format: "png",
      quality: 0.8,
      multiplier: 2,
    });

    // download image
    const link = document.createElement("a");
    link.href = img_data;
    link.download = "image.png";
    link.click();
  };

  const onSaveScene = () => {
    const serializedCanvas = serializeCanvas(editor);
    localStorage.setItem("canvas", serializedCanvas);
    editor?.canvas.clear();
    // wait for 5 seconds
    setTimeout(() => {
      loadCanvas(editor, serializedCanvas);
    }, 5000);
  }

  const handleDivKeyPressed = (e: any) => {
    switch (e.key) {
      case "Delete":
        editor?.canvas.remove(editor?.canvas.getActiveObject());
        break;

      default:
        break;
    }
  };

  // Drag start handler for shapes
  const onDragStart = (event, shape) => {
    event.dataTransfer.setData("shape", shape);
  };

  // Drop handler for canvas
  const onDrop = (event) => {
    event.preventDefault();
    const canvasRect = editor?.canvas.getElement().getBoundingClientRect();
    const zoom = editor?.canvas.getZoom();
    const x = (event.clientX - canvasRect.left) / zoom;
    const y = (event.clientY - canvasRect.top) / zoom;
    const shape = event.dataTransfer.getData("shape");
    addShapeToCanvas(shape, x, y);
  };

  // Function to add shape to canvas based on type
  const addShapeToCanvas = (shape, x, y) => {
    let fabricObject;
    let width;
    let height;
    switch (shape) {
      case "circle":
        let radius = 60;
        fabricObject = new fabric.Circle({
          radius: radius,
          fill: color,
          left: x - radius, // Adjust x coordinate to center
          top: y - radius, // Adjust y coordinate to center
          originX: "center",
          originY: "center",
        });
        break;
      case "rectangle":
        width = 80;
        height = 80;
        fabricObject = new fabric.Rect({
          width: width,
          height: height,
          fill: color,
          left: x - width / 2, // Adjust x coordinate to center
          top: y - height / 2, // Adjust y coordinate to center
          originX: "center",
          originY: "center",
        });
        break;
      case "triangle":
        width = 60;
        height = 60;
        fabricObject = new fabric.Triangle({
          width: width,
          height: height,
          fill: color,
          left: x - width / 2, // Adjust x coordinate to center
          top: y - height / 2, // Adjust y coordinate to center
          originX: "center",
          originY: "center",
        });
        break;
      case "line":
        fabricObject = new fabric.Line([x, y, x + 50, y], {
          stroke: color,
          strokeWidth: 5,
          originX: "center",
          originY: "center",
        });
        break;
      case "text":
        fabricObject = new fabric.Textbox("Text", {
          fontSize: 72,
          fill: color,
          left: x,
          top: y - 10, // Adjust y coordinate to place text baseline at pointer
          originX: "center",
          originY: "center",
        });
        break;
      // handle other shapes
      // ...
    }
    if (fabricObject) {
      fabricObject.set({ left: x, top: y });
      editor?.canvas.add(fabricObject);
    }
  };

  useEffect(() => {
    if (!editor || !fabric) {
      return;
    }
    editor.canvas.freeDrawingBrush.color = color;
    editor.canvas.preserveObjectStacking = true;
    editor.setStrokeColor(color);
    editor.setFillColor(color);
    editor.canvas.backgroundColor = backgroundColor;

    let deleteIcon =
      "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3Csvg version='1.1' id='Ebene_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='595.275px' height='595.275px' viewBox='200 215 230 470' xml:space='preserve'%3E%3Ccircle style='fill:%23F44336;' cx='299.76' cy='439.067' r='218.516'/%3E%3Cg%3E%3Crect x='267.162' y='307.978' transform='matrix(0.7071 -0.7071 0.7071 0.7071 -222.6202 340.6915)' style='fill:white;' width='65.545' height='262.18'/%3E%3Crect x='266.988' y='308.153' transform='matrix(0.7071 0.7071 -0.7071 0.7071 398.3889 -83.3116)' style='fill:white;' width='65.544' height='262.179'/%3E%3C/g%3E%3C/svg%3E";
    var cloneIcon =
      "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='iso-8859-1'%3F%3E%3Csvg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 55.699 55.699' width='100px' height='100px' xml:space='preserve'%3E%3Cpath style='fill:%23010002;' d='M51.51,18.001c-0.006-0.085-0.022-0.167-0.05-0.248c-0.012-0.034-0.02-0.067-0.035-0.1 c-0.049-0.106-0.109-0.206-0.194-0.291v-0.001l0,0c0,0-0.001-0.001-0.001-0.002L34.161,0.293c-0.086-0.087-0.188-0.148-0.295-0.197 c-0.027-0.013-0.057-0.02-0.086-0.03c-0.086-0.029-0.174-0.048-0.265-0.053C33.494,0.011,33.475,0,33.453,0H22.177 c-3.678,0-6.669,2.992-6.669,6.67v1.674h-4.663c-3.678,0-6.67,2.992-6.67,6.67V49.03c0,3.678,2.992,6.669,6.67,6.669h22.677 c3.677,0,6.669-2.991,6.669-6.669v-1.675h4.664c3.678,0,6.669-2.991,6.669-6.669V18.069C51.524,18.045,51.512,18.025,51.51,18.001z M34.454,3.414l13.655,13.655h-8.985c-2.575,0-4.67-2.095-4.67-4.67V3.414z M38.191,49.029c0,2.574-2.095,4.669-4.669,4.669H10.845 c-2.575,0-4.67-2.095-4.67-4.669V15.014c0-2.575,2.095-4.67,4.67-4.67h5.663h4.614v10.399c0,3.678,2.991,6.669,6.668,6.669h10.4 v18.942L38.191,49.029L38.191,49.029z M36.777,25.412h-8.986c-2.574,0-4.668-2.094-4.668-4.669v-8.985L36.777,25.412z M44.855,45.355h-4.664V26.412c0-0.023-0.012-0.044-0.014-0.067c-0.006-0.085-0.021-0.167-0.049-0.249 c-0.012-0.033-0.021-0.066-0.036-0.1c-0.048-0.105-0.109-0.205-0.194-0.29l0,0l0,0c0-0.001-0.001-0.002-0.001-0.002L22.829,8.637 c-0.087-0.086-0.188-0.147-0.295-0.196c-0.029-0.013-0.058-0.021-0.088-0.031c-0.086-0.03-0.172-0.048-0.263-0.053 c-0.021-0.002-0.04-0.013-0.062-0.013h-4.614V6.67c0-2.575,2.095-4.67,4.669-4.67h10.277v10.4c0,3.678,2.992,6.67,6.67,6.67h10.399 v21.616C49.524,43.26,47.429,45.355,44.855,45.355z'/%3E%3C/svg%3E%0A";
    let deleteImg = new Image();
    deleteImg.src = deleteIcon;

    let cloneImg = new Image();
    cloneImg.src = cloneIcon;

    function deleteObject(_, transform) {
      var target = transform.target;
      var canvas = target.canvas;
      canvas.remove(target);
      canvas.requestRenderAll();
    }

    function cloneObject(_, transform) {
      var target = transform.target;
      var canvas = target.canvas;
      target.clone(function (cloned) {
        cloned.left += 10;
        cloned.top += 10;
        canvas.add(cloned);
      });
    }

    function renderIcon(icon) {
      return function renderIcon(ctx, left, top, styleOverride, fabricObject) {
        var size = this.cornerSize;
        ctx.save();
        ctx.translate(left, top);
        ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));
        ctx.drawImage(icon, -size / 2, -size / 2, size, size);
        ctx.restore();
      };
    }

    fabric.Object.prototype.controls.deleteControl = new fabric.Control({
      x: 0.5,
      y: -0.4,
      offsetY: 16,
      cursorStyle: "pointer",
      mouseUpHandler: deleteObject,
      render: renderIcon(deleteImg),
      cornerSize: 24,
    });

    fabric.Object.prototype.controls.clone = new fabric.Control({
      x: -0.5,
      y: -0.5,
      offsetY: -16,
      offsetX: -16,
      cursorStyle: "pointer",
      mouseUpHandler: cloneObject,
      render: renderIcon(cloneImg),
      cornerSize: 24,
    });

    fabric.Textbox.prototype.controls.deleteControl = new fabric.Control({
      x: 0.5,
      y: -1.2,
      offsetY: 16,
      cursorStyle: "pointer",
      mouseUpHandler: deleteObject,
      render: renderIcon(deleteImg),
      cornerSize: 24,
    });

    fabric.Textbox.prototype.controls.clone = new fabric.Control({
      x: -0.5,
      y: -0.5,
      offsetY: -16,
      offsetX: -16,
      cursorStyle: "pointer",
      mouseUpHandler: cloneObject,
      render: renderIcon(cloneImg),
      cornerSize: 24,
    });
  }, [color, backgroundColor]);

  React.useEffect(() => {
    window.addEventListener("keydown", handleDivKeyPressed);
    setColor("aaa");
    // cleanup this component
    return () => {
      window.removeEventListener("keydown", handleDivKeyPressed);
    };
  }, []);

  return (
    <div className="main">
      <div className="format-buttons">
        <button draggable onDragStart={(e) => onDragStart(e, "circle")}>
          <FontAwesomeIcon icon={faCircle} className="fa-icon" />
        </button>
        <button draggable onDragStart={(e) => onDragStart(e, "rectangle")}>
          <FontAwesomeIcon icon={faSquare} className="fa-icon" />
        </button>
        <button draggable onDragStart={(e) => onDragStart(e, "triangle")}>
          <FontAwesomeIcon icon={faCaretUp} className="fa-icon" />
        </button>
        <button draggable onDragStart={(e) => onDragStart(e, "line")}>
          <FontAwesomeIcon icon={faSlash} className="fa-icon" />
        </button>
        <button draggable onDragStart={(e) => onDragStart(e, "text")}>
          <FontAwesomeIcon icon={faFont} className="fa-icon" />
        </button>
       

        <button onClick={() => fileInputRef.current && fileInputRef.current.click()}>
          <input
            type="file"
            ref={fileInputRef}
            onChange={onImageChange}
            style={{ display: "none" }}
          />
          <FontAwesomeIcon icon={faImage} className="fa-icon" />
        </button>
        <div className="color-picker">
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
        </div>
        <div className="color-picker">
          <input
            type="color"
            value={backgroundColor}
            onChange={(e) => setBackgroundColor(e.target.value)}
          />
        </div>
        <button className="clear-button" onClick={onClearRectangle}>
          <FontAwesomeIcon icon={faTrash} className="fa-icon" /> Limpar
        </button>

         <button onClick={onGenerateImageFromCanvas}>
          <FontAwesomeIcon icon={faDownload} className="fa-icon" />
          Gerar Imagem
        </button>

        <button onClick={onSaveScene}>
          <FontAwesomeIcon icon={faSave} className="fa-icon" />
          Salvar Cena
        </button>
      </div>
      <div
        className="canvas-container"
        onDragOver={(e) => e.preventDefault()}
        onDrop={onDrop}
      >
        <FabricJSCanvas className="sample-canvas" onReady={onReady} />
      </div>
    </div>
  );
}

export default FabricPage;
