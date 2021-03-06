<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@josh-brown/vector](./vector.md) &gt; [solveOverdeterminedSystem](./vector.solveoverdeterminedsystem.md)

## solveOverdeterminedSystem() function

Gives an approximate solution to an overdetermined linear system.

<b>Signature:</b>

```typescript
export declare function solveOverdeterminedSystem<S>(A: Matrix<S>, b: Vector<S>): Vector<S>;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  A | <code>Matrix&lt;S&gt;</code> | The matrix \_A\_ in \_Ax = b\_ |
|  b | <code>Vector&lt;S&gt;</code> | The vector \_b\_ in \_Ax = b\_ |

<b>Returns:</b>

`Vector<S>`

## Remarks

When the system \_Ax = b\_ is overdetermined, it has no solution. However, there exists a unique vector \_x\_ which minimizes the difference Ax-b, which solves `A.transpose().multiply(A).apply(x) === A.transpose().apply(b)`

