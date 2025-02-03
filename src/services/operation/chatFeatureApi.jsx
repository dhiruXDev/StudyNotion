 
import { apiConnector } from '../apiConnector';
import { ChatAndResponseEndpoint } from '../apis';
import toast from 'react-hot-toast';

export const chatCommunicating = async ({userInput}) => {
    let res = [];
    //console.log("Question ",{question});
    console.log("W", userInput) 
    try {
        const respone = await apiConnector("POST", ChatAndResponseEndpoint.CHAT_CONNETCING_COMMUNICATING_WITH_SERVER, {question:userInput });
         console.log("Inside" , respone);

        if (respone.data.success) {
            res = respone.data.answer.map((item) => { 
                return {heading:item.heading , text : item.option !== "" ?  item.option : ""  , isLink : false}
                // if (item.option.includes('http') ) {
                //     return { heading:item , text: item ,  isLink: true };
                // }
                // return { text: item, isLink: false };
 // item.option.includes('http') ? true :
            });
        }
    } catch (error) {
        console.error("Error during chat communication", error);
        toast.error(error.message);
        res = [];
    }
    return res;
};
