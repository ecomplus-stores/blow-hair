import * as merge from 'lodash.merge'
import query from '@ecomplus/search-engine/src/lib/dsl'

export default (self, term) => {
  if (term) {
    const sort = query.sort.slice()
    const relevanceSortIndex = sort.findIndex(s => s.ad_relevance)
    sort.splice(relevanceSortIndex, 1)
    self.dsl.sort = sort
  }

  const modelList = [
    "Banana",
    "Framboesa",
    "Laranja",
    "Laranja Zero Açucar",
    "Melancia",
    "Morango"
  ]

  const findMatchingModel = (searchTerm) => {
    const lowerSearchTerm = searchTerm.toLowerCase();
    for (const model of modelList) {
        if (model.toLowerCase() === lowerSearchTerm || lowerSearchTerm.includes(model.toLowerCase())) {
            return model;
        }
    }
    return 'isNotModel';
  }

  const searchedTerm = findMatchingModel(term)
  if (searchedTerm && searchedTerm.length && searchedTerm !== 'isNotModel') {
    self.dsl.query.bool.filter.push({
      "nested": {
        "path": "specs",
        "query": {
          "bool": {
            "filter": [
              {
                "term": {
                  "specs.grid": "flavor"
                }
              },
              {
                "terms": {
                  "specs.text": [
                    searchedTerm
                  ]
                }
              }
            ]
          }
        }
      }
    })
  }

  // match name and/or keyword with term
  // https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-multi-match-query.html
  self.mergeFilter({
    bool: {
      should: [
        {
          multi_match: {
            query: term,
            fields: [
              'name',
              'keywords'
            ]
          }
        }
      ]
    }
  }, 'must')

  merge(self.dsl, {
    // handle terms suggestion
    // 'did you mean?'
    // https://www.elastic.co/guide/en/elasticsearch/reference/current/search-suggesters.html
    suggest: {
      text: term,
      words: {
        term: {
          field: 'name'
        }
      }
    }
  })

  return self
}

/**
 * @method
 * @name EcomSearch#setSearchTerm
 * @description Defines term to match with product name
 * and/or keywords on next search request.
 *
 * @param {string} term - Term to be searched
 * @returns {self}
 *
 * @example
// Set new search term
search.setSearchTerm('smartphone')
 * @example
// Set new term and run search request
search.setSearchTerm('notebook').fetch()
 */
