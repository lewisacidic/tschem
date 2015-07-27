/**
 * @file tschem.core
 * @fileoverview Defines the core datastructures.
 * @author Rich Lewis
 * @version 0.1.0
 */

 import {Node, Edge, Graph} from './graph';


/**
 * @interface IAtom
 * Interface specifying atom chemical json properties.
 */
interface IAtom {
  atomicNumber?: number;
  charge?: number;
  mass?: number;
  radicals?: number;
  lonePairs?: number;
  symbol?: string;
}


/**
 * @interface IBond
 * Interface specifying bond chemical json properties.
 */
interface IBond {
  beginAtomIndex: number;
  endAtomIndex: number;
  order?: number;
  stereochemistry?: string; // perhaps this will be tightened up
}


/**
 * @interface IConformer
 * Interface specifying conformer chemical json properties.
 */
interface IConformer {
  positions: number[][];
}


/**
 * @interface IMolecule
 * Interface specifying molecule chemical json properties.
 */
interface IMolecule {
  name?: string;
  atoms: IAtom[];
  bonds: IBond[];
  conformers: IConformer[];
}


enum Symbol {
  "n", "H", "He", "Li", "Be", "B", "C", "N", "O", "F", "Ne", "Na", "Mg", "Al",
  "Si", "P", "S", "Cl", "Ar", "K", "Ca", "Sc", "Ti", "V", "Cr", "Mn", "Fe", "Co",
  "Ni", "Cu", "Zn", "Ga", "Ge", "As", "Se", "Br", "Kr", "Rb", "Sr", "Y", "Zr",
  "Nb", "Mo", "Tc", "Ru", "Rh", "Pd", "Ag", "Cd", "In", "Sn", "Sb", "Te", "I",
  "Xe", "Cs", "Ba", "La", "Ce", "Pr", "Nd", "Pm", "Sm", "Eu", "Gd", "Tb", "Dy",
  "Ho", "Er", "Tm", "Yb", "Lu", "Hf", "Ta", "W", "Re", "Os", "Ir", "Pt", "Au",
  "Hg", "Tl", "Pb", "Bi", "Po", "At", "Rn", "Fr", "Ra", "Ac", "Th", "Pa", "U",
  "Np", "Pu", "Am", "Cm", "Bk", "Cf", "Es", "Fm", "Md", "No", "Lr", "Rf", "Db",
  "Sg", "Bh", "Hs", "Mt", "Ds", "Rg", "Cn", "Uut", "Fl", "Uup", "Lv", "Uus",
  "Uuo"
}


 /**
  * @class Atom instance
  * @description An object representing an Atom
  */
 export class Atom extends Node {

   public atomicNumber: number;
   public charge: number;
   public mass: number;
   public radicals: number;
   public lonePairs: number;

   constructor (json: IAtom = {}, public molecule: Molecule = null) {
     super();
     json.atomicNumber = typeof(json.atomicNumber) === 'undefined' ? 6 : json.atomicNumber
     this.atomicNumber = json.atomicNumber;
     this.charge = json.charge;
     this.mass = json.mass;
     this.radicals = json.radicals;
     this.lonePairs = json.lonePairs;
   }

   get bonds(): Bond[] {
     return <Bond[]>this.edges;
   }

   get symbol(): string {
     return Symbol[this.atomicNumber];
   }

   set symbol(symbol: string) {
     this.atomicNumber = Symbol[symbol];
   }
 }


 /**
  * @class Bond instance
  * @description An object representing a Bond
  */
 export class Bond extends Edge {
   beginAtom: Atom;
   endAtom: Atom;
   order: number;
   stereochemistry: string;

   constructor (json: IBond, molecule: Molecule) {
     if (json.beginAtomIndex == null || json.endAtomIndex == null) {
       throw("Bonds must be betwen atoms");
     }
     this.beginAtom = molecule.atoms[json.beginAtomIndex];
     this.endAtom = molecule.atoms[json.endAtomIndex];
     this.order = json.order;
     this.stereochemistry = json.stereochemistry;
     super(this.beginAtom, this.endAtom);
   }
 }


 /**
  * @class Conformer instance
  * @description An object representing a Conformer
  */
 export class Conformer {
   positions: number[][];
   constructor (json: IConformer = {positions:[]}) {
     this.positions = json.positions;
   }
 }


 /**
  * @class Molecule instance
  *
  */
 export class Molecule extends Graph {
   atoms: Atom[];
   bonds: Bond[];
   conformers: Conformer[];

   constructor (json: IMolecule = {atoms:[], bonds:[], conformers:[]}) {
     super();
     this.atoms = json.atoms.map(atom => new Atom(atom, this));
     this.bonds = json.bonds.map(bond => new Bond(bond, this));
     this.conformers = json.conformers.map(conformer => new Conformer(conformer));
   }

 }
