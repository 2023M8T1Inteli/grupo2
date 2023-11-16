// Import necessary QtQuick modules and components
import QtQuick 6.2
import QtQuick.Layouts
import QtQuick.Controls
import QtQuick.Dialogs
import "../components" // Import custom components from a relative path

// Define the main Rectangle element for the home screen
Rectangle {
    id: homeScreen
    anchors.fill: parent // Make the Rectangle fill its parent
    color: "white" // Set the background color to white

    // Create a ColumnLayout to arrange child elements vertically
    ColumnLayout {
        anchors.fill: parent // Make the ColumnLayout fill its parent
        spacing: 0 // Set the spacing between child items

        // Include a custom NavBar component
        NavBar {}

        // Create another nested ColumnLayout for the main content
        ColumnLayout {
            Layout.fillWidth: true // Make the layout fill the width of its parent
            Layout.fillHeight: true // Make the layout fill the height of its parent
            Layout.alignment: Qt.AlignCenter // Align the layout to the center
            spacing: 80 // Set spacing between child items

            // An empty Item for spacing
            Item {}

            // Define a MessageDialog component
            MessageDialog {
                id: notImplementedDialog
                title: "Não Implementado" // Set the dialog title
                text: "Esta funcionalidade ainda não foi implementada. Aguarde novas versões."; // Set the dialog text
                buttons: MessageDialog.Ok // Define the OK button for the dialog
            }

            // Display a text message
            Text {
                Layout.fillWidth: true
                text: "O que você quer fazer?" // Set the text content
                font.pixelSize: 36 // Set font size
                font.bold: true // Make the text bold
                horizontalAlignment: Text.AlignHCenter // Align text horizontally to the center
                verticalAlignment: Text.AlignVCenter // Align text vertically to the center
            }

            // Create a RowLayout for two PaddedRectangle items
            RowLayout {
                Layout.fillWidth: true // Make the layout fill the width of its parent
                Layout.alignment: Qt.AlignCenter // Align the layout to the center
                spacing: 20 // Set spacing between child items

                // Define the first PaddedRectangle
                PaddedRectangle {
                    width: 300
                    height: 450
                    // Set background color and border properties
                    color: "#e0e0e0"
                    radius: 24
                    border.color: "#e6e6e6"
                    border.width: 1
                    Layout.margins: 10
                    clip: true // Clip the contents inside the rectangle

                    // Create a ColumnLayout for the contents of the first rectangle
                    ColumnLayout {
                        anchors.fill: parent
                        width: parent.width
                        height: parent.height
                        spacing: 15

                        // Display an image
                        Image {
                            source: "../img/card1.jpg"
                            Layout.preferredHeight: parent.height * 0.5
                            Layout.fillWidth: true
                            fillMode: Image.PreserveAspectCrop
                            Layout.alignment: Qt.AlignTop
                        }

                        // Display text content
                        Text {
                            Layout.fillWidth: true
                            text: "Acompanhe as crianças"
                            font.pixelSize: 18
                            horizontalAlignment: Text.AlignHCenter
                            Layout.alignment: Qt.AlignTop
                            font.bold: true
                        }

                        Text {
                            Layout.fillWidth: true
                            text: "Veja o histórico das sessões e seus resultados"
                            font.pixelSize: 16
                            horizontalAlignment: Text.AlignHCenter
                            font.bold: false
                            wrapMode: Text.Wrap
                        }

                        // Empty Item for spacing
                        Item {
                            Layout.fillHeight: true
                        }

                        // Define a custom button
                        CustomButton {
                            Layout.alignment: Qt.AlignHCenter
                            buttonHeight: 42
                            buttonWidth: parent.width * 0.85
                            buttonValue: "Acompanhar" // Set button text
                            onCustomClicked: {
                                notImplementedDialog.open() // Open the notImplementedDialog when clicked
                            }
                        }
                    }
                }

                // Define the second PaddedRectangle (similar structure as the first)
                PaddedRectangle {
                    width: 300
                    height: 450
                    color: "#e0e0e0"
                    radius: 24
                    border.color: "#e6e6e6"
                    border.width: 1
                    Layout.margins: 10
                    clip: true

                    ColumnLayout {
                        anchors.fill: parent
                        width: parent.width
                        height: parent.height
                        spacing: 15

                        Image {
                            source: "../img/card2.png"
                            Layout.preferredHeight: parent.height * 0.5
                            Layout.fillWidth: true
                            fillMode: Image.PreserveAspectFit
                            Layout.alignment: Qt.AlignTop
                        }

                        Text {
                            Layout.fillWidth: true
                            text: "Projetos"
                            font.pixelSize: 18
                            horizontalAlignment: Text.AlignHCenter
                            Layout.alignment: Qt.AlignTop
                            font.bold: true
                        }

                        Text {
                            Layout.fillWidth: true
                            text: "Crie, execute e visualize projetos"
                            font.pixelSize: 16
                            horizontalAlignment: Text.AlignHCenter
                            font.bold: false
                            wrapMode: Text.Wrap
                        }

                        Item {
                            Layout.fillHeight: true
                        }

                        CustomButton {
                            Layout.alignment: Qt.AlignHCenter
                            buttonHeight: 42
                            buttonWidth: parent.width * 0.85
                            buttonValue: "Entrar"
                            onCustomClicked: {
                                navigationStack.push(projectsScreen) // Push to a projects screen when clicked
                            }
                        }
                    }
                }
            }

            // Empty Item for spacing
            Item {
                Layout.fillHeight: true
            }
        }
    }
}
