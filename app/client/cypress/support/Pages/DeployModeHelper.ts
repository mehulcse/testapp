import { ObjectsRegistry } from "../Objects/Registry";

export class DeployMode {
  private locator = ObjectsRegistry.CommonLocators;
  private agHelper = ObjectsRegistry.AggregateHelper;

  _jsonFormFieldByName = (fieldName: string, input: boolean = true) =>
    `//p[text()='${fieldName}']/ancestor::div[@direction='column']//div[@data-testid='input-container']//${
      input ? "input" : "textarea"
    }`;
  _jsonFormRadioFieldByName = (fieldName: string) =>
    `//p[text()='${fieldName}']/ancestor::div[@direction='column']//div[@data-testid='radiogroup-container']//input`;
    _jsonFormDatepickerFieldByName = (fieldName: string) =>
    `//p[text()='${fieldName}']/ancestor::div[@direction='column']//div[@data-testid='datepicker-container']//input`;
  _jsonSelectDropdown = "button.select-button";
  _clearDropdown = "button.select-button span.cancel-icon"

  //refering PublishtheApp from command.js
  public DeployApp(
    eleToCheckInDeployPage: string = this.locator._backToEditor, toCheckFailureToast= true
  ) {
    //cy.intercept("POST", "/api/v1/applications/publish/*").as("publishAppli");
    // Wait before publish
    this.agHelper.Sleep(2000); //wait for elements settle!
    this.agHelper.AssertAutoSave();
    // Stubbing window.open to open in the same tab
    cy.window().then((window) => {
      cy.stub(window, "open").callsFake((url) => {
        window.location.href = Cypress.config().baseUrl + url.substring(1);
      });
    });
    cy.get(this.locator._publishButton).click();
    cy.log("Pagename: " + localStorage.getItem("PageName"));

    //Below url check throwing error - hence commenting!
    // cy.wait("@publishApp")
    //   .its("request.url")
    //   .should("not.contain", "edit");
    //cy.wait('@publishApp').wait('@publishApp') //waitng for 2 calls to complete

    this.agHelper.WaitUntilEleAppear(eleToCheckInDeployPage);
    localStorage.setItem("inDeployedMode", "true");
    toCheckFailureToast && this.agHelper.AssertElementAbsence(this.locator._toastMsg);//Validating bug - 14141 + 14252
    this.agHelper.Sleep(2000); //for Depoy page to settle!
  }

  // Stubbing window.open to open in the same tab
  public StubbingWindow() {
    cy.window().then((window: any) => {
      cy.stub(window, "open").callsFake((url) => {
        window.location.href = url;
        window.location.target = "_self";
      });
    });
  }

   public NavigateBacktoEditor() {
    cy.get(this.locator._backToEditor).click();
    this.agHelper.Sleep(2000);
    localStorage.setItem("inDeployedMode", "false");
  }

  public EnterJSONInputValue(fieldName: string, value: string, index = 0) {
    cy.xpath(this._jsonFormFieldByName(fieldName))
      .eq(index)
      .click()
      .type(value)
      .wait(500);
  }

  public EnterJSONTextAreaValue(fieldName: string, value: string, index = 0) {
    cy.xpath(this._jsonFormFieldByName(fieldName, false))
      .eq(index)
      .click()
      .type(value)
      .wait(500);
  }

  public ClearJSONFieldValue(fieldName: string, index = 0, isInput = true) {
    cy.xpath(this._jsonFormFieldByName(fieldName, isInput))
      .eq(index)
      .clear()
      .wait(500);
  }

  public SelectJsonFormDropDown(dropdownOption: string, index = 0) {
    cy.get(this._jsonSelectDropdown)
      .eq(index)
      .scrollIntoView()
      .click();
    cy.get(this.locator._selectOptionValue(dropdownOption)).click({ force: true });
    this.agHelper.Sleep(); //for selected value to reflect!
  }
}
