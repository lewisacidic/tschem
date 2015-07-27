/**
 * @file tschem.io
 * @fileoverview serialization of tschem datastructures
 * @author Rich Lewis
 * @version 0.1.0
 */

 import {Atom, Bond, Conformer, Molecule} from './core';

 /**
  * @interface Deserializer
  * The interface for a File format serializer.
  */
 interface Serializer<T> {
   read: (input: T) => Molecule;
   write: (mol: Molecule) => T;
 }

 // describes ChemDoodleJson formats
 interface ICDAtom {
   i?: string,
   l?: string,
   x?: number,
   y?: number,
   z?: number,
   c?: number,
   m?: number,
   r?: number,
   p?: number
 }

 interface ICDBond {
   i?: string,
   b: number,
   e: number,
   o?: number,
   s?: string
 }

 interface ICDMolecule {
   a: Array<ICDAtom>;
   b: Array<ICDBond>;
 }

 /**
  * @class ChemDoodleJSONSerializer
  * For reading ChemDoodleJSON files
  */
 export class ChemDoodleJSONSerializer implements Serializer<Object> {
   read (input: ICDMolecule): Molecule {
     let m = new Molecule();
     m.atoms = input.a.map(json => this.parseAtom(json, m));
     m.bonds = input.b.map(json => this.parseBond(json, m));
     m.conformers.push(new Conformer({
       positions: input.a.map(json => [json.x, json.y, json.z])
       }))
     return m;
   }

   write (mol: Molecule): ICDMolecule {
     // TODO
     return {
       a: mol.atoms.map(atom => this.writeAtom(atom)),
       b: mol.bonds.map(bond => this.writeBond(bond))
     };
   }

   //TODO
   private writeAtom (atom: Atom): ICDAtom {
     return {}
   }

   //TODO
   private writeBond (bond: Bond): ICDBond {
     return {
       b: 1,
       e: 1
     }
   }

   private parseAtom (json: ICDAtom, m: Molecule): Atom {
     let a = new Atom({}, m);

     a.symbol = typeof(json.l) !== 'undefined' ? json.l : 'C'; // get a symbol rather than atomic number in cdjson
     a.charge = typeof(json.c) !== 'undefined' ? json.c : 0;
     a.mass = typeof(json.m) !== 'undefined' ? json.m : -1;
     a.radicals = typeof(json.r) !== 'undefined' ? json.r : 0;
     a.lonePairs = typeof(json.p) !== 'undefined' ? json.p : 0;

     return a;
   }
   private parseBond (json: ICDBond, m: Molecule): Bond {
     return new Bond({
        beginAtomIndex: json.b,
        endAtomIndex: json.e,
        order: typeof(json.o) !== 'undefined' ? json.o : 1,
        stereochemistry: typeof(json.s) !== 'undefined' ? json.s : 'undefined'
     }, m);
   }
 }
