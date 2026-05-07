import React, { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../api';

const CodeWorkspace = () => {
    const { id } = useParams();
    const [challenge, setChallenge] = useState(null);
    const [code, setCode] = useState("");
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState("description"); // description, output

    useEffect(() => {
        const fetchChallenge = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/api/compiler/challenges/${id}`);
                setChallenge(response.data);
                setCode(response.data.templateCode || "// Bắt đầu code tại đây...\nusing System;\n\npublic class Program {\n    public static void Main() {\n        Console.WriteLine(\"Hello World\");\n    }\n}");
            } catch (error) {
                console.error("Lỗi khi tải bài tập:", error);
            }
        };
        fetchChallenge();
    }, [id]);

    const handleRunCode = async () => {
        setLoading(true);
        setActiveTab("output");
        try {
            const response = await axios.post(`${BASE_URL}/api/compiler/execute`, {
                challengeId: parseInt(id),
                code: code,
                language: "csharp"
            });
            setResult(response.data);
        } catch (error) {
            setResult({ success: false, message: "Lỗi kết nối server." });
        } finally {
            setLoading(false);
        }
    };

    if (!challenge) return <div className="flex h-screen items-center justify-center text-white bg-slate-900">Đang tải thử thách...</div>;

    return (
        <div className="flex h-screen bg-[#0f172a] text-slate-200 overflow-hidden">
            {/* Cột trái: Đề bài & Thông tin */}
            <div className="w-1/3 flex flex-col border-r border-slate-800 bg-[#1e293b]/50">
                <div className="p-6 border-b border-slate-800">
                    <h1 className="text-xl font-bold text-white flex items-center gap-2">
                        <span className="w-2 h-6 bg-indigo-500 rounded-full"></span>
                        {challenge.title}
                    </h1>
                    <div className="mt-2 flex gap-2">
                        <span className="px-2 py-0.5 bg-indigo-500/20 text-indigo-400 text-xs rounded border border-indigo-500/30">
                            {challenge.points} EXP
                        </span>
                        <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 text-xs rounded border border-emerald-500/30">
                            C#
                        </span>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-4 prose prose-invert max-w-none">
                    <div className="text-slate-300 leading-relaxed">
                        {challenge.description}
                    </div>
                    
                    {challenge.testCases && challenge.testCases.length > 0 && (
                        <div className="mt-8">
                            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 mb-4">Ví dụ (Test Cases)</h3>
                            <div className="space-y-3">
                                {challenge.testCases.map((tc, idx) => (
                                    <div key={idx} className="bg-slate-900/50 rounded-lg border border-slate-800 p-3 text-xs">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <p className="text-slate-500 mb-1">Input:</p>
                                                <code className="text-indigo-400">{tc.input}</code>
                                            </div>
                                            <div>
                                                <p className="text-slate-500 mb-1">Output dự kiến:</p>
                                                <code className="text-emerald-400">{tc.expectedOutput}</code>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Cột phải: Editor & Kết quả */}
            <div className="flex-1 flex flex-col">
                <div className="h-2/3 border-b border-slate-800 relative">
                    <Editor
                        height="100%"
                        defaultLanguage="csharp"
                        theme="vs-dark"
                        value={code}
                        onChange={(value) => setCode(value)}
                        options={{
                            fontSize: 14,
                            minimap: { enabled: false },
                            scrollBeyondLastLine: false,
                            automaticLayout: true,
                            fontFamily: "'Fira Code', 'Cascadia Code', Consolas, monospace",
                        }}
                    />
                    <div className="absolute bottom-4 right-6 z-10">
                        <button 
                            onClick={handleRunCode}
                            disabled={loading}
                            className={`px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-lg shadow-lg shadow-indigo-500/20 transition-all flex items-center gap-2 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {loading ? (
                                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            ) : (
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            )}
                            Chạy Code (Run)
                        </button>
                    </div>
                </div>

                <div className="flex-1 bg-[#0b1120] flex flex-col">
                    <div className="flex border-b border-slate-800">
                        <button 
                            onClick={() => setActiveTab("output")}
                            className={`px-6 py-3 text-xs font-semibold uppercase tracking-widest border-b-2 transition-colors ${activeTab === 'output' ? 'border-indigo-500 text-white bg-slate-800/30' : 'border-transparent text-slate-500 hover:text-slate-300'}`}
                        >
                            Kết quả (Output)
                        </button>
                    </div>
                    <div className="flex-1 overflow-y-auto p-6 font-mono text-sm">
                        {!result && !loading && (
                            <div className="text-slate-600 italic">Bấm "Chạy Code" để xem kết quả kiểm tra...</div>
                        )}
                        {loading && (
                            <div className="flex items-center gap-2 text-indigo-400">
                                <span className="animate-pulse">●</span> Đang biên dịch và chạy code trên server...
                            </div>
                        )}
                        {result && (
                            <div className="space-y-4">
                                <div className={`p-4 rounded-lg border ${result.success ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-rose-500/10 border-rose-500/20 text-rose-400'}`}>
                                    {result.message}
                                </div>
                                
                                {result.testCaseResults && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        {result.testCaseResults.map((tc, idx) => (
                                            <div key={idx} className={`p-3 rounded border ${tc.passed ? 'border-emerald-500/30 bg-emerald-500/5' : 'border-rose-500/30 bg-rose-500/5'}`}>
                                                <div className="flex justify-between items-center mb-2">
                                                    <span className="text-xs text-slate-500 uppercase tracking-tighter">Test Case #{idx + 1}</span>
                                                    {tc.passed ? 
                                                        <span className="text-xs font-bold text-emerald-500">PASS</span> : 
                                                        <span className="text-xs font-bold text-rose-500">FAIL</span>
                                                    }
                                                </div>
                                                <div className="grid grid-cols-1 gap-2 text-xs">
                                                    <div>
                                                        <p className="text-slate-600">Thực tế:</p>
                                                        <p className={tc.passed ? 'text-slate-300' : 'text-rose-300'}>{tc.actualOutput || (tc.errorMessage ? `Lỗi: ${tc.errorMessage}` : "Rỗng")}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CodeWorkspace;
