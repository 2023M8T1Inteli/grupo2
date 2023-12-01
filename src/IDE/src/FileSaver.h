#ifndef FILESAVER_H
#define FILESAVER_H

#include <QObject>
#include <QFile>
#include <QTextStream>
#include <QUrl>

class FileSaver : public QObject {
    Q_OBJECT
    Q_PROPERTY(QUrl source READ source WRITE setSource NOTIFY sourceChanged)
    Q_PROPERTY(QString text READ text WRITE setText NOTIFY textChanged)

public:
    explicit FileSaver(QObject *parent = nullptr);

    Q_INVOKABLE void read();
    Q_INVOKABLE void write();

    QUrl source() const;
    void setSource(const QUrl &source);

    QString text() const;
    void setText(const QString &text);

signals:
    void sourceChanged(const QUrl &source);
    void textChanged(const QString &text);

private:
    QUrl m_source;
    QString m_text;
};

#endif // FILESAVER_H
