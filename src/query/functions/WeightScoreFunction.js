  /**
   @class
     <p>The weight score allows you to multiply the score by the provided weight
   This can sometimes be desired since boost value set on specific queries gets
   normalized, while for this score function it does not.</p>

   @name ejs.WeightScoreFunction
   @ejs scorefunction
   @borrows ejs.ScoreFunctionMixin.filter as filter
   @borrows ejs.ScoreFunctionMixin._type as _type
   @borrows ejs.ScoreFunctionMixin.toJSON as toJSON

   @param {Float} weightVal the weight.

   @desc
   <p>Multiply the score by the provided weight.</p>

   */
  ejs.WeightScoreFunction = function (weightVal) {

    var
      _common = ejs.ScoreFunctionMixin('weight'),
      func = _common.toJSON();

    func.weight = weightVal;
    
    return extend(_common, {

      /**
       Sets the boost factor.

       @member ejs.BoostFactorScoreFunction
       @param {Float} b the boost factor.
       @returns {Object} returns <code>this</code> so that calls can be chained.
       */
      weight: function (b) {
        if (b == null) {
          return func.weight;
        }

        func.weight = b;
        return this;
      }

    });
  };
