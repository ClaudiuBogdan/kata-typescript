# Eulerian Circuit

## Problem Description

An Eulerian circuit (or Eulerian cycle) is a closed walk in a graph that visits every edge exactly once and returns to the starting vertex. The problem of finding an Eulerian circuit can be stated as follows:

**Given a graph \( G(V, E) \) with vertices \( V \) and edges \( E \), determine whether an Eulerian circuit exists. If it exists, find such a circuit.**

A graph has an Eulerian circuit if and only if it is connected (except for isolated vertices) and all vertices have an even degree.

### Formal Definition

Let \( G = (V, E) \) be an undirected graph, where \( V \) is the set of vertices and \( E \) is the set of edges. An Eulerian circuit is a sequence \( (v_0, v_1, v_2, \ldots, v_k) \) where \( v_0 = v_k \) and:

-   \( (v*i, v*{i+1}) \) is an edge in \( E \) for \( 0 \leq i < k \)
-   Every edge in \( E \) appears exactly once in the sequence

## Algorithms to Solve the Problem

There are various algorithms to find an Eulerian circuit in a graph, if it exists. The most commonly used algorithms are:

1. **Hierholzer's Algorithm**: This algorithm starts at any vertex in the graph, and follows edges until it returns to the starting vertex, thereby creating a circuit. It then iteratively extends this circuit until all edges are included.
2. **Fleury’s Algorithm**: This is a more intuitive but less efficient algorithm. It starts at a vertex and moves along edges, but takes care not to "bridge" the graph unless necessary (i.e., it avoids removing edges that would disconnect the remaining graph).

For most practical purposes, Hierholzer's Algorithm is preferred due to its linear time complexity \( O(|E|) \).

## Even Degree Condition

The condition checks whether all vertices in the graph have an even degree, which is a necessary condition for an Eulerian circuit to exist in an undirected graph.

In graph theory, a vertex's degree is the number of edges connected to it. For a graph to have an Eulerian circuit (a closed walk that traverses every edge exactly once), the following conditions must be met:

1. The graph must be connected, meaning there's a path between every pair of vertices.
2. All vertices must have an even degree.

The reason for the second condition is intuitive if you think about what it means to enter and leave a vertex:

-   Every time you enter a vertex following one edge, you must also leave it following another edge.
-   Therefore, for every "in" there must be an "out," making the total number of incident edges (the vertex's degree) an even number.

So, the for-loop is checking this necessary condition. If it finds a vertex with an odd degree, it immediately returns `null` because an Eulerian circuit is impossible in such a case.
