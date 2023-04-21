import { MessageKind1 } from './MessageKind1.jsx';
import { MessageKind0 } from './MessageKind0.jsx';
import { MessageKind3 } from './MessageKind3.jsx';
import { MessageKindOther } from './MessageKindOther.jsx';

export const Messages = ({ message }) => {
  const messagesMap = {
    0: <MessageKind0 message={message} />,
    1: <MessageKind1 message={message} />,
    3: <MessageKind3 message={message} />,
  };

  return (
    <div>
      {messagesMap[message.kind] ? (
        messagesMap[message.kind]
      ) : (
        <MessageKindOther message={message} />
      )}
    </div>
  );
};
