import QtQuick 6.2
import QtQuick.Controls

// Button element definition
Button {
    // Creating an alias for buttonValue to reference buttonText.text
    // This allows for external setting of the button's text
    property alias buttonValue: buttonText.text

    // Setting default dimensions for the button
    implicitWidth: 400
    height: 50

    // Defining the button's background style
    background: Rectangle {
        implicitWidth: 400 // Matching button width
        implicitHeight: 50 // Matching button height
        radius: 6 // Rounded corners for the rectangle
        color: "#CB3A61"
        anchors.centerIn: parent // Centering the rectangle within the button

        // Text element for displaying the button's label
        Text {
            id: buttonText
            anchors.centerIn: parent // Centering text within the rectangle
            text: buttonValue // Text displayed, linked to buttonValue property
            font.pixelSize: 20
            color: "white"
        }
    }
}
