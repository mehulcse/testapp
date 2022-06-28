import * as React from "react";

import BaseControl, { ControlData, ControlProps } from "./BaseControl";
import { TooltipComponent } from "design-system";
import { boxShadowOptions } from "constants/ThemeConstants";
import CloseLineIcon from "remixicon-react/CloseLineIcon";
import { ButtonTabComponent } from "components/ads";
import {
  AdsEventDetail,
  ADSEventTypes,
  ADS_EVENT,
  emitInteractionAnalyticsEvent,
} from "utils/AppsmithUtils";
export interface BoxShadowOptionsControlProps extends ControlProps {
  propertyValue: string | undefined;
}

const options = Object.keys(boxShadowOptions).map((optionKey) => ({
  icon: (
    <TooltipComponent
      content={
        <div>
          <div>{optionKey}</div>
        </div>
      }
      key={optionKey}
      openOnTargetFocus={false}
    >
      <button tabIndex={-1}>
        <div
          className="flex items-center justify-center w-5 h-5 bg-white"
          style={{ boxShadow: boxShadowOptions[optionKey] }}
        >
          {boxShadowOptions[optionKey] === "none" && (
            <CloseLineIcon className="text-gray-700" />
          )}
        </div>
      </button>
    </TooltipComponent>
  ),
  value: boxShadowOptions[optionKey],
}));

const optionsValues = new Set(Object.values(boxShadowOptions));

class BoxShadowOptionsControl extends BaseControl<
  BoxShadowOptionsControlProps
> {
  componentRef = React.createRef<HTMLDivElement>();

  componentDidMount() {
    this.componentRef.current?.addEventListener(
      ADS_EVENT,
      this.handleAdsEvent as (arg0: Event) => void,
    );
  }

  componentWillUnmount() {
    this.componentRef.current?.removeEventListener(
      ADS_EVENT,
      this.handleAdsEvent as (arg0: Event) => void,
    );
  }

  handleAdsEvent = (e: CustomEvent<AdsEventDetail>) => {
    if (
      e.detail.component === "ButtonTab" &&
      e.detail.event === ADSEventTypes.KEYBOARD_ANALYTICS
    ) {
      emitInteractionAnalyticsEvent(this.componentRef.current, {
        key: e.detail.meta.key,
      });
      e.stopPropagation();
    }
  };

  static getControlType() {
    return "BOX_SHADOW_OPTIONS";
  }

  public render() {
    return (
      <ButtonTabComponent
        options={options}
        ref={this.componentRef}
        selectButton={(value, isUpdatedViaKeyboard = false) => {
          this.updateProperty(
            this.props.propertyName,
            value,
            isUpdatedViaKeyboard,
          );
        }}
        values={this.props.evaluatedValue ? [this.props.evaluatedValue] : []}
      />
    );
  }

  static canDisplayValueInUI(config: ControlData, value: any): boolean {
    return optionsValues.has(value);
  }
}

export default BoxShadowOptionsControl;
