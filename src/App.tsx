import GoogleSheet from 'google-sheet';
import { useState } from 'react';

const googleSheet = new GoogleSheet({
    url: 'https://script.google.com/macros/s/AKfycbxGRmEczEslMTStb_OHrIZvX22MhgOkCsBikgc4pKW0rUKX_OwFL6QwMS8R1ItVxdor/exec'
});

interface FormData {
    name: string;
    age: string;
    good: string;
    id?: string;
}

export default function App() {
    const sheet = 'Sheet1';
    const [formData, setFormData] = useState<FormData>({
        name: '',
        age: '',
        good: ''
    });
    const [result, setResult] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    const handleInputChange = (field: keyof FormData, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value
        }));
    };

    const handleRequest = async (method: 'GET' | 'POST' | 'PUT' | 'PATCH') => {
        setLoading(true);
        setResult(null);

        try {
            let response;
            switch (method) {
                case 'GET':
                    response = await googleSheet.GET({ sheet });
                    break;
                case 'POST':
                    response = await googleSheet.POST({
                        sheet,
                        name: formData.name,
                        age: formData.age,
                        good: formData.good
                    });
                    break;
                case 'PUT':
                    if (!formData.id) {
                        alert('PUT 요청을 위해서는 ID가 필요합니다.');
                        setLoading(false);
                        return;
                    }
                    response = await googleSheet.PUT({
                        sheet,
                        id: formData.id,
                        name: formData.name,
                        age: formData.age,
                        good: formData.good
                    });
                    break;
                case 'PATCH':
                    if (!formData.id) {
                        alert('PATCH 요청을 위해서는 ID가 필요합니다.');
                        setLoading(false);
                        return;
                    }
                    response = await googleSheet.PATCH({
                        sheet,
                        id: formData.id,
                        name: formData.name,
                        age: formData.age
                    });
                    break;
            }
            setResult(response);
        } catch (error) {
            setResult({ error: error instanceof Error ? error.message : 'Unknown error occurred' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-8">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                        Google Sheet Playground
                    </h1>
                    <a
                        href="https://docs.google.com/spreadsheets/d/1U9akMg_Btt08XzM6v_XHRr-a0MOFsVJ-Yqlh1b7cC38/edit?gid=0#gid=0"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-medium transition-colors"
                    >
                        📊 Google Spreadsheet 열기
                    </a>
                </div>

                {/* Form Section */}
                <div className="bg-gray-800 rounded-xl p-6 mb-8 border border-gray-700">
                    <h2 className="text-2xl font-semibold mb-6 text-center">데이터 입력</h2>
                    
                    {/* POST Form */}
                    <div className="mb-8">
                        <h3 className="text-lg font-medium mb-4 text-blue-400">POST 요청 (새 데이터 추가)</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-2 text-gray-300">Name *</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => handleInputChange('name', e.target.value)}
                                    placeholder="이름 입력"
                                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2 text-gray-300">Age *</label>
                                <input
                                    type="text"
                                    value={formData.age}
                                    onChange={(e) => handleInputChange('age', e.target.value)}
                                    placeholder="나이 입력"
                                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2 text-gray-300">Good *</label>
                                <input
                                    type="text"
                                    value={formData.good}
                                    onChange={(e) => handleInputChange('good', e.target.value)}
                                    placeholder="좋은 점 입력"
                                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500"
                                />
                            </div>
                        </div>
                    </div>

                    {/* PUT Form */}
                    <div className="mb-8">
                        <h3 className="text-lg font-medium mb-4 text-yellow-400">PUT 요청 (데이터 수정)</h3>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-2 text-gray-300">ID *</label>
                                <input
                                    type="text"
                                    value={formData.id || ''}
                                    onChange={(e) => handleInputChange('id', e.target.value)}
                                    placeholder="ID 입력"
                                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-yellow-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2 text-gray-300">Name *</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => handleInputChange('name', e.target.value)}
                                    placeholder="이름 입력"
                                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-yellow-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2 text-gray-300">Age *</label>
                                <input
                                    type="text"
                                    value={formData.age}
                                    onChange={(e) => handleInputChange('age', e.target.value)}
                                    placeholder="나이 입력"
                                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-yellow-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2 text-gray-300">Good *</label>
                                <input
                                    type="text"
                                    value={formData.good}
                                    onChange={(e) => handleInputChange('good', e.target.value)}
                                    placeholder="좋은 점 입력"
                                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-yellow-500"
                                />
                            </div>
                        </div>
                    </div>

                    {/* PATCH Form */}
                    <div>
                        <h3 className="text-lg font-medium mb-4 text-purple-400">PATCH 요청 (부분 수정)</h3>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-2 text-gray-300">ID *</label>
                                <input
                                    type="text"
                                    value={formData.id || ''}
                                    onChange={(e) => handleInputChange('id', e.target.value)}
                                    placeholder="ID 입력"
                                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-purple-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2 text-gray-300">Name (선택)</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => handleInputChange('name', e.target.value)}
                                    placeholder="이름 입력 (선택)"
                                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-purple-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2 text-gray-300">Age (선택)</label>
                                <input
                                    type="text"
                                    value={formData.age}
                                    onChange={(e) => handleInputChange('age', e.target.value)}
                                    placeholder="나이 입력 (선택)"
                                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-purple-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2 text-gray-300">Good (선택)</label>
                                <input
                                    type="text"
                                    value={formData.good}
                                    onChange={(e) => handleInputChange('good', e.target.value)}
                                    placeholder="좋은 점 입력 (선택)"
                                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-purple-500"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* API Buttons */}
                <div className="bg-gray-800 rounded-xl p-6 mb-8 border border-gray-700">
                    <h2 className="text-2xl font-semibold mb-6 text-center">API 요청</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <button
                            className="bg-green-600 hover:bg-green-700 px-4 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                            onClick={() => handleRequest('GET')}
                            disabled={loading}
                        >
                            {loading ? '⏳' : '📥'} GET
                        </button>
                        <button
                            className="bg-blue-600 hover:bg-blue-700 px-4 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                            onClick={() => handleRequest('POST')}
                            disabled={loading || !formData.name || !formData.age || !formData.good}
                        >
                            {loading ? '⏳' : '➕'} POST
                        </button>
                        <button
                            className="bg-yellow-600 hover:bg-yellow-700 px-4 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                            onClick={() => handleRequest('PUT')}
                            disabled={loading || !formData.id || !formData.name || !formData.age || !formData.good}
                        >
                            {loading ? '⏳' : '✏️'} PUT
                        </button>
                        <button
                            className="bg-purple-600 hover:bg-purple-700 px-4 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                            onClick={() => handleRequest('PATCH')}
                            disabled={loading || !formData.id}
                        >
                            {loading ? '⏳' : '🔄'} PATCH
                        </button>
                    </div>

                    {/* API 설명 */}
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-400">
                        <div className="bg-gray-700 p-3 rounded-lg">
                            <strong className="text-green-400">GET:</strong> 모든 데이터 조회
                        </div>
                        <div className="bg-gray-700 p-3 rounded-lg">
                            <strong className="text-blue-400">POST:</strong> 새 데이터 추가 (name, age, good 필요)
                        </div>
                        <div className="bg-gray-700 p-3 rounded-lg">
                            <strong className="text-yellow-400">PUT:</strong> 데이터 수정 (id, name, age, good 필요)
                        </div>
                        <div className="bg-gray-700 p-3 rounded-lg">
                            <strong className="text-purple-400">PATCH:</strong> 부분 수정 (id 필요)
                        </div>
                    </div>
                </div>

                {/* Result Section */}
                {result && (
                    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                        <h2 className="text-2xl font-semibold mb-4 text-center">응답 결과</h2>
                        <div className="bg-gray-900 p-4 rounded-lg overflow-auto max-h-96">
                            <pre className="text-sm text-green-400 whitespace-pre-wrap">{JSON.stringify(result, null, 2)}</pre>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
