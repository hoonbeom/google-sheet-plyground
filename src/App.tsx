import GoogleSheet from './lib/google-sheet';

const googleSheet = new GoogleSheet({
    // url: 'https://script.google.com/macros/s/AKfycbxcAdaJsiCR17nsZOeiJOwbWv_YsqUu57gnwDmNffW_9D0Ws_2dUcFzF0HKVEzlmLmy/exec'
    url: 'https://script.google.com/macros/s/AKfycbxGRmEczEslMTStb_OHrIZvX22MhgOkCsBikgc4pKW0rUKX_OwFL6QwMS8R1ItVxdor/exec'
});

export default function App() {
    const sheet = 'Sheet1';
    return (
        <>
            <div>
                <button
                    onClick={() => {
                        googleSheet.GET({ sheet }).then((data) => console.log(data));
                    }}
                >
                    GET
                </button>
                <button
                    onClick={() => {
                        googleSheet.PUT({ sheet, name: 'name', age: 'age', good: 'good', id: '6' });
                    }}
                >
                    PUT
                </button>
                <button
                    onClick={() => {
                        googleSheet.PATCH({ sheet, id: '6', name: 'asdf', age: 'asdf' });
                    }}
                >
                    PATCH
                </button>
                <button
                    onClick={() => {
                        googleSheet.POST({ sheet, name: 'google', age: 'dd', good: 'adsf' });
                    }}
                >
                    POST
                </button>
            </div>
        </>
    );
}
