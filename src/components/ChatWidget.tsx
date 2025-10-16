import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  text: string;
}

const ChatWidget: React.FC = () => {
  const theme = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { id: 'm1', role: 'assistant', text: 'Hi! I can help analyze fund usage and budgets.' },
  ]);

  const toggle = () => setIsOpen(v => !v);

  const send = () => {
    if (!input.trim()) return;
    const userMessage: Message = { id: 'u' + Date.now(), role: 'user', text: input.trim() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    // Mock assistant reply
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          id: 'a' + Date.now(),
          role: 'assistant',
          text: 'This is a demo response. I will be wired to analytics and RAG soon.',
        },
      ]);
    }, 600);
  };

  return (
    <View pointerEvents="box-none" style={styles.root}>
      {isOpen && (
        <View style={[styles.panel, { backgroundColor: theme.colors.surface, borderColor: theme.colors.outline }]}> 
          <View style={styles.panelHeader}>
            <View style={styles.headerLeft}>
              <Icon name="smart-toy" size={18} color={theme.colors.primary} />
              <Text style={[styles.headerTitle, { color: theme.colors.onSurface }]}>FundFlow Assistant</Text>
            </View>
            <TouchableOpacity onPress={toggle}>
              <Icon name="close" size={20} color={theme.colors.onSurface} />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.history} contentContainerStyle={styles.historyContent}>
            {messages.map(m => (
              <View
                key={m.id}
                style={[
                  styles.bubble,
                  m.role === 'user' ? styles.userBubble : styles.assistantBubble,
                  { backgroundColor: m.role === 'user' ? theme.colors.primary : theme.colors.surfaceVariant },
                ]}
              >
                <Text style={[styles.bubbleText, { color: m.role === 'user' ? '#fff' : theme.colors.onSurface }]}>
                  {m.text}
                </Text>
              </View>
            ))}
          </ScrollView>

          <View style={[styles.composer, { borderTopColor: theme.colors.outline }]}> 
            <TextInput
              style={[styles.input, { color: theme.colors.onSurface }]}
              placeholder="Type your question..."
              placeholderTextColor={theme.colors.onSurfaceVariant}
              value={input}
              onChangeText={setInput}
              onSubmitEditing={send}
              returnKeyType="send"
            />
            <TouchableOpacity style={styles.send} onPress={send}>
              <Icon name="send" size={18} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      )}

      <TouchableOpacity style={[styles.fab, { backgroundColor: '#10B981' }]} onPress={toggle} activeOpacity={0.85}>
        <Icon name={isOpen ? 'close' : 'chat'} size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    position: 'absolute',
    right: 16,
    bottom: 24,
    left: 16,
  },
  fab: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
  },
  panel: {
    position: 'absolute',
    right: 0,
    bottom: 72,
    width: 320,
    maxHeight: 480,
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden',
    elevation: 6,
  },
  panelHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  headerTitle: { fontWeight: '700' },
  history: { paddingHorizontal: 12 },
  historyContent: { paddingBottom: 8 },
  bubble: { marginVertical: 6, paddingHorizontal: 12, paddingVertical: 8, borderRadius: 12, alignSelf: 'flex-start', maxWidth: '85%' },
  userBubble: { alignSelf: 'flex-end' },
  assistantBubble: { alignSelf: 'flex-start' },
  bubbleText: { fontSize: 14 },
  composer: { flexDirection: 'row', alignItems: 'center', padding: 8, borderTopWidth: 1 },
  input: { flex: 1, paddingHorizontal: 12, paddingVertical: 10, fontSize: 14 },
  send: { marginLeft: 8, backgroundColor: '#10B981', paddingHorizontal: 12, paddingVertical: 10, borderRadius: 10 },
});

export default ChatWidget;
