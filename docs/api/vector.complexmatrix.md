<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@josh-brown/vector](./vector.md) &gt; [ComplexMatrix](./vector.complexmatrix.md)

## ComplexMatrix class

A dense [Matrix](./vector.matrix.md) of [ComplexNumber](./vector.complexnumber.md)<!-- -->s, implemented as an [ArrayMatrix](./vector.arraymatrix.md)

<b>Signature:</b>

```typescript
export declare class ComplexMatrix extends ArrayMatrix<ComplexNumber> 
```

## Methods

|  Method | Modifiers | Description |
|  --- | --- | --- |
|  [builder()](./vector.complexmatrix.builder.md) |  | Returns a [MatrixBuilder](./vector.matrixbuilder.md) which will build new matrices of the same type |
|  [builder()](./vector.complexmatrix.builder.md) | <code>static</code> |  |
|  [ops()](./vector.complexmatrix.ops.md) |  | Returns a [ScalarOperations](./vector.scalaroperations.md) object which will allow consumers to work generically with the scalars contained in the vector. |
|  [ops()](./vector.complexmatrix.ops.md) | <code>static</code> |  |
|  [vectorBuilder()](./vector.complexmatrix.vectorbuilder.md) |  | Returns a [VectorBuilder](./vector.vectorbuilder.md) which will build new vectors of a compatible type |
|  [vectorBuilder()](./vector.complexmatrix.vectorbuilder.md) | <code>static</code> |  |

## Remarks

The constructor for this class is marked as internal. Third-party code should not call the constructor directly or create subclasses that extend the `ComplexMatrix` class.
