# Сайт bem.info

Официальный сайт БЭМ.

## Установка

Склонировать репозиторий проекта:
```bash
$ git clone https://github.com/bem-site/bem.info.git
$ cd bem.info
```

Установить зависимости:
```bash
$ npm i
```

Запустить сборку данных:
```bash
$ TOKEN={pass your github token here} gulp data
```

Запустить компиляцию страниц, watcher и статический сервер:
```bash
$ gulp
```

Открыть в браузере [http://localhost:8008/bem.info/ru/](http://localhost:8008/bem.info/ru/).

## Модель данных

[Модель данных](./content/model.js) для сайта.
