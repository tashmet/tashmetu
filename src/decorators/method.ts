import {RequestHandler} from 'express';
import {Resolver} from '@ziggurat/tiamat';
import {RouterAnnotation} from './middleware';
import {Route, RouteMethod} from '../interfaces';

export class RouterMethodAnnotation extends RouterAnnotation {
  public constructor(
    private method: RouteMethod,
    private path: string,
    private middleware: (RequestHandler | Resolver<RequestHandler>)[],
    private target: any,
    private propertyKey: string
  ) { super(); }

  public routes(controller: any): Route[] {
    return [{
      method: this.method,
      path: this.path,
      handlers: this.middleware.concat(
        (...args: any[]) => controller[this.propertyKey](...args)
      )
    }];
  }
}
