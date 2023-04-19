import {MessageKind1} from "./MessageKind1.jsx";

export const Messages = ({message}) => {

    const messagesMap = {
        1: <MessageKind1 message={message}/>
    }

    return (
        <div>
            {messagesMap[message.kind]}
        </div>
    );
}