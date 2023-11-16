import QtQuick 6.2
import QtQuick.Controls
import QtQuick.Layouts

// ToolBar element definition
ToolBar {
    id: navBar
    Layout.fillWidth: true // Ensuring the ToolBar fills the width of its container
    height: 90

    // Setting colors for the ToolBar using Material Design properties
    Material.background: primaryColor // Background color of the ToolBar
    Material.foreground: whiteColor // Foreground color, typically for text and icons
    Material.accent: white // Accent color for elements within the ToolBar

    // Default property to set the children of the contentRow directly into the ToolBar
    default property alias content: contentRow.children

    // RowLayout for organizing items horizontally within the ToolBar
    RowLayout {
        id: contentRow
        anchors.fill: parent // Ensuring the RowLayout fills the entire ToolBar
        height: parent.height
        // A Round Button object
        RoundButton {
            scale: mouseArea.containsMouse ? 1.1 : 1.0
            width: 48
            height: 48
            background: PaddedRectangle {
                implicitHeight: 48
                implicitWidth: 48
                anchors.centerIn: parent
                radius: 80
                color: whiteColor
                Text {
                    anchors.centerIn: parent
                    text: "\u2190"
                    font.pixelSize: 28
                    color: primaryColor
                }

            }

            MouseArea {
                id: mouseArea
                anchors.fill: parent
                hoverEnabled: true
                cursorShape: mouseArea.containsMouse ? Qt.PointingHandCursor : Qt.ArrowCursor

                onExited: {
                    roundButton.background.color = whiteColor;
                }
                onClicked: {
                    // Action to perform when the button is clicked
                    // Here, it pops the topmost item off the navigation stack
                    navigationStack.pop()
                }
            }


        }

        // A Round Button object
RoundButton {
    id: settingsButton
    width: 48
    height: 48
    anchors.right: parent.right // Align the button to the right side of the bar
    scale: settingsMouseArea.containsMouse ? 1.1 : 1.0 // Increase the scale when the mouse hovers over the button
    background: Image {
        anchors.fill: parent
        source: "../img/settings.png"
    }

    MouseArea {
        id: settingsMouseArea
        anchors.fill: parent
        hoverEnabled: true
        cursorShape: settingsMouseArea.containsMouse ? Qt.PointingHandCursor : Qt.ArrowCursor
    }

    onClicked: {
        // Action to perform when the settings button is clicked
    }
}
    }
}
