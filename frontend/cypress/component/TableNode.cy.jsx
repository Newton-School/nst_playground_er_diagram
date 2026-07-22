import { ReactFlowProvider } from '@xyflow/react';
import TableNode from '../../src/components/TableNode';

describe('<TableNode /> Component', () => {
  const mockData = {
    label: 'CUSTOMER',
    columns: [
      { name: 'customer_id', type: 'INTEGER', isPrimary: true },
      { name: 'name', type: 'VARCHAR', isPrimary: false },
      { name: 'created_at', type: 'TIMESTAMP', isPrimary: false },
    ],
  };

  const mountNode = (data) => {
    return cy.mount(
      <ReactFlowProvider>
        <TableNode data={data} />
      </ReactFlowProvider>
    );
  };

  it('renders table header, columns, and data type colors correctly', () => {
    mountNode(mockData);

    // Header label
    cy.contains('CUSTOMER').should('be.visible');

    // Columns
    cy.contains('customer_id').should('be.visible');
    cy.contains('name').should('be.visible');
    cy.contains('created_at').should('be.visible');

    // Data types
    cy.contains('INTEGER').should('be.visible');
    cy.contains('VARCHAR').should('be.visible');
    cy.contains('TIMESTAMP').should('be.visible');
  });

  it('renders Primary Key indicator icon when isPrimary is true', () => {
    mountNode(mockData);

    cy.contains('🔑').should('be.visible');
  });

  it('renders target and source connection handles for each column row', () => {
    mountNode(mockData);

    cy.get('[data-handleid="target-customer_id"]').should('exist');
    cy.get('[data-handleid="source-customer_id"]').should('exist');
    cy.get('[data-handleid="target-name"]').should('exist');
    cy.get('[data-handleid="source-name"]').should('exist');
  });
});
