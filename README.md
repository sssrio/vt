# react-native-vt

Enabling AI Chat for ReactNative applications using ChatGPT

## Installation

```sh
npm install react-native-vt
```

## Usage

```js
import SelectTeacher from 'react-native-vt';

// ...

const VirtualTeacher = SelectTeacher({
    apiKey: "YOUR_OPENAI_API_KEY_HERE", 
    age: <Number> Age of student asking question,
    mode: "Audio"/"Text", Default is Text. Audio is to speak the Virtual Teacher's answer
    playHTKey: "YOUR_PLAYHT_KEY_HERE", Only if mode is audio.
    playHTUserId: "YOUR_PLAYHT_USER_ID_HERE" Only if mode is audio.
  });

// ...

 VirtualTeacher.ask(question)

```
