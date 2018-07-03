import { hasClient, checkMessage } from 'utils';

describe('sigaa-egressos', () => {
  describe('checkMessage', () => {
    test('should be a invalid message: must be an object', () => {
      expect(() => checkMessage(5)).toThrowError('The message must be an object');
    });

    test('should be a invalid message: does not have all the expected keys', () => {
      expect(() => checkMessage({ id: 2 })).toThrowError('The message does not have all the expected keys');
    });

    test('should be a invalid message: contains invalid keys', () => {
      expect(() => checkMessage({
        id: 1,
        title: 'Teste',
        type: 'noticia',
        testo: 'Olá',
      })).toThrowError('The message contains invalid keys');
    });

    test('should be a invalid message: wrong value for keys', () => {
      expect(() => checkMessage({
        id: 1,
        title: 3,
        type: 'noticia',
        description: 'Olá',
      })).toThrowError('The value for the title must be a string');
    });
  });

  describe('hasClient', () => {
    test('client is undefined', () => {
      expect(() => hasClient()).toThrowError('Connection undefined');
    });
  });
});
