import IconSVG from "./icon.svg";
import { SnipablePropertyValueType } from "../BaseWidget";
import Widget from "./widget";

export const CONFIG = {
  type: Widget.getWidgetType(),
  name: "Text",
  iconSVG: IconSVG,
  defaults: {
    text: "Label",
    fontSize: "PARAGRAPH",
    fontStyle: "BOLD",
    textAlign: "LEFT",
    textColor: "#231F20",
    truncateButtonColor: "#FFC13D",
    rows: 4,
    columns: 16,
    widgetName: "Text",
    shouldScroll: false,
    shouldTruncate: false,
    version: 1,
    animateLoading: true,
  },
  properties: {
    derived: Widget.getDerivedPropertiesMap(),
    default: Widget.getDefaultPropertiesMap(),
    meta: Widget.getMetaPropertiesMap(),
    config: Widget.getPropertyPaneConfig(),
  },
  sniping: {
    widgetType: Widget.getWidgetType(),
    isSnipable: true,
    snipableProperty: "text",
    shouldSetPropertyInputToJsMode: true,
    snipablePropertyValueType: SnipablePropertyValueType.DATA,
  },
};

export default Widget;
