import { sendLog } from "./sendLog";

export const logLoginPageView = () => {
  sendLog("login_view");
};

export const logLoginCompleted = (userId: string) => {
  sendLog("login_completed", {
    created_at: new Date().toISOString(),
    user_id: userId,
  });
};

export const logSignupCompleted = (userId: string) => {
  sendLog("signup_completed", {
    created_at: new Date().toISOString(),
    user_id: userId,
  });
};

export const logDashboardView = (userId: string | null) => {
  sendLog("dashboard_view", {
    created_at: new Date().toISOString(),
    user_id: userId,
  });
};

export const logDashboardTabClick = (userId: string, tabTitle: string) => {
  sendLog("dashboard_tab_click", {
    created_at: new Date().toISOString(),
    user_id: userId,
    tab_title: tabTitle,
  });
};

export const logDashboardPrdClick = (
  userId: string,
  prdId: number,
  prdStatus: string
) => {
  sendLog("dashboard_prd_click", {
    created_at: new Date().toISOString(),
    user_id: userId,
    prd_id: prdId,
    prd_status: prdStatus,
  });
};
