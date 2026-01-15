const Home = ({ setActivePage }) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-10">
      <h2 className="text-3xl font-bold text-zinc-700">Welcome to MyTranslator</h2>
      <p className="text-zinc-600 max-w-xl text-center"> Communicate in any language. Translate text or images instantly.</p>

      <div className="flex gap-8">
        <div onClick={() => setActivePage("text")} className="bg-white p-6 rounded-xl shadow-md w-64 text-center cursor-pointer hover:shadow-lg transition" >
          <h3 className="text-xl font-semibold text-zinc-700 mb-2"> Text Translator</h3>
          <p className="text-zinc-500 text-sm"> Translate text into multiple languages.</p>
        </div>

       
        <div onClick={() => setActivePage("image")} className="bg-white p-6 rounded-xl shadow-md w-64 text-center cursor-pointer hover:shadow-lg transition" >
          <h3 className="text-xl font-semibold text-zinc-700 mb-2"> Image Translator </h3>
          <p className="text-zinc-500 text-sm">Extract and translate text from images.</p>
        </div>
      </div>

      <div className="mt-16 w-full max-w-md px-4 space-y-4">
        <h2 className="text-2xl font-bold text-zinc-800 mb-4 "> Features </h2>
        <div className="bg-white rounded-xl shadow-md py-2.5 px-4 hover:shadow-lg transition text-zinc-600">Translate typed text, pasted content, uploaded image in your desired language in just one click</div>
        <div className="bg-white rounded-xl shadow-md py-2 px-4 hover:shadow-lg transition text-zinc-600"> Makes communication easier by instantly translating text from any source.</div>
        <div className="bg-white rounded-xl shadow-md py-2 px-4 hover:shadow-lg transition text-zinc-600"> Supports a diverse number of languages to communicate globally.</div>
      </div>

    </div>
  );
};
export default Home;


