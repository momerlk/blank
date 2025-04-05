import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const SAMPLE_ORDERS = [
  {
    id: '1',
    orderNumber: '#ORD-2025-001',
    date: '2025-04-05',
    status: 'Delivered',
    total: 149.99,
  },
  {
    id: '2',
    orderNumber: '#ORD-2025-002',
    date: '2025-04-03',
    status: 'In Transit',
    total: 89.99,
  },
  {
    id: '3',
    orderNumber: '#ORD-2025-003',
    date: '2025-04-01',
    status: 'Processing',
    total: 199.99,
  },
];

const OrderItem = ({ order }: { order: typeof SAMPLE_ORDERS[0] }) => (
  <TouchableOpacity style={styles.orderItem}>
    <View style={styles.orderHeader}>
      <Text style={styles.orderNumber}>{order.orderNumber}</Text>
      <Text style={[
        styles.orderStatus,
        { color: order.status === 'Delivered' ? '#4CAF50' : order.status === 'In Transit' ? '#2196F3' : '#FFC107' }
      ]}>
        {order.status}
      </Text>
    </View>
    <View style={styles.orderDetails}>
      <Text style={styles.orderDate}>{order.date}</Text>
      <Text style={styles.orderTotal}>${order.total}</Text>
    </View>
  </TouchableOpacity>
);

export function MyOrders() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Feather name="chevron-left" size={28} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Orders</Text>
      </View>

      <FlatList
        data={SAMPLE_ORDERS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <OrderItem order={item} />}
        contentContainerStyle={styles.ordersList}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>No orders found</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: 'black',
  },
  backButton: {
    marginRight: 15,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  ordersList: {
    padding: 20,
  },
  orderItem: {
    backgroundColor: '#111',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  orderNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  orderStatus: {
    fontSize: 14,
    fontWeight: '500',
  },
  orderDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderDate: {
    fontSize: 14,
    color: '#666',
  },
  orderTotal: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#666',
  },
});
