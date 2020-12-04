export default class SearchRangeFacetSteps {
  static visit() {
    cy.visit('/search-range-facet');
  }

  static getRangeFacet() {
    return cy.get('[appCypressData="onto-range-facet"]');
  }

  static getSelectedRangeFacetMin() {
    return cy.get('[appCypressData="selected-facets-min"]');
  }

  static getSelectedRangeFacetMax() {
    return cy.get('[appCypressData="selected-facets-max"]');
  }

  static getRangeSum() {
    return cy.get('[appCypressData="selected-sum"]');
  }

  static getRangeMin() {
    return cy.get('[appCypressData="selected-min"]');
  }

  static getRangeMax() {
    return cy.get('[appCypressData="selected-max"]');
  }

  static getRangeMinValue() {
    return cy.get('[appCypressData="selected-min-value"]');
  }

  static getRangeMaxValue() {
    return cy.get('[appCypressData="selected-max-value"]');
  }

  static setMinRangeValue(value: number) {
    let min: any;
      this.getRangeMinValue().should(($span) => {
        return $span.text()
      }).then(minValue => {
        min = minValue;
        this.getRangeMaxValue().should(($span) => {
          return $span.text()
        }).then(max => {
          const minValue = parseInt(min.text());
          const maxValue = parseInt(max.text());
          const average = (minValue + maxValue) / 2;

          if (value >= average + 0.5) {
            cy.get('[appCypressData="min-range"]')
              .invoke('val', average)
              .trigger('input').then(()=>SearchRangeFacetSteps.setMinRangeValue(value))

          } else {
            return cy.get('[appCypressData="min-range"]')
              .invoke('val', value)
              .trigger('input');
          }
        });
      });
  }


  static setMaxRangeValue(value: number) {
    let min: any;
    this.getRangeMinValue().should(($span) => {
      return $span.text()
    }).then(minValue => {
      min = minValue;
      this.getRangeMaxValue().should(($span) => {
        return $span.text()
      }).then(max => {
        const minValue = parseInt(min.text());
        const maxValue = parseInt(max.text());
        const average = (minValue + maxValue) / 2;

        if (value < average + 0.5) {
          cy.get('[appCypressData="max-range"]')
            .invoke('val', average)
            .trigger('input').then(() => SearchRangeFacetSteps.setMaxRangeValue(value))

        } else {
          return cy.get('[appCypressData="max-range"]')
            .invoke('val', value)
            .trigger('input');
        }
      });
    });
  }
}
