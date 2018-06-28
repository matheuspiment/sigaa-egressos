import { expect } from 'chai';
import sigaaEgressos from './index';
import { isNumber } from 'util';

describe('sigaa-egressos', function() {
  describe('all', function() {
    it('should be an number', function() {
      expect(sigaaEgressos.all).to.equal(2);
    });

  });
});
