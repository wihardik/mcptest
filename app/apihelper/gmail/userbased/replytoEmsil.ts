import { safePost } from "../../../helper/axiosHelper";

/** Parameters for replyToThread */
export type ReplyToThreadParams = {
  messageId: string;
  message: string;
  senderName?: string;
  replyToSenderOnly?: boolean;
  ccList?: string;
  bccList?: string;
  attachmentsUi?: Record<string, unknown>;
  accountId: string;
};

/** Exported function usable anywhere in server code */
export async function replyToThread(params: ReplyToThreadParams) {
  const payload = {
    inputData: [{ json: {} }],
    parameters: {
      resource: "thread",
      operation: "reply",
      messageId: params.messageId,
      options: {
        senderName: params.senderName ?? "Anonymous",
        replyToSenderOnly: !!params.replyToSenderOnly,
        ccList: params.ccList ?? "",
        bccList: params.bccList ?? "",
        attachmentsUi: params.attachmentsUi ?? {},
        message: params.message,
      },
    },
    AccountId: params.accountId,
  };

  return safePost("/nodes/google/execute", payload);
}

export default { replyToThread };
