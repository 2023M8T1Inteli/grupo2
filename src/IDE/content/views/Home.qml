import QtQuick 6.2
import QtQuick.Layouts
import QtQuick.Controls
import QtQuick.Dialogs
import "../components"

Rectangle {
    id: homeScreen
    anchors.fill: parent // Fills the entire space of its parent
    color: "white"

    ColumnLayout {
        anchors.fill: parent
        spacing: 0

        NavBar {} // Navigation bar component

        ColumnLayout {
            Layout.fillWidth: true
            Layout.fillHeight: true
            Layout.alignment: Qt.AlignCenter
            spacing: 80

            Item {} // Placeholder item for layout adjustment

            // Dialog for displaying 'not implemented' message
            MessageDialog {
                id: notImplementedDialog
                title: "Não Implementado"
                text: "Esta funcionalidade ainda não foi implementada. Aguarde novas versões.";
                buttons: MessageDialog.Ok
            }

            // Title text
            Text {
                Layout.fillWidth: true
                text: "O que você quer fazer?"
                font.pixelSize: 36
                font.bold: true
                horizontalAlignment: Text.AlignHCenter
            }

            // Layout for cards
            RowLayout {
                Layout.fillWidth: true
                Layout.alignment: Qt.AlignCenter
                spacing: 20

                // First padded rectangle card
                PaddedRectangle {
                    // Card properties like width, height, color, etc.
                    // Contains an image, texts, and a custom button

                    CustomButton {
                        onCustomClicked: {
                            notImplementedDialog.open() // Opens the dialog on click
                        }
                    }
                }

                // Second padded rectangle card
                PaddedRectangle {
                    // Card properties and contents similar to the first card

                    CustomButton {
                        onCustomClicked: {
                            navigationStack.push(projectsScreen) // Navigates to projects screen
                        }
                    }
                }
            }

            Item {
                Layout.fillHeight: true // Ensures proper layout alignment
            }
        }
    }
}
