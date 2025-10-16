import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, PanGestureHandler, State, TextInput } from 'react-native';
import { useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Layout from '@/components/Layout';
import Button from '@/components/Button';
import { useAuth } from '@/context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { OrgChartNode } from '@/types';

const OrgChartScreen: React.FC = () => {
  const theme = useTheme();
  const { user, organization } = useAuth();
  const navigation = useNavigation();
  
  const [nodes, setNodes] = useState<OrgChartNode[]>([
    {
      id: '1',
      name: 'John Doe',
      title: 'CEO',
      department: 'Executive',
      reportsTo: undefined,
      children: ['2', '3'],
      isAdmin: true,
      x: 200,
      y: 50,
    },
    {
      id: '2',
      name: 'Jane Smith',
      title: 'CTO',
      department: 'Engineering',
      reportsTo: '1',
      children: ['4', '5'],
      isAdmin: true,
      x: 100,
      y: 150,
    },
    {
      id: '3',
      name: 'Bob Johnson',
      title: 'CMO',
      department: 'Marketing',
      reportsTo: '1',
      children: ['6'],
      isAdmin: false,
      x: 300,
      y: 150,
    },
    {
      id: '4',
      name: 'Alice Brown',
      title: 'Senior Developer',
      department: 'Engineering',
      reportsTo: '2',
      children: [],
      isAdmin: false,
      x: 50,
      y: 250,
    },
    {
      id: '5',
      name: 'Charlie Wilson',
      title: 'DevOps Engineer',
      department: 'Engineering',
      reportsTo: '2',
      children: [],
      isAdmin: false,
      x: 150,
      y: 250,
    },
    {
      id: '6',
      name: 'Diana Lee',
      title: 'Marketing Manager',
      department: 'Marketing',
      reportsTo: '3',
      children: [],
      isAdmin: false,
      x: 300,
      y: 250,
    },
  ]);

  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleBack = () => {
    navigation.goBack();
  };

  const handleNodePress = (nodeId: string) => {
    setSelectedNode(selectedNode === nodeId ? null : nodeId);
  };

  const handleAddNode = () => {
    // In a real app, this would open a modal to add a new node
    const newNode: OrgChartNode = {
      id: `node_${Date.now()}`,
      name: 'New Employee',
      title: 'New Role',
      department: 'General',
      reportsTo: selectedNode || undefined,
      children: [],
      isAdmin: false,
      x: Math.random() * 300 + 50,
      y: Math.random() * 200 + 100,
    };

    setNodes([...nodes, newNode]);
    
    // Update parent node's children
    if (selectedNode) {
      setNodes(prevNodes => 
        prevNodes.map(node => 
          node.id === selectedNode 
            ? { ...node, children: [...node.children, newNode.id] }
            : node
        )
      );
    }
  };

  const handleDeleteNode = (nodeId: string) => {
    if (!user?.isAdmin) return;
    
    setNodes(prevNodes => {
      const nodeToDelete = prevNodes.find(node => node.id === nodeId);
      if (!nodeToDelete) return prevNodes;

      // Remove from parent's children
      const updatedNodes = prevNodes.map(node => 
        node.id === nodeToDelete.reportsTo
          ? { ...node, children: node.children.filter(childId => childId !== nodeId) }
          : node
      );

      // Remove the node and all its descendants
      const removeNodeAndChildren = (nodeId: string, nodes: OrgChartNode[]): OrgChartNode[] => {
        const node = nodes.find(n => n.id === nodeId);
        if (!node) return nodes;

        let result = nodes.filter(n => n.id !== nodeId);
        node.children.forEach(childId => {
          result = removeNodeAndChildren(childId, result);
        });
        return result;
      };

      return removeNodeAndChildren(nodeId, updatedNodes);
    });
  };

  const handleEditNode = (nodeId: string) => {
    // In a real app, this would open a modal to edit the node
    setIsEditing(true);
    // Simulate AI suggestions
    setTimeout(() => {
      setIsEditing(false);
      // Update node with AI suggestions
      setNodes(prevNodes =>
        prevNodes.map(node =>
          node.id === nodeId
            ? { ...node, title: 'AI Suggested: ' + node.title }
            : node
        )
      );
    }, 1000);
  };

  const filteredNodes = nodes.filter(node =>
    node.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    node.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    node.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderNode = (node: OrgChartNode) => {
    const isSelected = selectedNode === node.id;
    const isHighlighted = searchQuery && (
      node.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      node.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      node.department.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
      <View
        key={node.id}
        style={[
          styles.node,
          {
            left: node.x,
            top: node.y,
            backgroundColor: isSelected ? theme.colors.primary : theme.colors.surface,
            borderColor: isSelected ? theme.colors.primary : theme.colors.outline,
            borderWidth: isHighlighted ? 3 : 1,
          },
        ]}
      >
        <TouchableOpacity
          style={styles.nodeContent}
          onPress={() => handleNodePress(node.id)}
          activeOpacity={0.8}
        >
          <View style={styles.nodeHeader}>
            <Text style={[
              styles.nodeName,
              { color: isSelected ? '#FFFFFF' : theme.colors.onSurface }
            ]}>
              {node.name}
            </Text>
            {user?.isAdmin && (
              <View style={styles.nodeActions}>
                <TouchableOpacity
                  style={styles.nodeAction}
                  onPress={() => handleEditNode(node.id)}
                >
                  <Icon
                    name="edit"
                    size={16}
                    color={isSelected ? '#FFFFFF' : theme.colors.primary}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.nodeAction}
                  onPress={() => handleDeleteNode(node.id)}
                >
                  <Icon
                    name="delete"
                    size={16}
                    color={isSelected ? '#FFFFFF' : theme.colors.error}
                  />
                </TouchableOpacity>
              </View>
            )}
          </View>
          <Text style={[
            styles.nodeTitle,
            { color: isSelected ? '#FFFFFF' : theme.colors.onSurfaceVariant }
          ]}>
            {node.title}
          </Text>
          <Text style={[
            styles.nodeDepartment,
            { color: isSelected ? '#FFFFFF' : theme.colors.onSurfaceVariant }
          ]}>
            {node.department}
          </Text>
          {node.isAdmin && (
            <View style={styles.adminBadge}>
              <Text style={styles.adminText}>Admin</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <Layout>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Icon name="arrow-back" size={24} color={theme.colors.onSurface} />
          </TouchableOpacity>
          <Text style={[styles.title, { color: theme.colors.onSurface }]}>Organization Chart</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={[styles.searchBar, { backgroundColor: theme.colors.surface }]}>
            <Icon name="search" size={20} color={theme.colors.onSurfaceVariant} />
            <TextInput
              style={[styles.searchInput, { color: theme.colors.onSurface }]}
              placeholder="Search employees..."
              placeholderTextColor={theme.colors.onSurfaceVariant}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>

        {/* Org Chart */}
        <ScrollView
          style={styles.chartContainer}
          contentContainerStyle={styles.chartContent}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          {filteredNodes.map(renderNode)}
          
          {/* Connection Lines */}
          <View style={styles.connections}>
            {nodes.map(node => 
              node.reportsTo && (
                <View
                  key={`${node.reportsTo}-${node.id}`}
                  style={[
                    styles.connection,
                    {
                      left: nodes.find(n => n.id === node.reportsTo)?.x || 0,
                      top: nodes.find(n => n.id === node.reportsTo)?.y || 0,
                      width: Math.abs((nodes.find(n => n.id === node.reportsTo)?.x || 0) - node.x),
                      height: Math.abs((nodes.find(n => n.id === node.reportsTo)?.y || 0) - node.y),
                    },
                  ]}
                />
              )
            )}
          </View>
        </ScrollView>

        {/* Actions */}
        {user?.isAdmin && (
          <View style={styles.actions}>
            <Button
              title="Add Employee"
              onPress={handleAddNode}
              size="small"
              style={styles.actionButton}
            />
            <Button
              title="AI Suggestions"
              onPress={() => setIsEditing(true)}
              variant="outline"
              size="small"
              style={styles.actionButton}
            />
          </View>
        )}

        {/* AI Suggestions Modal */}
        {isEditing && (
          <View style={styles.modalOverlay}>
            <View style={[styles.modal, { backgroundColor: theme.colors.surface }]}>
              <Text style={[styles.modalTitle, { color: theme.colors.onSurface }]}>
                AI Suggestions
              </Text>
              <Text style={[styles.modalText, { color: theme.colors.onSurfaceVariant }]}>
                AI is analyzing your organization structure and suggesting optimal roles and hierarchy...
              </Text>
              <Button
                title="Close"
                onPress={() => setIsEditing(false)}
                style={styles.modalButton}
              />
            </View>
          </View>
        )}
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 8,
  },
  backButton: {
    padding: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  placeholder: {
    width: 40,
  },
  searchContainer: {
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
  },
  chartContainer: {
    flex: 1,
    backgroundColor: 'rgba(103, 126, 234, 0.05)',
  },
  chartContent: {
    minHeight: 600,
    padding: 20,
  },
  connections: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  connection: {
    position: 'absolute',
    borderWidth: 2,
    borderColor: 'rgba(103, 126, 234, 0.3)',
  },
  node: {
    position: 'absolute',
    width: 160,
    padding: 12,
    borderRadius: 12,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  nodeContent: {
    flex: 1,
  },
  nodeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  nodeName: {
    fontSize: 14,
    fontWeight: 'bold',
    flex: 1,
  },
  nodeActions: {
    flexDirection: 'row',
    gap: 4,
  },
  nodeAction: {
    padding: 4,
  },
  nodeTitle: {
    fontSize: 12,
    marginBottom: 2,
  },
  nodeDepartment: {
    fontSize: 11,
    opacity: 0.7,
  },
  adminBadge: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#FF4444',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  adminText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  actions: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingVertical: 16,
    gap: 12,
  },
  actionButton: {
    flex: 1,
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    margin: 24,
    padding: 24,
    borderRadius: 16,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  modalText: {
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 24,
    textAlign: 'center',
  },
  modalButton: {
    marginTop: 8,
  },
});

export default OrgChartScreen;
