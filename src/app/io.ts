/**
 * @file tschem.io
 * @fileoverview serialization of tschem datastructures
 * @author Rich Lewis
 * @version 0.1.0
 */

 import {Molecule} from './core';

 /**
  * @interface Deserializer
  * The interface for a File format serializer.
  */
 interface Serializer {
   read: (input:string) => Molecule;
   write: (mol: Molecule) => string;
 }

 /**
  * @class ChemDoodleJSONSerializer
  * For reading ChemDoodleJSON files
  */
 export class ChemDoodleJSONSerializer implements Serializer {
   read (input: string): Molecule {
     return new Molecule();
   }

   write (mol: Molecule): string {
     return '';
   }
 }
