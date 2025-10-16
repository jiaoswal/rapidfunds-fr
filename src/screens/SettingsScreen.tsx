import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Layout from '@/components/Layout';

const SettingsScreen: React.FC = () => {
  const theme = useTheme();

  return (
    <Layout>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>          
          <Text style={[styles.title, { color: theme.colors.onSurface }]}>Settings</Text>
        </View>

        <View style={[styles.card, { backgroundColor: theme.colors.surface }]}>          
          <Text style={[styles.cardTitle, { color: theme.colors.onSurface }]}>Backend Health Check</Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Check Backend Health</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 8,
  },
  title: { fontSize: 24, fontWeight: 'bold' },
  card: {
    margin: 24,
    padding: 20,
    borderRadius: 16,
  },
  cardTitle: { fontSize: 18, fontWeight: '700' },
  button: {
    marginTop: 12,
    backgroundColor: '#000',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: { color: '#FFF', fontWeight: '600' },
});

export default SettingsScreen;
