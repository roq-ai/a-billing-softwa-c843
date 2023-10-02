const mapping: Record<string, string> = {
  billings: 'billing',
  menus: 'menu',
  orders: 'order',
  'order-items': 'order_item',
  restaurants: 'restaurant',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
