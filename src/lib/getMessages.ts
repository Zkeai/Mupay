import { getMessages as fetchMessages } from "next-intl/server";
import { AbstractIntlMessages } from 'next-intl';
const getMessages = async (): Promise<AbstractIntlMessages> => {
    const messages = await fetchMessages();
    return messages;
};

export default getMessages;