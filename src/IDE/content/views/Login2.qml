import QtQuick 6.2
import QtQuick.Layouts
import QtQuick.Controls
import "../components"

Rectangle {
    id: rectangle
    anchors.fill: parent // Fills the entire space of its parent
    color: "white"

    GridLayout {
        rows: 1
        columns: 1
        anchors.fill: parent // Fills the entire space of its parent

        ColumnLayout {
            Layout.alignment: Qt.AlignCenter // Centers the content
            spacing: 20 // Spacing between elements
            width: parent // Width equal to parent's width

            // Welcome text
            Text {
                text: "Bem-vindo de volta!"
                font.pixelSize: 48
                font.bold: true
                Layout.alignment: Qt.AlignHCenter // Horizontally centered
            }

            // Instruction text for login
            Text {
                text: "Entre com sua conta para acessar os projetos"
                font.pixelSize: 20
                Layout.alignment: Qt.AlignHCenter // Horizontally centered
                color: "gray"
            }

            // Text field for email input
            TextField {
                id: emailField
                implicitWidth: 400 // Sets width of the text field
                placeholderText: "Email"
                Layout.alignment: Qt.AlignHCenter // Horizontally centered
            }

            // Text field for password input
            TextField {
                id: passwordField
                implicitWidth: 400
                placeholderText: "Senha"
                echoMode: TextField.Password // Hides password characters
                Layout.alignment: Qt.AlignHCenter // Horizontally centered
            }

            // Text for password recovery option
            Text {
                text: "Esqueceu sua senha?"
                color: "gray"
                Layout.alignment: Qt.AlignHCenter // Horizontally centered
                MouseArea {
                    anchors.fill: parent
                    cursorShape: Qt.PointingHandCursor // Changes cursor to hand pointer
                    onClicked: {
                        // Logic for password recovery can be added here
                    }
                }
            }

            // Custom button for logging in
            CustomButton {
                width: 400
                height: 50
                buttonValue: "Entrar"
                Layout.alignment: Qt.AlignCenter // Centered in layout
                MouseArea {
                    anchors.fill: parent
                    onClicked: {
                        navigationStack.push(homeScreen) // Navigates to home screen on click
                    }
                }
            }
        }
    }
}
