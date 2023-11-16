// Import necessary QtQuick modules and components
import QtQuick 6.2
import QtQuick.Controls 2.15
import QtQuick.Layouts

// Define a custom Rectangle-based button component
Rectangle {
    // Define custom properties for the button
    property int buttonHeight: 32
    property int buttonWidth: 152
    property string buttonValue: "Entrar"
    property int buttonWeight: 500

    // Set the initial width and color of the Rectangle
    width: 128
    color: "transparent"
    height: 64

    // Define a signal to be emitted when the button is clicked
    signal customClicked()

    // Create a Button component inside the Rectangle
    Button {
        id: customButton

        // Define a custom property for the button type
        property string buttonType: "primary"
        text: buttonValue

        // Set the button dimensions and center it within the parent Rectangle
        width: parent.buttonWidth
        height: parent.buttonHeight
        anchors.centerIn: parent

        // Define the visual appearance of the button
        background: Rectangle {
            implicitWidth: parent.width
            implicitHeight: parent.height
            radius: 8
            color: customButton.buttonType === "primary" ? root.primaryColor : root.whiteColor
            border.color: root.primaryColor
            border.width: 2
            anchors.fill: parent

            // Add a color transition effect
            Transition {
                NumberAnimation {
                    property: "color"
                    duration: 200
                }
            }
        }

        // Define the text content and appearance of the button
        contentItem: Text {
            text: customButton.text
            font.weight: buttonWeight
            color: customButton.buttonType === "primary" ? root.whiteColor : root.primaryColor
            anchors.centerIn: parent
            font.pixelSize: 19
            horizontalAlignment: Text.AlignHCenter
            verticalAlignment: Text.AlignVCenter
        }

        // Toggle the button type and emit the customClicked signal on hover
        onHoveredChanged: {
            customButton.buttonType === "primary" ? customButton.buttonType = "secondary" : customButton.buttonType = "primary"
        }

        // Toggle the button type and emit the customClicked signal on click
        onClicked: {
            customButton.buttonType === "primary" ? customButton.buttonType = "secondary" : customButton.buttonType = "primary"
            customClicked()
        }
    }
}

