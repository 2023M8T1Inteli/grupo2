// Copyright (C) 2021 The Qt Company Ltd.
// SPDX-License-Identifier: LicenseRef-Qt-Commercial OR GPL-3.0-only

import QtQuick 6.2
import QtQuick.Controls
import "views"

ApplicationWindow {
    id: root
    width: mainScreen.width
    height: mainScreen.height

    // Accessibility Control - Color and their contrasts
    property string primaryColor: "#CB3A61"
    property string whiteColor: "#FFFFFF"
    property string gray: "#"
    property string white: "white"

    // Accessibility Control - Font sizes
    property int titleText: 52

    visible: true
    title: "BaseProjectV2"

    StackView {
        id: navigationStack
        initialItem: loginScreen
        anchors.fill: parent
    }

    Component {
        id: patientsScreen
        Patients {}
    }

    Component {
        id: projectsScreen
        Projects {}
    }

    Component {
        id: homeScreen
        Home {}
    }

    Component {
        id: loginScreen
        Login {}
    }

    Component {
        id: codeScreen
        Code {}
    }

    Component {
        id: sceneBuilder
        Scene{}
    }

   }

