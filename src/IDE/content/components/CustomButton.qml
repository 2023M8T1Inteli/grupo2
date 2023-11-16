import QtQuick 6.2
import QtQuick.Controls 2.15
import QtQuick.Layouts

Rectangle {
    property int buttonHeight: 32
    property int buttonWidth: 152
    property string buttonValue: "Entrar"
    property int buttonWeight: 500
    width: 128
    color: "transparent"
    height: 64

    signal customClicked()

    Button {
        id: customButton
        property string buttonType: "primary"
        text: buttonValue
        width: parent.buttonWidth
        height: parent.buttonHeight
        anchors.centerIn: parent

        background: Rectangle {
            implicitWidth: parent.width
            implicitHeight: parent.height
            radius: 8
            color: customButton.buttonType === "primary" ? root.primaryColor : root.whiteColor
            border.color: root.primaryColor
            border.width: 2
            anchors.fill: parent

            Transition {
                NumberAnimation {
                    property: "color"
                    duration: 200
                }
            }
        }

        contentItem: Text {
            text: customButton.text
            font.weight: buttonWeight
            color: customButton.buttonType === "primary" ? root.whiteColor : root.primaryColor
            anchors.centerIn: parent
            font.pixelSize: 19
            horizontalAlignment: Text.AlignHCenter
            verticalAlignment: Text.AlignVCenter
        }

        onHoveredChanged: {
            customButton.buttonType === "primary" ? customButton.buttonType = "secondary" : customButton.buttonType = "primary"
        }

        onClicked: {
            customButton.buttonType === "primary" ? customButton.buttonType = "secondary" : customButton.buttonType = "primary"
            customClicked()
        }
    }
}
