#include "FileSaver.h"
#include <QDebug>

// Constructor for the FileSaver class, initializing with QObject parent
FileSaver::FileSaver(QObject *parent) : QObject(parent) {}

// Method to read content from a file
void FileSaver::read() {
    // Check if the source URL is empty
    if (m_source.isEmpty()) {
        qWarning() << "Source URL is empty";
        return;
    }

    // Create a QFile object with the local file path
    QFile file(m_source.toLocalFile());

    // Check if the file exists
    if (!file.exists()) {
        qWarning() << "File does not exist: " << m_source.toLocalFile();
        return;
    }

    // Open the file in read-only mode
    if (file.open(QIODevice::ReadOnly)) {
        // Create a QTextStream to read from the file
        QTextStream stream(&file);
        // Read all text from the file and store it in m_text
        m_text = stream.readAll();
        // Emit the textChanged signal with the new text
        emit textChanged(m_text);
    }
}

// Method to write content to a file
void FileSaver::write() {
    // Check if the source URL is empty
    if (m_source.isEmpty()) {
        qWarning() << "Source URL is empty";
        return;
    }

    // Create a QFile object with the local file path
    QFile file(m_source.toLocalFile());

    // Open the file in write-only mode with text flag
    if (file.open(QIODevice::WriteOnly | QIODevice::Text)) {
        // Create a QTextStream to write to the file
        QTextStream stream(&file);
        // Write m_text to the file
        stream << m_text;
    }
}

// Getter method for the source URL
QUrl FileSaver::source() const {
    return m_source;
}

// Setter method for the source URL
void FileSaver::setSource(const QUrl &source) {
    // Check if the new source is different from the current source
    if (source == m_source) return;
    // Update the source
    m_source = source;
    // Emit the sourceChanged signal with the new source
    emit sourceChanged(m_source);
}

// Getter method for the text
QString FileSaver::text() const {
    return m_text;
}

// Setter method for the text
void FileSaver::setText(const QString &text) {
    // Check if the new text is different from the current text
    if (text == m_text) return;
    // Update the text
    m_text = text;
    // Emit the textChanged signal with the new text
    emit textChanged(m_text);
}
