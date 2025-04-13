
import React from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface CampaignLoadingProps {
  notFound?: boolean;
}

const CampaignLoading: React.FC<CampaignLoadingProps> = ({ notFound = false }) => {
  const navigate = useNavigate();

  if (notFound) {
    return (
      <Layout>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold mb-4">Campagne non trouvée</h1>
          <p className="text-muted-foreground mb-6">La campagne que vous recherchez n'existe pas ou a été supprimée.</p>
          <Button onClick={() => navigate('/')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour au tableau de bord
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="animate-pulse">
        <div className="h-8 bg-muted rounded w-1/4 mb-4"></div>
        <div className="h-4 bg-muted rounded w-1/2 mb-8"></div>
        <div className="h-32 bg-muted rounded mb-6"></div>
        <div className="h-16 bg-muted rounded mb-6"></div>
        <div className="h-16 bg-muted rounded mb-6"></div>
      </div>
    </Layout>
  );
};

export default CampaignLoading;
