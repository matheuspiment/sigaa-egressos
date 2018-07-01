# SIGAA-EGRESSOS

Este projeto tem como objetivo propor uma solução de integração entre o SIGAA-UFG com aplicação SempreUFG, esta destinada ao egressos da universidade, onde por troca de mensagem  a mesma receberia as informações do SIGAA acerca dos alunos em egresso. :mailbox_with_mail:

## Equipe

| Nome | E-mail | Git |
|------|--------|-----|
| Antonio Arlis Santos da Silva | antonio.silva27@outlook.com | [@antoni-s](https://github.com/antoni-s) |
| Beatriz Nogueira Carvalho da Silveira | beatrizncsilveira@gmail.com | [@BeatrizN](https://github.com/BeatrizN) |
| Keslley Lima da Silva | keslleyls@outlook.com | [@keslleylima](https://github.com/keslleylima) |
| Matheus Ribeiro Pimenta Nunes | matheuspiment@hotmail.com | [@matheuspiment](https://github.com/matheuspiment) |

---

# Especificação
<br />

![imagem-1](https://github.com/matheuspiment/sigaa-egressos/blob/master/docs/diagrama-implantacao.png)   
   >Figura 1 - Diagrama de implantação.

<br />

   O sigaa-engressos vem como uma solução de integração entre os sistemas SIGAA-UFG e SEMPRE-UFG a integração se dará por meio de troca de mensagens para isso é ultilizado o serviço [Emitter](https://emitter.io/ ).    
 <br />
   Conforme apresentado na figura 1 a comunicação entre o SIGAA-UFG e EMITTER, SEMPRE-UFG e EMITTER é realizada através do protocolo HTTP. A figura 2 (abaixo) apresenta a dependência entre os sistemas.
<br />
<br />
  
   ![imagem-2](https://github.com/matheuspiment/sigaa-egressos/blob/master/docs/diagrama-dependencia.png)   
   >Figura 2 - Diagrama de dependência.
