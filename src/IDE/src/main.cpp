#include <QGuiApplication>
#include <QQmlApplicationEngine>
#include "FileSaver.h"
#include "SourceProgram.h"

#include "app_environment.h"
#include "import_qml_components_plugins.h"
#include "import_qml_plugins.h"

// The main entry point of the application
int main(int argc, char *argv[])
{
    // Set up the environment for the Qt application
    set_qt_environment();

    // Initialize the QGuiApplication with command line arguments
    QGuiApplication app(argc, argv);

    // Register the FileSaver class with the QML type system
    qmlRegisterType<FileSaver>("com.yourcompany.files", 1, 0, "FileSaver");
    // Register the SourceProgram class with the QML type system
    qmlRegisterType<SourceProgram>("com.yourcompany.files", 1, 0, "SourceProgram");

    // Create a QQmlApplicationEngine to load QML files
    QQmlApplicationEngine engine;
    // Define the URL for the main QML file
    const QUrl url(u"qrc:Main/main.qml"_qs);

    // Connect a lambda function to the objectCreated signal of the engine
    QObject::connect(
        &engine, &QQmlApplicationEngine::objectCreated, &app,
        [url](QObject *obj, const QUrl &objUrl) {
            // Exit the application if the main QML file fails to load
            if (!obj && url == objUrl)
                QCoreApplication::exit(-1);
        },
        Qt::QueuedConnection);

    // Add additional import paths for QML components
    engine.addImportPath(QCoreApplication::applicationDirPath() + "/qml");
    engine.addImportPath(":/");

    // Load the main QML file into the engine
    engine.load(url);

    // Check if the root objects of the engine are empty, indicating a load failure
    if (engine.rootObjects().isEmpty()) {
        return -1; // Exit the application with an error code if no root objects are found
    }

    // Enter the main event loop of the application
    return app.exec();
}
