import React, { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { useAuthStore } from '../store/useAuthStore';
import { 
  Badge, Button, Card, Group, Text, Title, TextInput, 
  ActionIcon, ScrollArea, Tabs, Loader, Divider, Paper 
} from '@mantine/core';
import { 
  LuSearch, LuPlay, LuSend, LuCode2, LuCheckCircle2, 
  LuArrowLeft, LuTrophy, LuCircle, LuAlertCircle 
} from 'react-icons/lu';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../api';

const CodingChallenges = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeId = searchParams.get('id');
  const token = useAuthStore(state => state.token);

  // States
  const [challenges, setChallenges] = useState([]);
  const [activeChallenge, setActiveChallenge] = useState(null);
  const [code, setCode] = useState('');
  const [loadingList, setLoadingList] = useState(true);
  const [executing, setExecuting] = useState(false);
  const [activeTab, setActiveTab] = useState('testcases');
  const [result, setResult] = useState(null);
  const [search, setSearch] = useState('');

  // Fetch challenges
  useEffect(() => {
    const fetchList = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/compiler/challenges`);
        setChallenges(res.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingList(false);
      }
    };
    fetchList();
  }, []);

  // Fetch detail when activeId changes
  useEffect(() => {
    if (!activeId) {
      setActiveChallenge(null);
      return;
    }
    const fetchDetail = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/compiler/challenges/${activeId}`);
        setActiveChallenge(res.data);
        setCode(res.data.templateCode || '// Write your C# code here...\nusing System;\n\npublic class Program {\n    public static void Main() {\n        \n    }\n}');
        setResult(null);
        setActiveTab('testcases');
      } catch (err) {
        console.error(err);
      }
    };
    fetchDetail();
  }, [activeId]);

  // Execute Code
  const handleExecute = async (isSubmit = false) => {
    if (!activeChallenge) return;
    setExecuting(true);
    setActiveTab('result');
    try {
      const res = await axios.post(
        `${BASE_URL}/api/compiler/execute`,
        { challengeId: parseInt(activeId), code, language: 'csharp' },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setResult(res.data);
      if (isSubmit && res.data.success) {
        // Có thể show toast thành công
      }
    } catch (err) {
      setResult({ success: false, message: 'Execution failed: ' + err.message, testCaseResults: [] });
    } finally {
      setExecuting(false);
    }
  };

  const filteredChallenges = challenges.filter(c => 
    c.title?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-[#0f172a] text-slate-300 overflow-hidden font-sans">
      
      {/* ─── LEFT PANEL: CHALLENGE LIST ───────────────────────── */}
      <div className="w-[300px] flex flex-col border-r border-slate-800 bg-[#1e293b]/40 backdrop-blur-md shrink-0">
        <div className="p-4 border-b border-slate-800 flex items-center gap-3">
          <ActionIcon variant="subtle" color="gray" onClick={() => navigate('/dashboard')}>
            <LuArrowLeft size={18} />
          </ActionIcon>
          <Title order={4} className="text-white">Coding Arena</Title>
        </div>
        
        <div className="p-4">
          <TextInput
            placeholder="Search challenges..."
            leftSection={<LuSearch size={16} className="text-brand-400" />}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            styles={{ input: { backgroundColor: '#0f172a', borderColor: '#334155', color: 'white' } }}
          />
        </div>

        <ScrollArea className="flex-1 px-3 pb-4">
          {loadingList ? (
            <div className="flex justify-center p-10"><Loader color="brand" /></div>
          ) : (
            <div className="space-y-2">
              {filteredChallenges.map(c => {
                const isActive = activeId === String(c.id);
                return (
                  <Card 
                    key={c.id} 
                    padding="sm" 
                    radius="md"
                    className={`cursor-pointer transition-all border-l-4 ${isActive ? 'bg-brand-900/20 border-brand-500' : 'bg-[#1e293b] border-transparent hover:bg-slate-800'}`}
                    onClick={() => setSearchParams({ id: c.id })}
                  >
                    <Group justify="space-between" wrap="nowrap" align="start">
                      <div className="flex-1">
                        <Text size="sm" fw={isActive ? 600 : 500} className={isActive ? 'text-brand-300' : 'text-slate-200'} lineClamp={1}>
                          {c.id}. {c.title}
                        </Text>
                        <Group gap={6} mt={6}>
                          <Badge size="xs" variant="light" color={c.points > 50 ? 'orange' : 'green'}>
                            {c.points} XP
                          </Badge>
                          <Text size="xs" c="dimmed">{c.language}</Text>
                        </Group>
                      </div>
                      <LuCircle size={16} className="text-slate-600" />
                    </Group>
                  </Card>
                );
              })}
            </div>
          )}
        </ScrollArea>
      </div>

      {/* ─── CENTER & RIGHT PANELS ───────────────────────────────── */}
      {activeChallenge ? (
        <div className="flex-1 flex">
          
          {/* ─── CENTER: CODE EDITOR & TERMINAL ────────────────── */}
          <div className="flex-1 flex flex-col border-r border-slate-800">
            {/* Toolbar */}
            <div className="h-12 border-b border-slate-800 bg-[#1e293b]/60 flex items-center justify-between px-4">
              <Group>
                <Badge color="brand" variant="dot">C# (Mono)</Badge>
              </Group>
              <Group>
                <Button 
                  size="xs" variant="light" color="gray" 
                  leftSection={<LuPlay size={14} />}
                  onClick={() => handleExecute(false)}
                  loading={executing}
                >
                  Run Code
                </Button>
                <Button 
                  size="xs" color="brand" 
                  leftSection={<LuSend size={14} />}
                  className="bg-gradient-to-r from-brand-600 to-purple-600 shadow-lg shadow-brand-500/20"
                  onClick={() => handleExecute(true)}
                  loading={executing}
                >
                  Submit
                </Button>
              </Group>
            </div>

            {/* Monaco Editor */}
            <div className="flex-1 relative">
              <Editor
                height="100%"
                language="csharp"
                theme="vs-dark"
                value={code}
                onChange={val => setCode(val)}
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  fontFamily: 'Consolas, monospace',
                  padding: { top: 16 },
                  scrollBeyondLastLine: false,
                }}
              />
            </div>

            {/* Terminal Panel */}
            <div className="h-[250px] border-t border-slate-800 bg-[#0f172a] flex flex-col">
              <Tabs value={activeTab} onChange={setActiveTab} color="brand" radius="none">
                <Tabs.List className="bg-[#1e293b]/40 border-slate-800">
                  <Tabs.Tab value="testcases" leftSection={<LuCode2 size={14} />}>Test Cases</Tabs.Tab>
                  <Tabs.Tab value="result" leftSection={<LuCheckCircle2 size={14} />}>Execution Result</Tabs.Tab>
                </Tabs.List>
              </Tabs>
              
              <ScrollArea className="flex-1 p-4">
                {activeTab === 'testcases' && (
                  <div className="space-y-4">
                    {activeChallenge.testCases?.map((tc, idx) => (
                      <Paper key={idx} p="sm" radius="md" className="bg-[#1e293b]/50 border border-slate-800">
                        <Text size="sm" fw={600} mb="xs" c="brand.3">Test Case #{idx + 1}</Text>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Text size="xs" c="dimmed" mb={2}>Input</Text>
                            <pre className="bg-[#0f172a] p-2 rounded text-xs font-mono text-slate-300">{tc.input}</pre>
                          </div>
                          <div>
                            <Text size="xs" c="dimmed" mb={2}>Expected Output</Text>
                            <pre className="bg-[#0f172a] p-2 rounded text-xs font-mono text-slate-300">{tc.expectedOutput}</pre>
                          </div>
                        </div>
                      </Paper>
                    ))}
                    {(!activeChallenge.testCases || activeChallenge.testCases.length === 0) && (
                      <Text c="dimmed" size="sm">No test cases available for this challenge.</Text>
                    )}
                  </div>
                )}
                
                {activeTab === 'result' && (
                  <div>
                    {!result ? (
                      <Text c="dimmed" size="sm">Run or submit code to see results.</Text>
                    ) : (
                      <div className="space-y-4">
                        <AlertTitle success={result.success} message={result.message} />
                        
                        {result.testCaseResults?.map((tc, idx) => (
                          <Paper key={idx} p="sm" radius="md" className={`border ${tc.passed ? 'bg-green-900/10 border-green-900/50' : 'bg-red-900/10 border-red-900/50'}`}>
                            <Group justify="space-between" mb="xs">
                              <Text size="sm" fw={600} c={tc.passed ? 'green.4' : 'red.4'}>
                                Test Case #{idx + 1}: {tc.passed ? 'PASSED' : 'FAILED'}
                              </Text>
                            </Group>
                            <div className="grid grid-cols-3 gap-3">
                              <div>
                                <Text size="xs" c="dimmed">Input</Text>
                                <pre className="bg-[#0f172a]/50 p-2 rounded text-xs font-mono">{tc.input || '-'}</pre>
                              </div>
                              <div>
                                <Text size="xs" c="dimmed">Expected</Text>
                                <pre className="bg-[#0f172a]/50 p-2 rounded text-xs font-mono">{tc.expectedOutput || '-'}</pre>
                              </div>
                              <div>
                                <Text size="xs" c="dimmed">Actual</Text>
                                <pre className="bg-[#0f172a]/50 p-2 rounded text-xs font-mono">{tc.actualOutput || tc.errorMessage || '-'}</pre>
                              </div>
                            </div>
                          </Paper>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </ScrollArea>
            </div>
          </div>

          {/* ─── RIGHT PANEL: DESCRIPTION ────────────────────────── */}
          <div className="w-[350px] flex flex-col bg-[#1e293b]/40 backdrop-blur-md">
            <ScrollArea className="flex-1 p-5">
              <Group justify="space-between" align="start" mb="lg">
                <Title order={3} className="text-white leading-tight">{activeChallenge.title}</Title>
                <Badge size="lg" color="brand" variant="light" leftSection={<LuTrophy size={14} />}>
                  {activeChallenge.points} XP
                </Badge>
              </Group>
              
              <Text size="sm" className="text-slate-300 leading-relaxed whitespace-pre-wrap">
                {activeChallenge.description}
              </Text>
              
              <Divider my="xl" color="slate.8" />
              
              <Title order={6} mb="md" className="text-slate-400 uppercase tracking-wider text-xs">Environment Notes</Title>
              <Paper p="md" radius="md" className="bg-[#0f172a]/80 border border-slate-800">
                <ul className="text-xs text-slate-400 space-y-2 list-disc pl-4">
                  <li>Your code will be executed in a secure C# sandbox.</li>
                  <li>Use <code className="text-brand-300">Console.ReadLine()</code> to read inputs line by line.</li>
                  <li>Use <code className="text-brand-300">Console.WriteLine()</code> to output your answer.</li>
                </ul>
              </Paper>
            </ScrollArea>
          </div>

        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center">
          <LuCode2 size={64} className="text-slate-800 mb-4" />
          <Title order={3} className="text-slate-500">Select a challenge to start coding</Title>
        </div>
      )}
    </div>
  );
};

const AlertTitle = ({ success, message }) => (
  <Paper p="md" radius="md" className={`mb-4 flex gap-3 items-center border ${success ? 'bg-green-900/20 border-green-500/30 text-green-400' : 'bg-red-900/20 border-red-500/30 text-red-400'}`}>
    {success ? <LuCheckCircle2 size={24} /> : <LuAlertCircle size={24} />}
    <div>
      <Text fw={600}>{success ? 'Execution Successful' : 'Execution Failed'}</Text>
      <Text size="sm" opacity={0.8}>{message}</Text>
    </div>
  </Paper>
);

export default CodingChallenges;
