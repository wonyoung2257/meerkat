export type PRD = {
  id: number;
  send_at: Date;
  receiver: string;
  message: string;
  prd_url: string;
  checked: boolean;
  complated: boolean;

  update_at: Date;
  sender: string;
};
