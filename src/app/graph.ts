/**
 * @file tschem.graph
 * @fileoverview graph datastructures for use in tschem
 * @author Rich Lewis
 * @version 0.1.0
 */

/**
 * @class Node
 * @description An object representing a node in a graph.
 * @param edges
 *
 */
 export class Node {
   edges: Edge[] = [];  // added edges add themselves to this list
 }

/**
 * @class Edge
 * @description An object representing an edge in a graph.
 * @param {Node} begin
 * @param {Node} end
 */
 export class Edge {
   private _begin: Node;
   private _end: Node;

   constructor (begin: Node, end: Node) {
     this.begin = begin;
     this.end = end;
   }

   set begin (node: Node) {

     // first remove this from the previous node
     let oldNode = this._begin;
     oldNode.edges.splice(oldNode.edges.indexOf(this), 1)

     // now add this to the new node
     this._begin = node;
     node.edges.push(this);
   }

   get begin (): Node {
     return this._begin;
   }

   set end (node: Node) {
     // first remove this from the previous node
     let oldNode = this._end;
     oldNode.edges.splice(oldNode.edges.indexOf(this), 1)

     // now add this to the new node
     this._end = node;
     node.edges.push(this);
   }

   get end (): Node {
     return this._end;
   }
 }

/**
 * @class Graph
 * @description An object representing a Graph.
 */
 export class Graph {
    edges: Edge[];
    nodes: Node[];
 }
