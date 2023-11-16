#ifndef SOURCEPROGRAM_H
#define SOURCEPROGRAM_H

#include <QObject>
#include <QString>

class SourceProgram : public QObject {
    Q_OBJECT
    Q_PROPERTY(QString textSource READ textSource WRITE setTextSource NOTIFY textSourceChanged)
    Q_PROPERTY(QString output READ output NOTIFY outputChanged)

public:
    explicit SourceProgram(QObject *parent = nullptr);

    QString textSource() const;
    void setTextSource(const QString &source);

    QString output() const;

signals:
    void textSourceChanged(const QString &source);
    void outputChanged(const QString &output);

public slots:
    void processText();

private:
    QString m_textSource;
    QString m_output;

    void runPythonScript(const QString &filePath);
};

#endif // SOURCEPROGRAM_H
