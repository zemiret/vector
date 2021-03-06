<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@josh-brown/vector](./vector.md) &gt; [calculateQRDecomposition](./vector.calculateqrdecomposition.md)

## calculateQRDecomposition() function

Uses the Graham-Schmidt process to calculate the QR decomposition of the matrix A.

<b>Signature:</b>

```typescript
export declare function calculateQRDecomposition<S>(A: Matrix<S>): QRDecomposition<S>;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  A | <code>Matrix&lt;S&gt;</code> | The matrix to decompose |

<b>Returns:</b>

`QRDecomposition<S>`

## Remarks

A QR Decomposition of a matrix A is a unitary matrix Q and upper-triangular matrix R such that Q multiplied by R yields A

