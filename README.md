# SIGAA-EGRESSOS

Este projeto tem como objetivo propor uma solução de integração entre o SIGAA-UFG com aplicação SempreUFG, esta destinada ao egressos da universidade, onde por troca de mensagem  a mesma receberia as informações do SIGAA acerca dos alunos em egresso. :mailbox_with_mail:

* [Instalação](#instalacao)
* [Exemplo](#exemplo)
* [API](#api)
* [Estrutura da Mensagem](#estrutura-da-mensagem)
* [Equipe](#equipe)

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

lib.publish({
  id: 2,
  title: 'UFG está entre as 20 melhores instituições Sul-Americanas em Ciências da Terra e Ambientais',
  type: 'noticia',
  description: 'A Universidade Federal de Goiás (UFG) está entre as 20 melhores instituições Sul-Americanas no que diz respeito às produções na área de Ciências da Terra e Ambientais. O ranking é do Nature Index, um banco de dados sobre publicações, autorias e produtividade dos pesquisadores.',
});
```

## API

* connect()
* subscribe()
* publish()
* onMessage()

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
