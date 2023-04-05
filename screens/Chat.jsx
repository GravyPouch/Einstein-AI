import {
  View,
  Text,
  Button,
  TextInput,
  SafeAreaView,
  KeyboardAvoidingView,
  FlatList,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useEffect, useState } from "react";

import { postChatToAPI } from "../lib/api";

export default function Chat() {
  const [text, changeText] = useState("");
  const [messages, setMessages] = useState([
    { text: "What can I help you with?", type: "bot" },
  ]);
  const [loading, setLoading] = useState(false);

  async function addMessage(message, type) {
    setMessages((messages) => [...messages, { text: message, type: type }]);
  }

  const sendMessage = async (message) => {
    await addMessage(message, "user");
    setLoading(true);
    const res = await postChatToAPI(message);
    await addMessage(res, "bot");
    setLoading(false);
  };

  useEffect(() => {
    console.log(messages);
  }, [messages]);

  return (
    <SafeAreaView className=" flex-1">
      <View className=" flex justify-end h-full">
        <ScrollView className=" mx-2 h-1/5">
          {messages.map((message, index) =>
            message.type == "user" ? (
              <View
                key={index}
                className=" px-5 py-2 bg-blue-500 rounded-xl border-2 border-black w-fit my-2 self-end"
              >
                <Text className=" text-white font-bold">{message.text}</Text>
              </View>
            ) : (
              <View
                key={index}
                className=" px-5 py-2 bg-gray-500 rounded-xl border-2 border-black w-fit my-2 self-start"
              >
                <Text className=" text-white font-bold">{message.text}</Text>
              </View>
            )
          )}
          {loading && (
            <ActivityIndicator size="large" className=" self-center" />
          )}
        </ScrollView>

        <KeyboardAvoidingView behavior="padding" className=" flex-1">
          <View className=" px-3 py-1 bg-slate-400/20 rounded-full border-2 border-black w-11/12 my-2 flex flex-row justify-between items-center mx-auto">
            <TextInput
              onChangeText={changeText}
              value={text}
              className="  w-3/4 h-full"
            />
            <Button
              title="send"
              onPress={() => {
                sendMessage(text);
                changeText("");
              }}
              className=" w-1/4"
            />
          </View>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
}
