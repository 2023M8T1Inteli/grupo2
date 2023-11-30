import QtQuick 6.2
import QtQuick.Layouts
import QtQuick.Controls
import "../listModels"
import "../components"

// Projects Area definition
Rectangle {
    id: rectangle
    anchors.fill: parent
    color: root.white // Accessible color

    GridLayout {
          anchors.fill: parent
          columns: 2
          rows: 2


      // Navbar
          NavBar {
               Layout.columnSpan: 2
          }

    // Responsive column layout
    ColumnLayout {
        Layout.fillHeight: true
        Layout.fillWidth: true
        Layout.columnSpan: 2
        spacing: root.height / 14

        // Responsive column layout for elements in the page
        ColumnLayout {
            Layout.fillWidth: true
            Layout.fillHeight: true
            Layout.alignment: Qt.AlignCenter
            spacing: 110

            // Responsive layout for the icons
            RowLayout {
                anchors.horizontalCenter: parent.horizontalCenter
                // Title card
                Text {
                    height: 40
                    Layout.fillWidth: true
                    text: "Projetos"
                    font.pixelSize: 36
                    font.bold: true
                    horizontalAlignment: Text.AlignHCenter
                    verticalAlignment: Text.AlignVCenter
                }


            }

            // Responsive Grid View
            GridView {
                highlight: highlight
                highlightFollowsCurrentItem: false
                focus: true
                clip: true
                Layout.fillWidth: true
                Layout.fillHeight: true
                cellWidth: 240
                cellHeight: 190
                model: ProjectModel {} // Project data structure
                delegate: // For each data entry
                    Item {
                        width: parent.cellWidth
                        height: parent.cellHeight
                        // Area definition
                        Rectangle {
                            width: 220
                            height: 170
                            border.color: root.gray
                            border.width: 2
                            radius: 16
                            // Column with project info
                            Column {
                                width: parent.width
                                spacing: 5
                                anchors.centerIn: parent
                                // Project name
                                Text {
                                    text: name
                                    font.pixelSize: 23
                                    font.weight: 700
                                    anchors.horizontalCenter: parent.horizontalCenter
                                }
                                // Author info
                                Text {
                                    text: "por " + author
                                    font.weight: 500
                                    anchors.horizontalCenter: parent.horizontalCenter
                                }
                                // Created info
                                Text {
                                    color: "#6e6e73"
                                    text: "Criado em " + created_at
                                    anchors.horizontalCenter: parent.horizontalCenter
                                }
                            // Button that plays the game
                            Button {
                                id: playButton
                                anchors.horizontalCenter: parent.horizontalCenter
                                height: 42
                                background:
                                    Rectangle {
                                        anchors.horizontalCenter: parent.horizontalCenter
                                        color: root.primaryColor
                                        radius: 8
                                        width: 82
                                        Image {
                                            id: playImage
                                            anchors.centerIn: parent
                                            Accessible.name: "Botão de jogar"
                                            Accessible.description: "Botão triangular angulado em 90 graus para a direita com o intuito de começar o jogo."
                                            source: "../img/play.png"
                                            scale: 1
                                            smooth: true
                                            Behavior on scale {
                                                NumberAnimation {
                                                    duration: 100
                                                }
                                            }
                                        }
                                    }
                                // Clickable area for moving to next scene
                                MouseArea {
                                    anchors.fill: parent
                                    hoverEnabled: true
                                    cursorShape: Qt.PointingHandCursor
                                    onEntered: playImage.scale = 1.2
                                    onExited: playImage.scale = 1
                                    onClicked: {
                                        navigationStack.push(patientsScreen)
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
}