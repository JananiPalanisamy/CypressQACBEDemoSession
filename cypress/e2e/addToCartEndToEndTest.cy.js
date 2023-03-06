import ProductPage from '../pages/ProductPage.js'

const productPage = new ProductPage()
describe('Test Suite - E-Commerce Tests', () => {

    let jsonData;
    let sum=0


    before('Read Fixtures', () => {
        cy.fixture("productList").then(function (data) { jsonData = data })
    })

    beforeEach('Visit url', () => {
        cy.visit(Cypress.env("baseURL"));

    })

    it('Verify Tax for products', () => {
        productPage.retrieveTaxValueOfAProduct(jsonData['validateTaxForProducts']['productName']).should('includes',jsonData.validateTaxForProducts.taxValue)
        // productPage.clickOnTab(jsonData.verifyAddtoCartAddition.mainItem)
        //  productPage.clickOnProductFromNavMenu(jsonData.verifyAddtoCartAddition.subItem)

    })

    it.only('Verify Sum of products',()=>{
        // productPage.clickProduct(jsonData.validateTaxForProducts.productName)
        // productPage.clickAddToCartButton()
        // productPage.getText().should('contain', 'Success')

        productPage.clickOnTab(jsonData.verifyAddtoCartAddition.mainItem)
        jsonData.verifyAddtoCartAddition.products.forEach(function(phonemodel){
            cy.selectProduct(phonemodel)
          })
          cy.wait(5000)
          cy.get('.btn-group.btn-block').click()
          cy.get('tr td:nth-child(4)').each(($el,index,$list) => {
            // cy.log($el.text())
         
            const result = $el.text()
            var res = result.replace('$','')
            cy.log(res)
            sum = Number(sum) + Number(res)
           
          }).then(function(){
            cy.log(sum)
          })
     cy.get('tbody > :nth-child(4) > :nth-child(2)').then(function(element)
     {
         const totalamt = element.text()
         var res = totalamt.replace('$','')
         expect(Number(res)).to.equal(sum)
     })
    })


})

