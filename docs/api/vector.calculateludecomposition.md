<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@josh-brown/vector](./vector.md) &gt; [calculateLUDecomposition](./vector.calculateludecomposition.md)

## calculateLUDecomposition() function

Uses the Doolittle algorithm to calculate the LU Decomposition of a matrix A.

<b>Signature:</b>

```typescript
export declare function calculateLUDecomposition<S>(A: Matrix<S>): LUDecomposition<S>;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  A | <code>Matrix&lt;S&gt;</code> | The matrix to decompose |

<b>Returns:</b>

`LUDecomposition<S>`

## Remarks

An LU Decomposition of a matrix A is a lower-triangular matrix L, an upper-triangular matrix U, and a row permutation matrix P such that \_PA = LU\_

