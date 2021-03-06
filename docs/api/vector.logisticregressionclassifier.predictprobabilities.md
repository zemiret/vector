<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@josh-brown/vector](./vector.md) &gt; [LogisticRegressionClassifier](./vector.logisticregressionclassifier.md) &gt; [predictProbabilities](./vector.logisticregressionclassifier.predictprobabilities.md)

## LogisticRegressionClassifier.predictProbabilities() method

Uses the learned parameters to make predictions for the probability of an event based on a set of input data.

<b>Signature:</b>

```typescript
predictProbabilities(data: Matrix): Vector;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  data | <code>Matrix</code> | A [Vector](./vector.vector.md) whose rows are the observations in the test set |

<b>Returns:</b>

`Vector`

## Remarks

Must be called after [Classifier.train()](./vector.classifier.train.md)

