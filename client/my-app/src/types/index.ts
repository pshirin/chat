export type File = {
  file: {
    src: string;
    type: string;
  };
  id: string;
};


export type Message = {
  user: string | null;
  message: string;
  id: string;
  file: File['file']
};

export type MessageWithoutFile  = Omit<Message,'file'>

export interface ChatState {
  messages: Awaited<Promise<Array<Message>>>;
  update: boolean;
  events: {
    isConnect: boolean;
  };
  users: Awaited<Promise<Array<string>>>;
  myName: string | null;
  reply: null | Message;
  conn: any;
  peerId: null | string;
}
