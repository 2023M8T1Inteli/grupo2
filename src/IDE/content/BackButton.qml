import QtQuick 6.2
import QtQuick.Controls 2.15
import QtQuick.Layouts

Button {
    id: customButton
    property string buttonType: "primary"

    width: parent.buttonWidth
    height: parent.buttonHeight

    background: Rectangle {
        implicitWidth: parent.width
        implicitHeight: parent.height
        radius: 8
        color: customButton.buttonType === "primary" ? root.primaryColor : root.whiteColor
        border.color: root.primaryColor
        border.width: 2
        anchors.fill: parent

        Image {
            source: "./img/back.png"
            anchors.horizontalCenter: parent.horizontalCenter
            fillMode: Image.PreserveAspectFit
            width: 150
            anchors.centerIn: parent
        }

    }
    onClicked: {
        customButton.buttonType === "primary" ? customButton.buttonType = "secondary" : customButton.buttonType = "primary"
    }
}
