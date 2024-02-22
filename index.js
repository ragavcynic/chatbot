import { openai } from "./config/openAi.js";// from config file
import readLineSync from "readline-sync";
import colors from "colors";



async function main(){

    console.log(colors.bold.green("Welcome to the chatbot program !!"))
    console.log(colors.bold.green("You are free to chat with the stark .."))
    const chatHistory = []
    while(true){
       
        const userInput = readLineSync.question(colors.yellow("You: "));
        try {
            //prepare input to bot
            const messages = chatHistory.map(([role,content])=>({role,content}))
            //push the userinput to message
            messages.push({role:"user",content:userInput})

            // call the api with the user Input
            const completion = await openai.chat.completions.create({
                model : "gpt-3.5-turbo",
                messages:messages
            })
            //Get result from bot
            const completionText = completion.choices[0].message.content;
            //get out
           if(userInput.toLowerCase()==="exit"){
            console.log(colors.green("Bot : ")+completionText)
            return;
           }
            console.log(colors.green("Bot : ")+completionText);
            chatHistory.push(["user",userInput])
            chatHistory.push(["assistant",completionText])

        } catch (error) {
            console.log(colors.red(error))
        }
    }

}
main()
