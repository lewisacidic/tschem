
/// <reference path="../../typings/jasmine/jasmine.d.ts"/>

import {Atom, Bond, Molecule} from '../app/core';

describe('Atom tests', () => {
  let defaultAtom = new Atom();

  it('should be able to create an atom with no arguments', () => {
    expect(defaultAtom).toBeDefined();
  });

  it('should be default Carbon', () => {
    expect(defaultAtom.atomicNumber).toEqual(6);
  });

  it('should have C symbol', () => {
    expect(defaultAtom.symbol).toEqual('C');
  });

  let customAtom = new Atom({atomicNumber: 7});

  it('should be able to create an atom with json', () => {
    expect(customAtom).toBeDefined();
  });

  it('should be have N as a symbol', () => {
    expect(customAtom.symbol).toEqual('N');
  });

  it('should change its symbol when the atomic number is set', () => {
    customAtom.atomicNumber = 8;
    expect(customAtom.symbol).toEqual('O');
  });

  it('should change its atomic number when its symbol is set', () => {
    customAtom.symbol = 'Cl';
    expect(customAtom.atomicNumber).toEqual(17);
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
      conformers: [{
        positions: [
          [0.000000, 0.000000, 0.000000],
          [0.629118, 0.629118, 0.629118],
          [-0.629118, -0.629118, 0.629118],
          [0.629118, -0.629118, -0.629118],
          [-0.629118, 0.629118, -0.629118],
        ]
        }],
      name: 'methane'
  });
  it('should be able to create a molecule', () => {
    expect(m).toBeDefined();
  });
  it('should have 5 atoms', () => {
    expect(m.atoms.length).toEqual(5);
  });
  it('should have 4 bonds', () => {
    expect(m.bonds.length).toEqual(4);
  });
  it('should have center 0', () => {
    let c = m.conformers[0].center();
    expect(c).toEqual([0,0,0]);
  });
});

describe('Bond tests', () => {

});
