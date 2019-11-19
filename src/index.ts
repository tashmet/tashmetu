import {component, factory} from '@ziggurat/tiamat';
import * as http from 'http';
import * as SocketIO from 'socket.io';
import * as express from 'express';
import {TashmetuServer} from './server';
import {SocketGateway} from './gateway';

export * from './decorators';
export * from './interfaces';
export * from './routers/resource';

@component({
  providers: [SocketGateway, TashmetuServer]
})
export default class Tashmetu {
  @factory({
    key: 'socket.io.Server',
    inject: ['http.Server']
  })
  public socketIOServer(server: http.Server): SocketIO.Server {
    return SocketIO(server);
  }

  @factory({
    key: 'http.Server',
    inject: ['express.Application']
  })
  public httpServer(app: express.Application): http.Server {
    return http.createServer(app);
  }

  @factory({
    key: 'express.Application'
  })
  public expressApp(): express.Application {
    return express();
  }
}
