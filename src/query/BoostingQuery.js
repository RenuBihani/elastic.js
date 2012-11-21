  /**
    @class
    <p>The boosting query can be used to effectively demote results that match 
    a given query. Unlike the “NOT” clause in bool query, this still selects 
    documents that contain undesirable terms, but reduces their overall 
    score.</p>

    @name ejs.BoostingQuery

    @desc
    <p>Constructs a query that can demote search results.  A negative boost.</p>

    @param {Object} positiveQry Valid query object used to select all matching docs.
    @param {Object} negativeQry Valid query object to match the undesirable docs 
      returned within the positiveQry result set.
    @param {Double} negativeBoost A double value where 0 < n < 1.
     */
  ejs.BoostingQuery = function (positiveQry, negativeQry, negativeBoost) {

    /**
         The internal Query object. Use <code>get()</code>.
         @member ejs.ConstantScoreQuery
         @property {Object} ConstantScoreQuery
         */
    var query = {
      boosting: {
        positive: positiveQry.get(),
        negative: negativeQry.get(),
        negative_boost: negativeBoost
      }
    };

    return {
    
      /**
             Sets the "master" query that determines which results are returned.

             @member ejs.BoostingQuery
             @param {Object} oQuery A valid <code>Query</code> object
             @returns {Object} returns <code>this</code> so that calls can be 
              chained. Returns {Object} current positive query if oQuery is
              not specified.
             */
      positive: function (oQuery) {
        if (oQuery == null) {
          return query.boosting.positive;
        }
    
        query.boosting.positive = oQuery.get();
        return this;
      },

      /**
             Sets the query used to match documents in the <code>positive</code>
             query that will be negatively boosted.

             @member ejs.BoostingQuery
             @param {Object} oQuery A valid <code>Query</code> object
             @returns {Object} returns <code>this</code> so that calls can be 
              chained. Returns {Object} current negative query if oQuery is
              not specified.
             */
      negative: function (oQuery) {
        if (oQuery == null) {
          return query.boosting.negative;
        }
    
        query.boosting.negative = oQuery.get();
        return this;
      },
   
      /**
            Sets the negative boost value.

            @member ejs.BoostingQuery
            @param {Double} boost A positive <code>double</code> value where 0 < n < 1.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      negativeBoost: function (negBoost) {
        if (negBoost == null) {
          return query.boosting.negative_boost;
        }

        query.boosting.negative_boost = negBoost;
        return this;
      },
    
      /**
            Sets the boost value of the <code>Query</code>.

            @member ejs.BoostingQuery
            @param {Double} boost A positive <code>double</code> value.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      boost: function (boost) {
        if (boost == null) {
          return query.boosting.boost;
        }

        query.boosting.boost = boost;
        return this;
      },

      /**
             Serializes the internal <em>query</em> object as a JSON string.
             @member ejs.BoostingQuery
             @returns {String} Returns a JSON representation of the Query object.
             */
      toString: function () {
        return JSON.stringify(query);
      },

      /**
            This method is used to retrieve the raw query object. It's designed
            for internal use when composing and serializing queries.
            @member ejs.BoostingQuery
            @returns {Object} Returns the object's <em>query</em> property.
            */
      get: function () {
        return query;
      }
    };
  };