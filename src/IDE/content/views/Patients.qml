import QtQuick 6.2
import QtQuick.Layouts
import QtQuick.Controls
import "../listModels"
import "../components"

Rectangle {
    id: rectangle
    anchors.fill: parent
    color: root.white // Accessible white color

    // Responsive Column Layout
  GridLayout {
        anchors.fill: parent
        columns: 2
        rows: 2


    // Navbar
        NavBar {
             Layout.columnSpan: 2
        }
    ColumnLayout {
        Layout.fillWidth: true
        Layout.fillHeight: true
        Layout.columnSpan: 2
        spacing: root.height / 30 // Spacing between elements


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
                                        navigationStack.push(sceneBuilder)
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
}
