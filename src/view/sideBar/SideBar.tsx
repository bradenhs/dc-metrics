import * as React from "react";
import { ReactiveComponent } from ".../utils";
import {
  EnterTransition,
  InstanceSelectionCard,
  ShareCard,
  VisManagementCard
} from ".../view";

export const SideBar = ReactiveComponent(() => {
  return (
    <div>
      <EnterTransition>
        <InstanceSelectionCard />
      </EnterTransition>
      <EnterTransition delay={30}>
        <VisManagementCard />
      </EnterTransition>
      <EnterTransition delay={60}>
        <ShareCard />
      </EnterTransition>
    </div>
  );
});
