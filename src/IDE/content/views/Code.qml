// Import necessary QtQuick modules and custom components
import QtQuick 6.2
import QtQuick.Controls
import QtQuick.Layouts
import Qt.labs.folderlistmodel
import QtQuick.Dialogs
import "../listModels" // Import custom list models from a relative path
import "../components" // Import custom components from a relative path
import com.yourcompany.files 1.0 // Import custom module from a specific version

// Define the main Rectangle element
Rectangle {
    id: rectangle2
    anchors.fill: parent // Make the Rectangle fill its parent

    // Define FileSaver component
    FileSaver {
        id: fileSaver
    }

    // Define SourceProgram component
    SourceProgram {
        id: sourceProgram
        // Callback when output changes
        onOutputChanged: {
            processViewField.text = sourceProgram.output
            patientDialog.open()
        }
    }

    // Create a GridLayout to organize child elements
    GridLayout {
        anchors.fill: parent
        columns: 2
        rows: 2

        // Include a custom NavBar component spanning two columns
        NavBar {
            Layout.columnSpan: 2

            // Add a button to show code
            Button {
                text: "Mostrar Código"
                onClicked: {
                    // Construct code based on available blocks
                    let code = "programa \"mostra_imagem\":\ninicio\n"
                    for (let i = 0; i < blocksModel.count; i++) {
                        let item = blocksModel.get(i)
                        console.log(item.refCode)
                        code += item.refCode
                    }
                    code += "fim."
                    codeViewField.text = code
                    sourceProgram.textSource = code
                    sourceProgram.processText()
                }
            }
        }

        // Create a dialog for displaying generated code
        Dialog {
            id: patientDialog
            width: parent.width * 0.5
            anchors.centerIn: parent
            title: "Código Gerado"
            font.pixelSize: 16 // Font size of the title
            font.bold: true // Title in bold
            modal: true
            standardButtons: Dialog.Ok

            // Create a ColumnLayout for dialog contents with increased spacing
            ColumnLayout {
                anchors.fill: parent
                spacing: 20

                // Display generated code
                Text {
                    id: codeViewField
                    Layout.fillWidth: true
                    text: "code_here"
                    color: "black"
                    wrapMode: Text.Wrap
                    font.pixelSize: 18 // Increased font size for readability
                }
                // Display code processing output
                Text {
                    id: processViewField
                    Layout.fillWidth: true
                    text: "code_here"
                    color: "black"
                    wrapMode: Text.Wrap
                    font.pixelSize: 18 // Increased font size for readability
                }
            }
        }

        // Create a ColumnLayout for the block selection area
        ColumnLayout {
            Layout.fillHeight: true
            id: rect1
            height: 0

            // Create a ListView for available blocks
            ListView {
                id: blocksListView
                clip: true
                Layout.fillHeight: true
                width: 400

                // Define a delegate component for each block
                Component {
                    id: listDelegateComp

                    // Create a ColumnLayout for each block item
                    ColumnLayout {
                        anchors.fill: blocksListView
                        width: blocksListView.width
                        clip: true
                        id: selectBlocksView

                        // Display block name
                        Text {
                            text: name
                            font.pixelSize: 24
                        }

                        // Use a Repeater to create buttons for block selection
                        Repeater {
                            id: selectBlocksRepeater
                            model: blocks

                            Button {
                                required property var modelData
                                text: modelData.name
                                horizontalPadding: 40
                                verticalPadding: 20
                                onClicked: {
                                    blocksModel.append(modelData)
                                }
                            }
                        }

                        // Empty Item for spacing
                        Item {
                            Layout.fillHeight: true
                            Layout.fillWidth: true
                        }
                    }
                }

                // Set the model for the available blocks
                model: AvailableBlocksModel {}
                delegate: listDelegateComp
            }
        }

        // Create a Rectangle for displaying selected blocks
        Rectangle {
            id: rect3
            height: 200
            color: "yellow"
            Layout.fillHeight: true
            Layout.fillWidth: true

            // Create a ListView for displaying selected blocks
            ListView {
                clip: true
                anchors.fill: parent
                topMargin: 10
                leftMargin: 20

                // Define a delegate component for each selected block
                Component {
                    id: blockDelegate

                    Button {
                        text: name
                        horizontalPadding: 40
                        verticalPadding: 20
                        onClicked: {
                            blocksModel.remove(index)
                        }
                    }
                }

                // Set the model for the selected blocks
                model: CodeBlockStoreModel {
                    id: blocksModel
                }
                delegate: blockDelegate
                focus: true
            }
        }
    }
}

