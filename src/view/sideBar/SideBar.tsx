import * as React from "react";
import { ReactiveComponent } from ".../utils";
import {
  EnterTransition,
  InstanceSelectionCard,
  ShareCard,
  VisManagementCard,
  DetailsCard
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
        <DetailsCard />
      </EnterTransition>
      <EnterTransition delay={90}>
        <ShareCard />
      </EnterTransition>
    </div>
  );
});
