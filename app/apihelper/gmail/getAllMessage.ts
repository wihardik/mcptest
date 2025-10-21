import { safePost } from "../../helper/axiosHelper";

// ------------------ GET ALL MESSAGES ------------------
export type GetAllMessagesParams = {
  from?: string;
  after?: string;
  accountId: string;
};

export async function getAllMessages(params: GetAllMessagesParams) {
  const payload = {
    inputData: [{ json: {} }],
    parameters: {
      resource: "message",
      operation: "getAll",
      filters: {
        ...(params.from ? { from: params.from } : {}),
        ...(params.after ? { after: params.after } : {}),
      },
    },
    AccountId: params.accountId,
  };

  return safePost("/nodes/google/execute", payload);
 
}

export default { getAllMessages };