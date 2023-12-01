import QtQuick 6.2
import QtQuick.Layouts
import QtQuick.Controls

Rectangle {
    id: rectangle
    width: 720
    height: 480
    color: "white"

    ColumnLayout {
        anchors.fill: parent
        spacing: 0

        Rectangle {
            Layout.fillWidth: true
            height: 60
            color: "green"
        }

        ColumnLayout {
            Layout.fillWidth: true
            Layout.fillHeight: true
            Layout.alignment: Qt.AlignCenter


            Text {
                Layout.fillWidth: true
                text: "Bem-vindo de volta!"
                font.pixelSize: 36
                font.bold: true
                horizontalAlignment: Text.AlignHCenter
                verticalAlignment: Text.AlignVCenter
            }


            RowLayout  {

                Layout.fillHeight: true
                Layout.fillWidth: true

                PaddedRectangle {
                    padding: 10

                    Layout.fillHeight: true
                    width: 30
                    color: "red"
                }

                Rectangle {
                    Layout.fillHeight: true
                    width: 300
                    color: "red"
                }

            }

        }

    }

}
