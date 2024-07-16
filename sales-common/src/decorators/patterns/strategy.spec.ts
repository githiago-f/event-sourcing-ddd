import { IoCContainer } from '../../core';
import { StrategyFactory } from '../../core/patterns/strategy.factory';
import { Injectable } from './injectable';
import { Strategy } from './strategy';

abstract class BaseStrategy {
  abstract myMethod(): void;
}

@Strategy({ key: 'xpto' })
class XPTOStrategy extends BaseStrategy {
  myMethod(): void {
    console.log('[XPTOStrategy] It works');
  }
}

@Strategy({ key: 'acme' })
class AcmeStrategy extends BaseStrategy {
  myMethod(): void {
    console.log('[AcmeStrategy] It works');
  }
}

@Injectable()
class ConsumerClassImpl {
  constructor(private _strategyFactory: StrategyFactory<BaseStrategy>) {}
  method() {
    const strategy = this._strategyFactory
      .with(BaseStrategy)
      .get('xpto');
    strategy.myMethod();
  }
}

describe('#Strategy', () => {
  let methodSpy: jest.SpyInstance, impl: ConsumerClassImpl;
  beforeAll(() => {
    methodSpy = jest.spyOn(XPTOStrategy.prototype, 'myMethod');

    IoCContainer.instance.useStrategies(XPTOStrategy, AcmeStrategy);

    impl = IoCContainer.instance.get(ConsumerClassImpl);
  });

  it('should call the default strategy implemention', () => {
    impl.method();

    expect(methodSpy).toHaveBeenCalledTimes(1);
  });
});
