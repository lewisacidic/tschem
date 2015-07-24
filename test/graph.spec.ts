
/// <reference path="../typings/jasmine/jasmine.d.ts"/>

import {Node, Edge, Graph} from '../src/app/graph';

describe('Graph tests', () =>
  it('Should be able to create a node', () => {
    expect(new Node()).toBeDefined();
  }
))
