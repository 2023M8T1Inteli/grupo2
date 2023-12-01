import QtQuick 6.2
import QtQuick.Controls 2.15
import QtQuick.Layouts 1.15

Item {
    visible: true
    width: parent.width // Inherits width from parent (Application's screen size)
    height: parent.height // Inherits height from parent (Application's screen size)

    // Standard button style definition
    property Component standardButtonStyle: Rectangle {
        color: control.hovered ? "#d3d3d3" : "#f0f0f0" // Changes color on hover
        radius: 10 // Rounded corners
        border.color: "#b0b0b0" // Border color
        border.width: 2 // Border width
        // Simple shadow effect when button is pressed
        Rectangle {
            visible: control.down // Shows only when button is pressed
            color: "#a0a0a0"
            radius: 10
            anchors.fill: parent // Shadow size matches button size
            anchors.margins: -2 // Shadow slightly larger than button
            z: -1 // Shadow appears behind the button
        }
    }

    // Button to open the patient registration dialog
    Button {
        text: "Cadastrar Paciente"
        width: 200
        height: 50
        font.pixelSize: 20 // Font size for button text
        background: standardButtonStyle // Applying the standard button style
        onClicked: {
            patientDialog.open() // Opens the dialog on click
        }
    }

    // Dialog for patient registration
    Dialog {
        id: patientDialog
        width: 1000
        anchors.centerIn: parent // Centering the dialog within the parent
        title: "Cadastre um novo paciente" // Dialog title
        font.pixelSize: 24
        font.bold: true
        modal: true // Makes the dialog modal
        standardButtons: Dialog.Ok | Dialog.Cancel // Adds OK and Cancel buttons

        onAccepted: {
            // Logic to save patient data can be added here
            console.log("Paciente cadastrado:", nameField.text, ageField.text, clinicalPictureField.text)
        }

        ColumnLayout {
            anchors.fill: parent
            spacing: 20 // Increased spacing for better visibility

            // Text field for the patient's name
            TextField {
                id: nameField
                placeholderText: "Qual o nome do paciente?"
                Layout.fillWidth: true
                font.pixelSize: 18 
            }

            // Text field for the patient's age
            TextField {
                id: ageField
                placeholderText: "Digite aqui a idade"
                Layout.fillWidth: true 
                font.pixelSize: 18
                inputMethodHints: Qt.ImhDigitsOnly // Only allows digit inputs
            }

            // Text area for clinical details of the patient
            TextArea {
                id: clinicalPictureField
                placeholderText: "Detalhes de saúde"
                Layout.fillWidth: true 
                Layout.fillHeight: true 
                font.pixelSize: 18 
                wrapMode: TextEdit.Wrap // Enables text wrapping
            }
        }
    }
}
