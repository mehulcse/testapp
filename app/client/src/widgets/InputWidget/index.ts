import IconSVG from "./icon.svg";
import { SnipablePropertyValueType } from "../BaseWidget";
import Widget from "./widget";

export const CONFIG = {
  type: Widget.getWidgetType(),
  name: "Input",
  iconSVG: IconSVG,
  needsMeta: true,
  hideCard: true,
  defaults: {
    inputType: "TEXT",
    rows: 4,
    label: "",
    columns: 20,
    widgetName: "Input",
    version: 1,
    defaultText: "",
    iconAlign: "left",
    autoFocus: false,
    labelStyle: "",
    resetOnSubmit: true,
    isRequired: false,
    isDisabled: false,
    allowCurrencyChange: false,
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
    snipableProperty: "defaultText",
    shouldSetPropertyInputToJsMode: true,
    snipablePropertyValueType: SnipablePropertyValueType.DATA,
  },
};

export default Widget;
