# Maximum Bipartite Matching

Maximum bipartite matching is a classic problem in graph theory and computer science that seeks to find the maximum number of matches in a bipartite graph without any overlaps.

## Problem Description

A bipartite graph is a graph whose vertices can be divided into two disjoint sets \( U \) and \( V \) such that every edge connects a vertex in \( U \) to one in \( V \). Matching in a bipartite graph is a set of edges chosen in such a way that no two edges share an endpoint.

A maximum matching is a matching that contains the largest possible number of edges. No other matching can have more edges than a maximum matching.

## Applications

This problem has many practical applications such as:

-   Job assignments where jobs can only be done by certain employees.
-   Matching students to schools.
-   Matching donors to recipients in a kidney exchange.
-   Scheduling problems where resources are limited.

## Algorithm to Solve the Problem

The problem of finding the maximum bipartite matching is often solved using the **Hungarian algorithm** or the **Hopcroft-Karp algorithm**:

1. **Hungarian Algorithm**: Also known as the Kuhn-Munkres algorithm, this is a combinatorial optimization algorithm that solves the assignment problem in polynomial time. It's more general and can also be used for weighted bipartite graphs.

2. **Hopcroft-Karp Algorithm**: This is specifically designed for unweighted bipartite graphs and is more efficient than the Hungarian algorithm for such cases. It operates by repeatedly increasing the size of the matching by finding augmenting paths. An augmenting path is a path that starts and ends at unmatched vertices, with edges alternating between not in the matching and in the matching.

The Hopcroft-Karp algorithm has a time complexity of \( O(E \sqrt{V}) \), where \( E \) is the number of edges and \( V \) is the number of vertices. It's the most commonly used algorithm for maximum bipartite matching because of its efficiency.

## References

-   [ChatGpt](https://chat.openai.com/c/9d1f616b-6bdb-47c7-a3e2-7a48e983e2cf)
