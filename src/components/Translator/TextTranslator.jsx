import {useState} from 'react'
import axios from 'axios'
import {LoaderCircle} from 'lucide-react'

function TextTranslator() {
 const[textInput, setTextInput]=useState("")
const[selectValue, setSelectValue] = useState("")
const[ result, setResult]=useState("")
const [loading, setLoading] = useState(false)

const languageList = [
  { name: "Arabic", code: "ar" },
{ name: "Bengali", code: "bn" },
{ name: "Bosnian", code: "bs" },
{ name: "Bulgarian", code: "bg" },
{ name: "Burmese", code: "my" },
{ name: "Catalan", code: "ca" },
{ name: "Chinese", code: "zh" },
{ name: "Croatian", code: "hr" },
{ name: "Czech", code: "cs" },
{ name: "Danish", code: "da" },
{ name: "Dutch", code: "nl" },
{ name: "English", code: "en" },
{ name: "Estonian", code: "et" },
{ name: "Finnish", code: "fi" },
{ name: "French", code: "fr" },
{ name: "German", code: "de" },
{ name: "Greek", code: "el" },
{ name: "Hebrew", code: "he" },
{ name: "Hindi", code: "hi" },
{ name: "Hungarian", code: "hu" },
{ name: "Icelandic", code: "is" },
{ name: "Indonesian", code: "id" },
{ name: "Italian", code: "it" },
{ name: "Japanese", code: "ja" },
{ name: "Kazakh", code: "kk" },
{ name: "Khmer", code: "km" },
{ name: "Korean", code: "ko" },
{ name: "Latvian", code: "lv" },
{ name: "Lithuanian", code: "lt" },
{ name: "Malay", code: "ms" },
{ name: "Malayalam", code: "ml" },
{ name: "Marathi", code: "mr" },
{ name: "Norwegian", code: "no" },
{ name: "Polish", code: "pl" },
{ name: "Portuguese", code: "pt" },
{ name: "Punjabi", code: "pa" },
{ name: "Romanian", code: "ro" },
{ name: "Russian", code: "ru" },
{ name: "Serbian", code: "sr" },
{ name: "Sinhala", code: "si" },
{ name: "Slovak", code: "sk" },
{ name: "Slovenian", code: "sl" },
{ name: "Spanish", code: "es" },
{ name: "Swedish", code: "sv" },
{ name: "Tagalog", code: "tl" },
{ name: "Tamil", code: "ta" },
{ name: "Telugu", code: "te" },
{ name: "Thai", code: "th" },
{ name: "Turkish", code: "tr" },
{ name: "Ukrainian", code: "uk" },
{ name: "Urdu", code: "ur" },
{ name: "Uzbek", code: "uz" },
{ name: "Vietnamese", code: "vi" },
{ name: "Zulu", code: "zu" }
];

const [selectValueName, setSelectValueName] = useState(""); 

const handleTextTranslation= async ()=>{
  setLoading(true)
try {
  const options = {
  method: 'POST',
  url: 'https://google-translator9.p.rapidapi.com/v2',
  headers: {
    'x-rapidapi-key': import.meta.env.VITE_RAPID_API_KEY,
    'x-rapidapi-host': 'google-translator9.p.rapidapi.com',
    'Content-Type': 'application/json'
  },
  data: {
    q: `${textInput}`,
    source: 'auto',
    target: `${selectValue}`,
    format: 'text'
  }
};
  const response =await axios.request(options)
  setLoading(false)
  console.log(response?.data?.data?.translations?.[Number(0)]?.translatedText)
  setResult(response?.data?.data?.translations?.[Number(0)]?.translatedText)
} catch (error) {
   setLoading(false)
  console.log(error?.data)
  if (error.response) {
    console.error(error.response.data); // Shows server response
  }
}
}

console.log(textInput)
console.log(selectValue)

  return (
  <div className='h-screen w-screen bg-slate-200 flex items-center justify-center'>
    <div className="flex items-center justify-center flex-col gap-y-10 ">

      <h1 className="text-3xl text-zinc-700 font-bold">Text Translator</h1>
      <div className="flex items-center justify-center flex-col gap-y-5">
        <textarea name="input-text" placeholder='' className="bg-white h-30 w-[500px] border border-slate-700 outline-none rounded-lg text-lg px-5 py-2" onChange={(e)=> setTextInput(e.target.value)}/>
        <textarea name="input-text" className="bg-white h-30 w-[500px] border border-slate-700 outline-none rounded-lg text-lg px-5 py-2" value={result} readOnly/>
      </div>

<div>
  <label htmlFor="options">Converted Into: </label>

  <input
    placeholder="Choose language"
    className="bg-slate-250 px-2 py-1 rounded-lg border border-zinc-700 outline-none cursor-pointer"
    list="languages"
    value={selectValueName}
    onChange={(e) => {
      setSelectValueName(e.target.value); 
      const option = languageList.find(
        (lang) => lang.name.toLowerCase() === e.target.value.toLowerCase()
      );
      if (option) {
        setSelectValue(option.code); 
      }
    }}
  />

  <datalist id="languages">
    {languageList.map((lang) => (
      <option key={lang.code} value={lang.name} />
    ))}
  </datalist>
</div>

    
    <button className="bg-slate-700 text-slate-100 mx-auto w-[500px] py-2 rounded-lg cursor-pointer flex items-center justify-center" onClick={handleTextTranslation}>
     { loading?(<LoaderCircle className='animate-spin'/>):"Translate"
     }
     </button>
    </div>
  </div>
  )
}

export default TextTranslator