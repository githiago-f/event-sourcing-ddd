import { IoCContainer } from './ioc-container';

class NotInjectable {}

describe('# IoCContainer', () => {
  beforeEach(() => {
    // TODO
  });
  describe('when requested class is not injectable', () => {
    it('should raise a not injectable exception', () => {
      // expect.assertions(2);
      // IoCContainer.instance.get(NotInjectable)
    });
  });
  describe('when dependency is not injectable', () => {
  });
});
