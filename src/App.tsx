import GoogleSheet from './lib/google-sheet';

const googleSheet = new GoogleSheet({
    // url: 'https://script.google.com/macros/s/AKfycbxcAdaJsiCR17nsZOeiJOwbWv_YsqUu57gnwDmNffW_9D0Ws_2dUcFzF0HKVEzlmLmy/exec'
    url: 'https://script.google.com/macros/s/AKfycbxGRmEczEslMTStb_OHrIZvX22MhgOkCsBikgc4pKW0rUKX_OwFL6QwMS8R1ItVxdor/exec'
});

export default function App() {
    const sheet = 'Sheet1';
    return (
        <>
            <div className="flex h-screen items-center justify-center bg-black text-white">
                <div>
                    <div className="text-center mb-24 text-4xl font-medium underline">
                        <a href="https://docs.google.com/spreadsheets/d/1U9akMg_Btt08XzM6v_XHRr-a0MOFsVJ-Yqlh1b7cC38/edit?gid=0#gid=0">
                            OPEN GOOGLE SPREAD SHEETS
                        </a>
                    </div>
                    <div className="flex justify-center gap-x-4">
                        <button
                            className="border border-indigo-700 rounded px-4 py-1 hover:border-indigo-300 text-indigo-50"
                            onClick={() => {
                                googleSheet.GET({ sheet }).then((data) => console.log(data));
                            }}
                        >
                            GET
                        </button>
                        <button
                            className="border border-indigo-700 rounded px-4 py-1 hover:border-indigo-300 text-indigo-50"
                            onClick={() => {
                                googleSheet.PUT({ sheet, name: 'new-name', age: 'new-age', good: 'new-good', id: '6' });
                            }}
                        >
                            PUT
                        </button>
                        <button
                            className="border border-indigo-700 rounded px-4 py-1 hover:border-indigo-300 text-indigo-50"
                            onClick={() => {
                                googleSheet.PATCH({ sheet, id: '6', name: 'change-name', age: 'change-age' });
                            }}
                        >
                            PATCH
                        </button>
                        <button
                            className="border border-indigo-700 rounded px-4 py-1 hover:border-indigo-300 text-indigo-50"
                            onClick={() => {
                                googleSheet.POST({ sheet, name: 'name', age: 'age', good: 'good' });
                            }}
                        >
                            POST
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
