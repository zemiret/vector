<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@josh-brown/vector](./vector.md) &gt; [SupportVectorMachineClassifier](./vector.supportvectormachineclassifier.md) &gt; [predictProbabilities](./vector.supportvectormachineclassifier.predictprobabilities.md)

## SupportVectorMachineClassifier.predictProbabilities() method

Uses the learned parameters to make predictions for the probability of an event based on a set of input data.

<b>Signature:</b>

```typescript
predictProbabilities(_data: Matrix): Vector;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  \_data | <code>Matrix</code> |  |

<b>Returns:</b>

`Vector`

## Remarks

Must be called after [Classifier.train()](./vector.classifier.train.md)

