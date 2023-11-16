import QtQuick 6.2
import QtQuick.Controls
import QtQuick.Layouts
import Qt.labs.folderlistmodel
import QtQuick.Dialogs
import "../listModels"
import "../components"
import com.yourcompany.files 1.0

Rectangle {
    id: rectangle2
    anchors.fill: parent // Fills the entire space of its parent

    FileSaver {
        id: fileSaver
    }

    SourceProgram {
        id: sourceProgram
        onOutputChanged: {
            // Updates process view and opens patient dialog when output changes
            processViewField.text = sourceProgram.output
            patientDialog.open()
        }
    }

    GridLayout {
        anchors.fill: parent // Fills the entire space of its parent
        columns: 2
        rows: 2

        NavBar {
            Layout.columnSpan: 2 // NavBar spans across two columns

            // Button to display generated code
            Button {
                text: "Mostrar Código"
                onClicked: {
                    // Constructs and displays the program code
                    let code = "programa \"mostra_imagem\":\ninicio\n"
                    for (let i = 0; i < blocksModel.count; i++) {
                        let item = blocksModel.get(i)
                        code += item.refCode;
                    }
                    code += "fim."
                    codeViewField.text = code
                    sourceProgram.textSource = code;
                    sourceProgram.processText()
                }
            }
        }

        // Dialog to display the generated code
        Dialog {
            id: patientDialog
            width: parent.width * 0.5 // Dialog width is half of parent's width
            anchors.centerIn: parent // Centering the dialog within the parent
            title: "Código Gerado" // Dialog title
            modal: true
            standardButtons: Dialog.Ok

            ColumnLayout {
                anchors.fill: parent // Fills the entire space of its parent
                spacing: 20 // Increased spacing for better visibility

                // Displays the generated code
                Text {
                    id: codeViewField
                    Layout.fillWidth: true // Fills the width of its layout
                    text: "code_here"
                    wrapMode: Text.Wrap // Enables text wrapping
                }

                // Displays the process view
                Text {
                    id: processViewField
                    Layout.fillWidth: true // Fills the width of its layout
                    text: "code_here"
                    wrapMode: Text.Wrap // Enables text wrapping
                }
            }
        }

        // Layout for the list of available blocks
        ColumnLayout {
            Layout.fillHeight: true
            id: rect1

            // ListView to display available blocks
            ListView {
                id: blocksListView
                Layout.fillHeight: true
                width: 400
                model: AvailableBlocksModel {}
                delegate: listDelegateComp
            }
        }

        // Rectangle containing the list of added blocks
        Rectangle {
            id: rect3
            color: "yellow"
            Layout.fillHeight: true
            Layout.fillWidth: true

            // ListView for displaying and managing added blocks
            ListView {
                clip: true
                anchors.fill: parent
                topMargin: 10
                leftMargin: 20
                model: CodeBlockStoreModel {
                    id: blocksModel
                }
                delegate: blockDelegate
            }
        }
    }
}
