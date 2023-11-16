import QtQuick 6.2
import QtQuick.Layouts
import QtQuick.Controls
import "../components"

Rectangle {
    id: rectangle
    width: root.width
    height: root.height
    color: "white"

    GridLayout {
        rows:1
        columns: 1
        anchors.fill: parent
    ColumnLayout {
        Layout.alignment: Qt.AlignCenter
        spacing: 20
        width: parent

        Text {
            text: "Bem-vindo de volta!"
            font.pixelSize: 48
            font.bold: true
            Layout.alignment: Qt.AlignHCenter
        }

        Text {
            text: "Entre com sua conta para acessar os projetos"
            font.pixelSize: 20
            Layout.alignment: Qt.AlignHCenter
            color: "gray"
        }

        TextField {
            id: emailField
            implicitWidth: 400
            placeholderText: "Email"
            Layout.alignment: Qt.AlignHCenter


        }

        TextField {
            id: passwordField
            implicitWidth: 400
            placeholderText: "Senha"
            echoMode: TextField.Password
            Layout.alignment: Qt.AlignHCenter
        }

        Text {
            text: "Esqueceu sua senha?"
            color: "gray"
            Layout.alignment: Qt.AlignHCenter
            MouseArea {
                anchors.fill: parent
                cursorShape: Qt.PointingHandCursor
                onClicked: {

                }
            }
        }

        CustomButton {
            buttonHeight: 42
            buttonWidth: 400
            buttonValue: "Entrar"
            buttonWeight: 600
            Layout.alignment: Qt.AlignHCenter
            onCustomClicked: {
                navigationStack.push(homeScreen)
            }
        }

    }

    }
}
