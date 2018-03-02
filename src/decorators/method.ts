import {PropertyDecorator, Injector} from '@ziggurat/tiamat';
import * as express from 'express';
import {map} from 'lodash';
import {RouterMeta} from './meta';

export class RouterMethodDecorator extends PropertyDecorator<string> {
  public constructor(private method: string) {
    super();
  }

  public decorate(data: string, target: any, key: string) {
    let meta = RouterMeta.get(target.constructor);

    meta.addMethodMiddleware(key, (injector: Injector) => {
      return (req: express.Request, res: express.Response, next: express.NextFunction) => {
        const result: any = target[key](req, res, next);
        if (result && result instanceof Promise) {
          result.then((value: any) => {
            if (value && !res.headersSent) {
              res.send(value);
            }
          })
          .catch((error: any) => {
            next(error);
          });
        } else if (result && !res.headersSent) {
          res.send(result);
        }
      };
    });
    meta.onSetup((router: express.Router, injector: Injector) => {
      const middleware = map(meta.getMethodMiddleware(key), provider => provider(injector));
      (<any>router)[this.method](data, middleware);
    });
  }
}