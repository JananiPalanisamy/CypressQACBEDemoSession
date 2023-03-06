require('cypress-xpath')
class ProductPage {

    taxValueLabel(productName) { return cy.xpath(`//a[text()='${productName}']/following::p[@class='price'][1]//span`) }
    // tabLabel(itemName){ return cy.get('.dropdown-toggle').contains(itemName)}
    tabLabel(itemName){ return cy.contains(itemName) }
    displayDropDown(){ return  cy.get('.dropdown-toggle') }
    addToCartButton = "#button-cart"
    alert = ".alert"

   
 
    retrieveTaxValueOfAProduct(productName) {
        let tax =this.taxValueLabel(productName).invoke('text')
        return tax
    }

    clickOnTab(itemName){
        this.tabLabel(itemName).click({force: true})
    }

    clickOnProductFromNavMenu(subItem){
        this.displayDropDown().invoke('show')
        cy.contains(subItem).click({force:true})
    }

    // //add to cart methods
    clickProduct(productName){
        cy.contains(productName).click()
    }

    // clickAddToCartButton(){
    //     cy.get(this.addToCartButton).click({force:true})
    // }

    // getText(){
    //     const text = cy.get(this.alert).invoke('text')
    //     return text
    
    // }


}

export default ProductPage;

