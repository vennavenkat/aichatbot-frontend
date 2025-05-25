import React from 'react';
import SchemaExplorer from '../components/SchemExplorer';

import { Card, CardContent } from '../components/ui/card';

const SchemaPage: React.FC = () => {
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Database Schema Explorer</h1>

      <Card>
        <CardContent className="p-4">
          <SchemaExplorer />
        </CardContent>
      </Card>
    </div>
  );
};

export default SchemaPage;
