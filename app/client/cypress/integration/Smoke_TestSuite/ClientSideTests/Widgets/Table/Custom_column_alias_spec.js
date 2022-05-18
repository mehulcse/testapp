const dsl = require("../../../../../fixtures/tableV2NewDsl.json");
const commonlocators = require("../../../../../locators/commonlocators.json");

const data = [
  {
    "普通话 [普通話] ": "mandarin",
    français: "french",
    español: "spanish",
    日本語: "japnese",
    हिन्दी: "hindi",
  },
];

describe("Custom column alias functionality", () => {
  before(() => {
    cy.addDsl(dsl);
  });

  it("should test that custom column has alias property", () => {
    cy.openPropertyPane("tablewidgetv2");
    cy.testJsontext("tabledata", `${JSON.stringify(data)}`);
    cy.wait("@updateLayout");
    cy.addColumnV2("text");
    cy.editColumn("customColumn1");
    cy.get(".t--property-control-propertyname").should("exist");
    cy.get(".t--property-control-propertyname .CodeMirror-code")
      .invoke("text")
      .then((value) => {
        expect(value).to.equal("customColumn1");
      });
  });

  it("should test that custom alias is used in the selectedRow", () => {
    cy.dragAndDropToCanvas("textwidget", { x: 200, y: 100 });
    cy.openPropertyPane("textwidget");
    cy.testJsontext("text", "{{Table1.selectedRow}}");
    cy.openPropertyPane("tablewidgetv2");
    cy.editColumn("customColumn1");
    cy.testJsontext("propertyname", "columnAlias");
    cy.get(".t--widget-textwidget .bp3-ui-text").should(
      "contain",
      `{  "普通话 [普通話] ": "",  "français": "",  "español": "",  "日本語": "",  "हिन्दी": "",  "columnAlias": ""}`,
    );
    cy.isSelectRow(0);
    cy.get(".t--widget-textwidget .bp3-ui-text").should(
      "contain",
      `{  "普通话 [普通話] ": "mandarin",  "français": "french",  "español": "spanish",  "日本語": "japnese",  "हिन्दी": "hindi",  "columnAlias": ""}`,
    );
  });

  it("should test that custom alias is used in the triggeredRow", () => {
    cy.openPropertyPane("textwidget");
    cy.testJsontext("text", "{{Table1.triggeredRow}}");
    cy.openPropertyPane("tablewidgetv2");
    cy.addColumnV2("customColumn2");
    cy.editColumn("customColumn2");
    cy.get(commonlocators.changeColType)
      .last()
      .click();
    cy.get(".t--dropdown-option")
      .children()
      .contains("Button")
      .click();
    cy.get(".t--property-control-onclick .t--open-dropdown-Select-Action")
      .last()
      .click();
    cy.selectShowMsg();
    cy.addSuccessMessage("clicked!!", ".t--property-control-onsave");
    cy.wait(1000);
    cy.get(".t--widget-textwidget .bp3-ui-text").should(
      "contain",
      `{  "普通话 [普通話] ": "",  "français": "",  "español": "",  "日本語": "",  "हिन्दी": "",  "columnAlias": "",  "customColumn2": ""}`,
    );
    cy.get(`[data-colindex="6"][data-rowindex="0"] button`).trigger("click", {
      force: true,
    });
    cy.get(".t--widget-textwidget .bp3-ui-text").should(
      "contain",
      `{  "普通话 [普通話] ": "mandarin",  "français": "french",  "español": "spanish",  "日本語": "japnese",  "हिन्दी": "hindi",  "columnAlias": "",  "customColumn2": ""}`,
    );
  });
});
