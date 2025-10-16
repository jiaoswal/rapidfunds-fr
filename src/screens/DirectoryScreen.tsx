import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Layout from '@/components/Layout';

const DirectoryScreen: React.FC = () => {
  const theme = useTheme();

  return (
    <Layout>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.colors.onSurface }]}>Directory</Text>
          <TouchableOpacity style={styles.inviteButton}>
            <Icon name="person-add" size={20} color="#FFFFFF" />
            <Text style={styles.inviteText}>Invite</Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.empty, { backgroundColor: theme.colors.surface }]}>
          <Icon name="group" size={36} color={theme.colors.onSurfaceVariant} />
          <Text style={[styles.emptyTitle, { color: theme.colors.onSurface }]}>No team members yet</Text>
          <Text style={[styles.emptyDesc, { color: theme.colors.onSurfaceVariant }]}>Invite your first team member</Text>
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
  inviteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#000',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 10,
  },
  inviteText: { color: '#FFF', fontWeight: '600' },
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

export default DirectoryScreen;
