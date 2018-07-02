# SIGAA-EGRESSOS

[![travis build](https://img.shields.io/travis/matheuspiment/sigaa-egressos.svg)](https://travis-ci.org/matheuspiment/sigaa-egressos)
[![version](https://img.shields.io/npm/v/sigaa-egressos.svg)](https://www.npmjs.com/package/sigaa-egressos)
[![downloads](https://img.shields.io/npm/dw/sigaa-egressos.svg)](https://www.npmjs.com/package/sigaa-egressos)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/matheuspiment/sigaa-egressos)
[![MIT License](https://img.shields.io/github/license/matheuspiment/sigaa-egressos.svg)](https://opensource.org/licenses/MIT)

Este projeto tem como objetivo propor uma solução de integração entre o SIGAA-UFG com aplicação SempreUFG, esta destinada ao egressos da universidade, onde por troca de mensagem  a mesma receberia as informações do SIGAA acerca dos alunos em egresso. :mailbox_with_mail:

* [Especificação da Proposta](#especificacao-da-proposta)
* [Instalação](#instalacao)
* [Exemplo](#exemplo)
* [API](#api)
* [Estrutura da Mensagem](#estrutura-da-mensagem)
* [Equipe](#equipe)

## Especificação da Proposta

### Contexto

Como descrito na introdução acima, a divulgação de notícias e eventos, por exemplo, para os egressos da universidade é de interesse da comunidade acadêmica e fomenta/permetua o contato do ex-aluno com a mesma.

### Diagramas

![Diagrama de implantação.](./docs/diagrama-implantacao.png)
> Figura 1 - Diagrama de implantação.

O sigaa-engressos vem como uma solução de integração entre os sistemas SIGAA-UFG e SEMPRE-UFG a integração se dará por meio de troca de mensagens para isso é ultilizado o serviço [Emitter](https://emitter.io/).

Conforme apresentado na figura 1 a comunicação entre o SIGAA-UFG e EMITTER, SEMPRE-UFG e EMITTER é realizada através do protocolo HTTP. A figura 2 (abaixo) apresenta a dependência entre os sistemas.

![Diagrama de dependência](./docs/diagrama-dependencia.png)
> Figura 2 - Diagrama de dependência.

### Ferramentas/Tecnologias

A "simplicidade" foi o fator determinante nas escolhas técnicas, bem como a familiaridade dos integrantes envolvidos.

* Linguagem/Plataforma - [NodeJS](https://nodejs.org/en/)
* Estilo de Código - [ESLint](https://eslint.org/) e [EditorConfig](https://editorconfig.org/)
* Versionamento - [GitHub](https://github.com/) e [Commitizen](https://github.com/commitizen)
* Broker/Canal - [Emitter](https://emitter.io/)
* CI - [Travis CI](https://travis-ci.org/)
* Entrega/Pacote - [NPM](https://www.npmjs.com/)

## Instalação

sigaa-egressos para NodeJS:

```shell
npm install sigaa-egressos --save
```

## Exemplo

```javascript
import sigaaEgressos from 'sigaa-egressos';

const messages = [];

const onMessage = (message) => {
  messages.push(message);
  console.log(messages);
};

sigaaEgressos.connect();
sigaaEgressos.subscribe();
sigaaEgressos.onMessage(onMessage);

sigaaEgressos.publish({
  id: 1,
  title: 'Espaço das Profições',
  type: 'evento',
  description: 'A Universidade Federal de Goiás (UFG) realiza nos dias 25 e 26 de junho, o Espaço das Profissões 2018, na Regional Goiânia, uma exposição que aproxima os universitários e profissionais da Instituição de estudantes do ensino médio, interessados em ingressar na UFG.',
});

sigaaEgressos.publish({
  id: 2,
  title: 'UFG está entre as 20 melhores instituições Sul-Americanas em Ciências da Terra e Ambientais',
  type: 'noticia',
  description: 'A Universidade Federal de Goiás (UFG) está entre as 20 melhores instituições Sul-Americanas no que diz respeito às produções na área de Ciências da Terra e Ambientais. O ranking é do Nature Index, um banco de dados sobre publicações, autorias e produtividade dos pesquisadores.',
});
```

## API

* [connect()](#connect)
* [subscribe()](#subscribe)
* [publish()](#publish)
* [onMessage()](#onMessage)

### connect()

Conecta no broker emitter.

### subscribe(last)

Inscreve-se no canal.

* `last` - número | opicional - Defini quantas mensagens armazenadas você deseja recuperar.

### publish(message, ttl)

Publica a mensagem no canal.

* `message` - objeto | requerido - Um objeto JSON com [essa estrutura](#estrutura-da-mensagem).
* `ttl` - número | opicional - É o tempo de vida da mensagem, em segundos.

### onMessage(callback)

Definir a função callback para os pacotes de mensagens recebidos.

* `callback` - function | requerido - Função callback para os pacotes de mensagens recebidos.

## Estrutura da Mensagem

As mensagens publicadas e recebidas seguem o modelo abaixo, onde essas chaves são as requeridas, podendo haver outras.

```javascript
{
  id: 2,
  title: 'UFG está entre as 20 melhores instituições Sul-Americanas em Ciências da Terra e Ambientais',
  type: 'noticia',
  description: 'A Universidade Federal de Goiás (UFG) está entre as 20 melhores instituições Sul-Americanas no que diz respeito às produções na área de Ciências da Terra e Ambientais. O ranking é do Nature Index, um banco de dados sobre publicações, autorias e produtividade dos pesquisadores.',
}
```

## Equipe

| Nome | E-mail | Git |
|------|--------|-----|
| Antonio Arlis Santos da Silva | antonio.silva27@outlook.com | [@antoni-s](https://github.com/antoni-s) |
| Beatriz Nogueira Carvalho da Silveira | beatrizncsilveira@gmail.com | [@BeatrizN](https://github.com/BeatrizN) |
| Keslley Lima da Silva | keslleyls@outlook.com | [@keslleylima](https://github.com/keslleylima) |
| Matheus Ribeiro Pimenta Nunes | matheuspiment@hotmail.com | [@matheuspiment](https://github.com/matheuspiment) |
