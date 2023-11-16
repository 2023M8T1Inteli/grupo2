import QtQuick 6.2
import QtQuick.Controls 2.15
import QtQuick.Layouts 1.15
import "../listModels"
Dialog {
        id: patientDialog
        width: 1000
        anchors.centerIn: parent
        title: "Cadastre um novo paciente"
        font.weight: 600
        modal: true
        standardButtons: Dialog.Ok | Dialog.Cancel
        signal addNewPatient(name: string, age: string, clinicalPicture: string)
        onAccepted: {
            console.log("Paciente cadastrado:", nameField.text, ageField.text, clinicalPictureField.text)
            addNewPatient(nameField.text, ageField.text, clinicalPictureField)
        }

        ColumnLayout {
            anchors.fill: parent
            spacing: 10

            TextField {
                id: nameField
                placeholderText: "Qual o nome do paciente?"
                Layout.fillWidth: true
            }

            TextField {
                id: ageField
                placeholderText: "Digite aqui a idade"
                Layout.fillWidth: true
                inputMethodHints: Qt.ImhDigitsOnly
            }

            TextArea {
                id: clinicalPictureField
                placeholderText: "Detalhes de saúde"
                Layout.fillWidth: true
                Layout.fillHeight: true
                wrapMode: TextEdit.Wrap
            }
        }
    }
