import { createAction } from "@ngrx/store";
import { LeftSidebarTabs } from "src/app/shared/models/left-sidebar";

export const leftSidebarActions = {
  setActiveTab: createAction('[LEFT SIDEBAR] set active tab', (activeTab: LeftSidebarTabs) => ({activeTab})),
}