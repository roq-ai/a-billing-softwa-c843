interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
  ownerAbilities: string[];
  customerAbilities: string[];
  getQuoteUrl: string;
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['Business Owner'],
  customerRoles: [],
  tenantRoles: ['Business Owner', 'Restaurant Manager', 'Cashier'],
  tenantName: 'Restaurant',
  applicationName: 'A Billing Software',
  addOns: ['file upload', 'chat', 'notifications', 'file'],
  customerAbilities: [],
  ownerAbilities: [
    'Manage user information',
    'Manage restaurant information',
    'Manage menu items',
    'Manage orders and billing',
  ],
  getQuoteUrl: 'https://app.roq.ai/proposal/b02f93f9-80cf-4983-901b-7596de71b6dd',
};
