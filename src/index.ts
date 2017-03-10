import {component} from '@samizdatjs/tiamat';
import {DatabaseReporter, FileSystemReporter} from './reporters';

export {FileSystem, file, directory} from './fs';
export {yaml} from './yaml';
export {Server, MiddlewareProvider, router, get} from './server';
export {ReadOnlyRestProvider} from './rest';
export {requestReporter} from './reporters';

import {FileSystemService, FSCollectionManager} from './fs';
import {Server} from './server';

@component({
  providers: [
    FileSystemService,
    Server,
    DatabaseReporter,
    FileSystemReporter,
    FSCollectionManager
  ]
})
export class TashmetuServer {}
