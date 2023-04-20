import {MessageKind1} from "./MessageKind1.jsx";
import {MessageKind0} from "./MessageKind0.jsx";

export const Messages = ({message}) => {

    const messagesMap = {
        0: <MessageKind0 message={message}/>,
        1: <MessageKind1 message={message}/>
    }

    return (
        <div>
            {messagesMap[message.kind]}
        </div>
    );
}