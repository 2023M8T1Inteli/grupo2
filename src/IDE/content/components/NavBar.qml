import QtQuick 6.2
import QtQuick.Controls
import QtQuick.Layouts

// ToolBar element definition
ToolBar {
    id: navBar
    Layout.fillWidth: true // Ensuring the ToolBar fills the width of its container
    height: 82

    // Setting colors for the ToolBar using Material Design properties
    Material.background: "purple" // Background color of the ToolBar
    Material.foreground: "white" // Foreground color, typically for text and icons
    Material.accent: "white" // Accent color for elements within the ToolBar

    // Default property to set the children of the contentRow directly into the ToolBar
    default property alias content: contentRow.children

    // RowLayout for organizing items horizontally within the ToolBar
    RowLayout {
        id: contentRow
        anchors.fill: parent // Ensuring the RowLayout fills the entire ToolBar

        // A Round Button object
        RoundButton {
            text: "\u2190" // Unicode character for left arrow, used as button text
            onClicked: {
                // Action to perform when the button is clicked
                // Here, it pops the topmost item off the navigation stack
                navigationStack.pop()
            }
        }
    }
}
