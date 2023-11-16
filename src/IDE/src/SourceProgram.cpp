#include "SourceProgram.h"
#include <QFile>
#include <QProcess>
#include <QTemporaryFile>
#include <QTextStream>
#include <QDebug>

// Constructor for the SourceProgram class
SourceProgram::SourceProgram(QObject *parent) : QObject(parent) {}

// Getter for the text source
QString SourceProgram::textSource() const {
    return m_textSource;
}

// Setter for the text source
void SourceProgram::setTextSource(const QString &source) {
    // Check if the new source is different from the current one
    if (source != m_textSource) {
        m_textSource = source;
        // Emit a signal that the text source has changed
        emit textSourceChanged(m_textSource);
    }
}

// Getter for the output
QString SourceProgram::output() const {
    return m_output;
}

// Method to process the text source
void SourceProgram::processText() {
    // Create a temporary file
    QTemporaryFile tempFile;
    if (tempFile.open()) {
        // Write the text source to the temporary file
        QTextStream stream(&tempFile);
        stream << m_textSource;
        tempFile.close();

        // Run the Python script using the temporary file as input
        runPythonScript(tempFile.fileName());
    }
}

// Method to run a Python script
void SourceProgram::runPythonScript(const QString &filePath) {
    // Create a QProcess to run the Python interpreter
    QProcess process;
    // Start the process with python3 and pass the script and temporary file path as arguments
    process.start("python3", QStringList() << "qml/content/code/main.py" << filePath);
    // Wait for the process to finish
    process.waitForFinished();

    // Read the standard output and error from the process
    QString standardOutput = process.readAllStandardOutput();
    QString standardError = process.readAllStandardError();

    // Set the output based on what the process returned
    if (!standardOutput.isEmpty()) {
        m_output = standardOutput;
    } else if (!standardError.isEmpty()) {
        m_output = standardError;
    } else {
        m_output = "Error: Failed to run the script or the script did not produce any output.";
    }

    // Log the output for debugging
    qDebug() << m_output;
    // Emit a signal that the output has changed
    emit outputChanged(m_output);
}
