
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { useToast } from '@/hooks/use-toast';
import { Campaign, Channel } from '@/types';
import { getCampaigns, updateCampaign } from '@/services/storageService';
import CampaignForm from '@/components/campaign-modal/CampaignForm';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { CampaignFormValues } from '@/components/campaign-modal/CampaignFormSchema';

const CampaignEdit = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCampaign = () => {
      setLoading(true);
      const campaigns = getCampaigns();
      const foundCampaign = campaigns.find(c => c.id === id);
      
      if (foundCampaign) {
        setCampaign(foundCampaign);
      }
      setLoading(false);
    };

    loadCampaign();
  }, [id]);

  const handleSubmit = (formData: CampaignFormValues) => {
    if (!campaign) return;
    
    const updatedCampaign: Campaign = {
      ...campaign,
      title: formData.title,
      description: formData.description || '',
      status: formData.status,
      startDate: formData.startDate.toISOString().split('T')[0],
      endDate: formData.endDate.toISOString().split('T')[0],
      channels: formData.channels as Channel[],
      channelDetails: {
        sms: formData.channelDetails?.sms ? {
          message: formData.channelDetails.sms.message,
          recipients: formData.channelDetails.sms.recipients
        } : undefined,
        smtp: formData.channelDetails?.smtp ? {
          subject: formData.channelDetails.smtp.subject,
          template: formData.channelDetails.smtp.template,
          recipients: formData.channelDetails.smtp.recipients
        } : undefined,
        social: formData.channelDetails?.social ? {
          platforms: formData.channelDetails.social.platforms,
          content: formData.channelDetails.social.content
        } : undefined
      }
    };
    
    updateCampaign(updatedCampaign);
    
    toast({
      title: "Campagne mise à jour",
      description: `La campagne "${updatedCampaign.title}" a été mise à jour avec succès.`,
    });
    
    navigate(`/campaign/${id}`);
  };

  const handleCancel = () => {
    navigate(`/campaign/${id}`);
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-96">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      </Layout>
    );
  }

  if (!campaign) {
    return (
      <Layout>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-4">Campagne introuvable</h2>
          <p className="text-muted-foreground mb-6">
            La campagne que vous essayez de modifier n'existe pas ou a été supprimée.
          </p>
          <Button onClick={() => navigate('/campaigns')}>
            Retour aux campagnes
          </Button>
        </div>
      </Layout>
    );
  }

  const formInitialValues: CampaignFormValues = {
    title: campaign?.title || '',
    description: campaign?.description || '',
    status: campaign?.status || 'draft',
    startDate: new Date(campaign?.startDate || new Date()),
    endDate: new Date(campaign?.endDate || new Date()),
    channels: campaign?.channels as Channel[] || [],
    channelDetails: {
      sms: campaign?.channelDetails?.sms ? {
        message: campaign.channelDetails.sms.message,
        recipients: campaign.channelDetails.sms.recipients
      } : undefined,
      smtp: campaign?.channelDetails?.smtp ? {
        subject: campaign.channelDetails.smtp.subject,
        template: campaign.channelDetails.smtp.template,
        recipients: campaign.channelDetails.smtp.recipients
      } : undefined,
      social: campaign?.channelDetails?.social ? {
        platforms: campaign.channelDetails.social.platforms,
        content: campaign.channelDetails.social.content
      } : undefined
    }
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <Button 
            variant="ghost" 
            className="gap-2"
            onClick={handleCancel}
          >
            <ArrowLeft size={16} />
            Retour
          </Button>
          <h1 className="text-2xl font-bold">Modifier la campagne</h1>
          <div></div>
        </div>
        
        <Card>
          <CardContent className="pt-6">
            <CampaignForm 
              onSubmit={handleSubmit}
              onCancel={handleCancel}
              initialValues={formInitialValues}
              submitButtonText="Enregistrer les modifications"
            />
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default CampaignEdit;
