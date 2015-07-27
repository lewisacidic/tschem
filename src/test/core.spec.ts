
/// <reference path="../../typings/jasmine/jasmine.d.ts"/>

import {Atom, Bond, Molecule} from '../app/core';

describe('Atom tests', () => {
  let defaultAtom = new Atom();

  it('should be able to create an atom with no arguments', () => {
    expect(defaultAtom).toBeDefined();
  });

  it('should be default Carbon', () => {
    expect(defaultAtom.atomicNumber).toBe(6);
  });

  it('should have C symbol', () => {
    expect(defaultAtom.symbol).toBe('C');
  });

  let customAtom = new Atom({atomicNumber: 7});

  it('should be able to create an atom with json', () => {
    expect(customAtom).toBeDefined();
  });

  it('should be have N as a symbol', () => {
    expect(customAtom.symbol).toBe('N');
  });

  it('should change its symbol when the atomic number is set', () => {
    customAtom.atomicNumber = 8;
    expect(customAtom.symbol).toBe('O');
  });

  it('should change its atomic number when its symbol is set', () => {
    customAtom.symbol = 'Cl';
    expect(customAtom.atomicNumber).toBe(17);
  });
});

describe('Molecule tests', () => {
  let m = new Molecule({
      atoms: [
        {atomicNumber: 6},
        {atomicNumber: 1},
        {atomicNumber: 1},
        {atomicNumber: 1},
        {atomicNumber: 1}
      ],
      bonds: [
        {beginAtomIndex: 0,  endAtomIndex: 1},
        {beginAtomIndex: 0,  endAtomIndex: 2},
        {beginAtomIndex: 0,  endAtomIndex: 3},
        {beginAtomIndex: 0,  endAtomIndex: 4}
      ],
      conformers: [],
      name: 'methane'
  });
  it('should be able to create a molecule', () => {
    expect(m).toBeDefined();
  });
  it('should have 5 atoms', () => {
    expect(m.atoms.length).toBe(5);
  });
  it('should have 4 bonds', () => {
    expect(m.bonds.length).toBe(4);
  });
});

describe('Bond tests', () => {

});
