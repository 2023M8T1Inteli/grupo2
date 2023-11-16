import QtQuick
import QtQuick.Layouts
import QtQuick.Controls
import "../components"


Rectangle {
    anchors.fill: parent
    color: root.white

    // Functions
    function addRectangle() {
        var newId = listModel.count > 0 ? listModel.get(listModel.count - 1).Id + 1 : 0;
        listModel.append({"Id": newId});
    }

    GridLayout {
        anchors.fill: parent
        columns: 2
        rows: 2


        // Navbar
        NavBar {
            Layout.columnSpan: 2
        }


        Rectangle {
            Layout.columnSpan: 2
            Layout.fillHeight: true
            Layout.fillWidth: true
            // Modal for adding new objects into slide
            Rectangle {
                id: modal
                width: parent.width // Responsive dimensions
                height: parent.height // Responsive dimensions
                color: "#cc000000"
                visible: false // Modal starts off as invisible
                z: 1

                // Area of the components
                Rectangle {
                    width: parent.width * 0.8
                    height: parent.height * 0.8
                    color: "#D9D9D9"
                    anchors.centerIn: parent

                    // Column arrangement of different classes of elements
                    Column {

                        width: parent.width
                        height: parent.height * 0.9
                        anchors.centerIn: parent

                        // First class, buttons for adding elements
                        Rectangle {
                            width: parent.width * 0.9
                            height: parent.height * 0.33
                            color: "#D9D9D9"

                            anchors.horizontalCenter: parent.horizontalCenter
                            // View with overflow horizontally
                            ScrollView {
                                anchors.fill: parent
                                clip: true

                                // Listing elements side-by-side
                                ListView {
                                    spacing: 20
                                    boundsBehavior: Flickable.StopAtBounds
                                    orientation: ListView.Horizontal

                                    // Data arrangement for elements
                                    model: ListModel {
                                        id: listModelo
                                        ListElement {
                                            Id: 0
                                            texto: "Inserir Imagem"
                                            nome: "Icone de imagem"
                                            descricao: "Desenho de horizonte para adicionar imagens"
                                            imagem: "../img/image-solid.svg"
                                        }
                                        ListElement {
                                            Id: 0
                                            texto: "Adicionar Texto"
                                            nome: "Icone de Texto"
                                            descricao: "Desenho da letra A para adicionar texto"
                                            imagem: "../img/font-solid.svg"
                                        }
                                    }
                                    // Element info
                                    delegate: Rectangle {
                                        width: parent.parent.width * 0.2
                                        height: parent.parent.height * 0.8
                                        border.width: 2
                                        radius: 10
                                        border.color: "#C83A61"
                                        // Icon of the button
                                        Image {
                                            width: parent.width * 0.5
                                            height: parent.height * 0.2
                                            anchors.centerIn: parent
                                            source: imagem
                                            fillMode: Image.PreserveAspectFit
                                            Accessible.name: nome
                                            Accessible.description: descricao
                                        }
                                        // Name of the button
                                        Text {
                                            text: texto
                                            width: parent.width
                                            height: parent.height
                                            font.pixelSize: parent.width * 0.1
                                            horizontalAlignment: Text.AlignHCenter
                                            verticalAlignment: Text.AlignBottom
                                        }

                                    }
                                }
                            }

                        }
                        // Second class, images that have been already uploaded
                        Rectangle {
                            width: parent.width * 0.9
                            height: parent.height * 0.33
                            color: "#ffffff"
                            radius: 10
                            anchors.horizontalCenter: parent.horizontalCenter


                            Text {
                                text: "IMAGENS"
                                width: parent.width
                                height: parent.height
                                font.pixelSize: parent.height * 0.1
                            }

                        }
                        // Third class, default forms
                        Rectangle {
                            width: parent.width * 0.9
                            height: parent.height * 0.33
                            anchors.horizontalCenter: parent.horizontalCenter
                            radius: 10
                            color: "#ffffff"

                            Text {
                                text: "FORMAS"
                                width: parent.width
                                height: parent.height
                                font.pixelSize: parent.height * 0.1
                            }
                        }

                    }
                }

                // Sets up the entire modal as a clickable area, that closes it.
                MouseArea {
                    anchors.fill: parent
                    onClicked: modal.visible = false
                }
            }

            // Division of the screen in two rows
            Row {
                width: parent.width
                height: parent.height // Some margin

                // Column with information to the left
                Column {
                    width: parent.width * 0.2
                    height: parent.height
                    spacing: parent.height * 0.1

                    // Header text area
                    Rectangle {
                        height: parent.height * 0.2
                        width: parent.width

                        Text {
                            width: parent.width
                            height: parent.height
                            text: "Cenas"
                            font.pixelSize: parent.width * 0.2
                            horizontalAlignment: Text.AlignHCenter
                            verticalAlignment: Text.AlignBottom
                        }
                    }

                    // Slides area
                    Rectangle {
                        height: parent.height * 0.50
                        width: parent.width

                        // Slides are overflowable
                        ScrollView {
                            anchors.fill: parent
                            clip: true

                            // Sets up a dynamic list for items
                            ListView {
                                spacing: 20
                                anchors.fill: parent
                                boundsBehavior: Flickable.StopAtBounds
                                model: ListModel {
                                    id: listModel
                                    ListElement {
                                        Id: 0
                                    }
                                }
                                delegate: Rectangle {
                                    width: parent.width * 0.8
                                    height: parent.parent.height * 0.4
                                    border.width: 2
                                    radius: 10
                                    anchors.horizontalCenter: parent.horizontalCenter
                                    border.color: "#C83A61"
                                }
                            }
                        }
                    }

                    // Add new slides
                    Rectangle {
                        height: parent.height * 0.2
                        width: parent.width
                        Button {
                            height: parent.height * 0.25
                            width: parent.width * 0.8
                            text: "+"
                            anchors.top: parent.top
                            anchors.topMargin: 0
                            anchors.horizontalCenter: parent.horizontalCenter

                            MouseArea {
                                anchors.fill: parent
                                onClicked: {
                                    addRectangle();
                                }
                            }

                        }
                    }
                }

                // Column with information filling the remainder of the screen
                Column {
                    width: parent.width * 0.8
                    height: parent.height
                    spacing: parent.height * 0.05

                    // Play button area
                    Rectangle {
                        width: parent.width * 0.9
                        height: parent.height * 0.2
                        anchors.horizontalCenter: parent.horizontalCenter
                        // Play button
                        Button {
                            height: parent.height * 0.25
                            width: parent.width * 0.05
                            anchors.verticalCenter: parent.verticalCenter
                            anchors.verticalCenterOffset: parent.height * 0.475
                            anchors.horizontalCenterOffset: parent.width * 0.475
                            anchors.horizontalCenter: parent.horizontalCenter
                            hoverEnabled: false
                            background: Image {
                                source: "../img/play-solid.svg"
                                fillMode: Image.PreserveAspectFit
                                Accessible.name: "Botão de jogar"
                                Accessible.description: "Botão triangular angulado em 90 graus para a direita com o intuito de começar o jogo."
                            }
                        }
                    }

                    // Slide view
                    Rectangle {
                        width: parent.width * 0.9
                        height: parent.height * 0.55
                        border.width: 2
                        border.color: "#D9D9D9"
                        anchors.horizontalCenter: parent.horizontalCenter

                        // Click on slide to add elements
                        MouseArea {
                            anchors.fill: parent
                            onClicked: modal.visible = true // Opens up modal
                        }

                    }

                    // Block editing area
                    // Block editing area
                    Rectangle {
                        width: parent.width * 0.9
                        height: parent.height * 0.15
                        anchors.horizontalCenter: parent.horizontalCenter

                        Rectangle {
                            id: button
                            width: parent.width * 0.175
                            height: parent.height * 0.45
                            anchors.verticalCenter: parent.verticalCenter
                            anchors.horizontalCenterOffset: parent.width * 0.415
                            anchors.verticalCenterOffset: -parent.height * 0.4
                            anchors.horizontalCenter: parent.horizontalCenter
                            radius: 10
                            border.width: 2
                            color: "#9DC7C8"

                            Text {
                                text: "EDITAR BLOCOS"
                                anchors.verticalCenter: parent.verticalCenter
                                anchors.horizontalCenter: parent.horizontalCenter
                                font.pixelSize: parent.width * 0.1
                                font.bold: true
                            }

                            MouseArea {
                                id: mouseArea
                                anchors.fill: parent
                                hoverEnabled: true
                                cursorShape: mouseArea.containsMouse ? Qt.PointingHandCursor : Qt.ArrowCursor

                                onEntered: {
                                    button.color = "#7FB1B3";
                                }

                                onExited: {
                                    button.color = "#9DC7C8";
                                }

                                onClicked: {
                                    navigationStack.push(codeScreen);
                                }

                            }
                        }
                    }
                }
            }
        }
    }
}

