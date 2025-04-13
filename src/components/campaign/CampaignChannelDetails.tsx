
import React from 'react';
import { Campaign } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare, Mail, Share2 } from 'lucide-react';

interface CampaignChannelDetailsProps {
  campaign: Campaign;
}

const CampaignChannelDetails: React.FC<CampaignChannelDetailsProps> = ({ campaign }) => {
  const hasSmsChannel = campaign.channels.includes('sms');
  const hasSmtpChannel = campaign.channels.includes('smtp');
  const hasSocialChannel = campaign.channels.includes('social');
  
  if (!hasSmsChannel && !hasSmtpChannel && !hasSocialChannel) {
    return null;
  }
  
  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Détails des canaux</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {hasSmsChannel && campaign.channelDetails?.sms && (
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-lg">
                <MessageSquare className="h-5 w-5 mr-2" />
                Configuration SMS
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Message</p>
                  <p className="mt-1 border p-2 rounded-md text-sm bg-muted/20">
                    {campaign.channelDetails.sms.message || "Aucun message défini"}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Destinataires</p>
                  <p className="font-medium">{campaign.channelDetails.sms.recipients || 0}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
        
        {hasSmtpChannel && campaign.channelDetails?.smtp && (
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-lg">
                <Mail className="h-5 w-5 mr-2" />
                Configuration SMTP (Email)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Sujet</p>
                  <p className="font-medium">{campaign.channelDetails.smtp.subject || "Aucun sujet défini"}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Template</p>
                  <p className="mt-1 border p-2 rounded-md text-sm bg-muted/20 max-h-32 overflow-auto">
                    {campaign.channelDetails.smtp.template || "Aucun template défini"}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Destinataires</p>
                  <p className="font-medium">{campaign.channelDetails.smtp.recipients || 0}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
        
        {hasSocialChannel && campaign.channelDetails?.social && (
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-lg">
                <Share2 className="h-5 w-5 mr-2" />
                Configuration Réseaux Sociaux
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Plateformes</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {campaign.channelDetails.social.platforms?.map((platform, index) => (
                      <span 
                        key={index}
                        className="px-2 py-0.5 bg-muted text-muted-foreground rounded-full text-xs"
                      >
                        {platform}
                      </span>
                    ))}
                    {(!campaign.channelDetails.social.platforms || campaign.channelDetails.social.platforms.length === 0) && (
                      <span className="text-sm">Aucune plateforme sélectionnée</span>
                    )}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Contenu</p>
                  <p className="mt-1 border p-2 rounded-md text-sm bg-muted/20">
                    {campaign.channelDetails.social.content || "Aucun contenu défini"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default CampaignChannelDetails;
