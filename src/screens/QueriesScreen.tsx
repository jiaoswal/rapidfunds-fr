import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from 'react-native-paper';
import Layout from '@/components/Layout';

const QueriesScreen: React.FC = () => {
  const theme = useTheme();

  return (
    <Layout>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.colors.onSurface }]}>Queries</Text>
        </View>

        <View style={[styles.empty, { backgroundColor: theme.colors.surface }]}>
          <Text style={[styles.emptyTitle, { color: theme.colors.onSurface }]}>No queries found</Text>
          <Text style={[styles.emptyDesc, { color: theme.colors.onSurfaceVariant }]}>Create your first query</Text>
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
  empty: {
    margin: 24,
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    gap: 8,
  },
  emptyTitle: { fontSize: 18, fontWeight: '700' },
  emptyDesc: { fontSize: 14 },
});

export default QueriesScreen;
