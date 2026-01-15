import { useState } from "react";
import axios from "axios";
import Tesseract from "tesseract.js";/*This is the OCR engine.React cannot read text from images.Browsers cannot understand letters inside images.
So we import Tesseract, which takes image pixels, runs OCR algorithm, returns real text. Think of it as:“Google Lens, but inside JavaScript” basically the text 
reading and extracting is done by this externamlly downloaded 'tesseract.js' */
import { LoaderCircle } from "lucide-react";

function ImageTranslator() {
  const [image, setImage] = useState(null);
  const [extractedText, setExtractedText] = useState("");
  const [result, setResult] = useState("");
  const [selectValue, setSelectValue] = useState("");
  const [selectValueName, setSelectValueName] = useState("");
  const [loading, setLoading] = useState(false);
  const [ocrLoading, setOcrLoading] = useState(false);

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
{ name: "Zulu", code: "zu" },
  ];


  const handleImageUpload = (e) => {
    setImage(e.target.files[0]);
    setExtractedText("");
    setResult("");
  };

  
  const handleExtractText = async () => {
    if (!image) return;

    setOcrLoading(true);

    const { data } = await Tesseract.recognize(image, "eng");
    setExtractedText(data.text);

    setOcrLoading(false);
  };

  const handleTranslate = async () => {
    setLoading(true);

    try {
      const options = {
        method: "POST",
        url: "https://google-translator9.p.rapidapi.com/v2",
        headers: {
          "x-rapidapi-key": import.meta.env.VITE_RAPID_API_KEY,
          "x-rapidapi-host": "google-translator9.p.rapidapi.com",
          "Content-Type": "application/json",
        },
        data: {
          q: extractedText,
          source: "auto",
          target: selectValue,
          format: "text",
        },
      };

      const response = await axios.request(options);
      setResult(
        response?.data?.data?.translations?.[0]?.translatedText
      );
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen w-screen bg-slate-200 flex items-center justify-center">
      <div className="flex flex-col gap-y-8 items-center">
        <h1 className="text-3xl font-bold text-zinc-700">Image Translator</h1>

        <input type="file" accept="image/*" onChange={handleImageUpload}  className="bg-white p-2 rounded-lg"/>
        <button onClick={handleExtractText} className="bg-slate-700 text-white px-6 py-2 rounded-lg">
          {ocrLoading ? <LoaderCircle className="animate-spin" /> : "Extract Text"} </button>
        
        <textarea className="bg-white w-[500px] h-32 border border-slate-700 rounded-lg px-4 py-2" value={extractedText} readOnly placeholder="Extracted text will appear here"/>

        <input placeholder="Choose language" className="px-3 py-1 border border-zinc-700 rounded-lg"  list="languages"  value={selectValueName}
          onChange={(e) => {
            setSelectValueName(e.target.value);
            const option = languageList.find(
              (lang) =>
                lang.name.toLowerCase() === e.target.value.toLowerCase()
            );
            if (option) setSelectValue(option.code);
          }}
        />

        <datalist id="languages">
          {languageList.map((lang) => (
            <option key={lang.code} value={lang.name} />
          ))}  </datalist>

        <button onClick={handleTranslate} className="bg-slate-700 text-slate-100 w-[500px] py-2 rounded-lg flex justify-center">
          
            {loading ? <LoaderCircle className="animate-spin" /> : "Translate"}</button>

        <textarea  className="bg-white w-[500px] h-32 border border-slate-700 rounded-lg px-4 py-2"  value={result}  readOnly placeholder="Translated text will appear here"
        />

      </div>
    </div>
  );
}
export default ImageTranslator;
