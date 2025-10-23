// lib/googleApi.ts

import { safePost } from "@/app/helper/axiosHelper";



export type SendEmailParams = {
  to: string;
  subject: string;
  message: string;
  senderName?: string;
  accountId: string;
 
};

export async function sendEmail(params: SendEmailParams) {
  const payload = {
    inputData: [{ json: {} }],
    parameters: {
      resource: "message",
      operation: "send",
     
      to: params.to,
      subject: params.subject,
      message: params.message,
    },
    options: {
      senderName: params.senderName ?? "Anonymous",
    },
    AccountId: params.accountId,
  };

  return safePost("/nodes/google/execute", payload);
}
export default { sendEmail };
