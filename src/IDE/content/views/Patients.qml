import QtQuick 6.2
import QtQuick.Layouts
import QtQuick.Controls
import "../listModels"

Rectangle {
    id: rectangle
    width: parent.width
    height: parent.height
    color: root.white // Accessible white color

    // Responsive Column Layout

    ColumnLayout {
        anchors.fill: parent
        spacing: root.height / 30 // Spacing between elements

        // Bar-like Rectangle
        Rectangle {
            Layout.fillWidth: true
            height: 60
            color: root.primaryColor // Primary color with careful contrast
        }


        // Modal to Add patients
        AddPatientModal {
           id: patientModal
           onAddNewPatient: {
            patientModel.insert(1, {name, age, portrait: "../img/patient.png"})
           } // New patient function
        }

        // Header navigation bar layout
        ColumnLayout {
            Layout.fillWidth: true
            Layout.fillHeight: true
            Layout.alignment: Qt.AlignCenter
            spacing: 110


            // Layout for the elements in navigation bar
            RowLayout {
                Layout.margins: 70
                anchors.horizontalCenter: parent.horizontalCenter

                // Back button
                Button {
                    implicitWidth: 64
                    height: 48
                    Layout.alignment: Qt.AlignHCenter
                    background:
                        // Area of the back button image
                        Rectangle {
                            implicitWidth: 64
                            implicitHeight: 48
                            radius:6
                            color: root.primaryColor
                            anchors.centerIn: parent

                            // Image for the back button
                            Image {
                                anchors.centerIn: parent
                                Accessible.name: "Seta para trás"
                                Accessible.description: "Seta para trás para indicar que é possível voltar de página"
                                source: "../img/back.png"
                            }
                        }

                    onClicked: {
                        // Handle login action
                    }

                }

                // Header name
                Text {
                    height: 40
                    Layout.fillWidth: true
                    text: "Pacientes"
                    font.pixelSize: root.titleText
                    font.bold: true
                    horizontalAlignment: Text.AlignHCenter
                    verticalAlignment: Text.AlignVCenter
                }

                // Image for the settings button
                Image {
                    height: 48
                    width: 48
                    source: "../img/settings.png"
                    Accessible.name: "Desenho de engrenagem"
                    Accessible.description: "Desenho de engrenagem para indicar a tela de opções"
                }
            }

            // Responsive view that can overflow and set up a scrollbar
            ScrollView {
                Layout.fillWidth: true
                Layout.fillHeight: true
                Layout.margins: 70

                // Responsive view in a grid arrangement
                GridView {
                    Layout.margins: 70
                    Layout.fillWidth: true
                    Layout.fillHeight: true
                    cellWidth: 240
                    cellHeight: 260
                    model:
                        // Data type for a patient
                        PatientModel {
                            id: patientModel
                        }
                    delegate:
                        // For each patient, the following will be added
                        Item {
                            width: parent.cellWidth
                            height: parent.cellHeight

                            // Area of the patient's data
                            Rectangle {
                                width: 220
                                height: 220
                                border.color: root.gray
                                border.width: 2
                                radius: 16
                                // Column arrangement for the information
                                Column {
                                    visible: !isAddButton
                                    width: parent.width
                                    spacing: 5
                                    anchors.centerIn: parent
                                    // Image of the child
                                    Image {
                                        source: portrait
                                        height: 155
                                        width: parent.width
                                        fillMode: Image.PreserveAspectCrop
                                        Accessible.name: "Imagem da criança"
                                        Accessible.description: "Imagem da criança que foi registrada."
                                    }
                                    // Name of the child
                                    Text {
                                        text: name
                                        font.pixelSize: 23
                                        font.weight: Font.Bold
                                        leftPadding: 16
                                    }
                                    // Age of the child
                                    Text {
                                        text: isAddButton ? "" : age + " anos"
                                        font.pixelSize: 18
                                        color: "#6e6e73"
                                        leftPadding: 16
                                    }
                                }

                                // Clickable area
                                MouseArea {
                                    anchors.fill: parent
                                    cursorShape: Qt.PointingHandCursor
                                    onClicked: {
                                        navigationStack.push(codeScreen)
                                    }
                                }

                                // Add button
                                Rectangle {
                                    visible: isAddButton // Only visible if it is the add button
                                    color: root.primaryColor
                                    width: parent.width
                                    height: parent.height
                                    radius: 16

                                    // Plus icon
                                    Text {
                                        id: addButtonPlusIcon
                                        text: "+"
                                        anchors.centerIn: parent
                                        font.pixelSize: 120
                                        color: "white"
                                    }
                                    // Button logic
                                    MouseArea {
                                        anchors.fill: parent
                                        onEntered: {
                                            addButtonPlusIcon.font.pixelSize = 140
                                        }
                                        cursorShape: Qt.PointingHandCursor
                                        hoverEnabled: true
                                        onExited: {
                                            addButtonPlusIcon.font.pixelSize = 120
                                        }
                                        onClicked: {
                                            patientModal.open()
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
